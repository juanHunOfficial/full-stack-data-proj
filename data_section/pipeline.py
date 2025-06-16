from datetime import datetime

from dotenv import load_dotenv
from pyspark.sql import SparkSession
from pyspark.sql.functions import broadcast, trim, lower, col

from utils.logging import gotenv
from utils.transform import pyformat
from utils.sql import SafeSQL
from constants import SCHEMA, HOME_PATH, NORMALIZED_SCHEMAS


# Load environment variables
load_dotenv()

# Retrieve environment variables
jdbc_path = gotenv("JDBC_PATH")
host = gotenv("MYSQL_HOST")
database = gotenv("MYSQL_DATABASE")
user = gotenv("MYSQL_USER")
password = gotenv("MYSQL_PASSWORD")

# Construct JDBC URL
jdbc_url = f"jdbc:mysql://{host}/{database}"

# Initialize MySQL connection
sql = SafeSQL(
    host=host,
    user=user,
    password=password
)

# Initialize SparkSession
spark = (
    SparkSession.builder
    .appName("E-Commerce Data")
    .config("spark.jars", jdbc_path)
    .getOrCreate()
)
spark.sparkContext.setLogLevel("FATAL")

# Initialize database and table
sql.run_file(rf"{HOME_PATH}/sql/init.sql")

# Load the CSV file into a DataFrame
df = spark.read.csv(
    rf"{HOME_PATH}/data/e-commerce-data.csv",
    header=True,
    inferSchema=True
)


# Convert InvoiceDate to safe datetime format
def to_datetime_safe(t):
    try:
        return datetime.strptime(t, "%m/%d/%Y %H:%M").strftime("%Y/%m/%d %H:%M:%S")
    except Exception:
        return None


# Apply datetime conversion
df = pyformat(df, "InvoiceDate", to_datetime_safe)

# Rename columns to snake_case
df = df.toDF(*SCHEMA)

# Create a map of normalized DataFrames
df_map = {
    name: df.select(*schema)
    for name, schema in NORMALIZED_SCHEMAS.items()
}

# Normalize and clean each DataFrame
df_customers = (
    df_map["customers"]
    .dropDuplicates(["customer_id"])
    .dropna()
)

df_invoices = (
    df_map["invoices"]
    .dropDuplicates(["invoice_no"])
    .dropna()
)

df_products = (
    df_map["products"]
    .withColumn("stock_code", trim(lower(col("stock_code"))))
    .dropDuplicates(["stock_code"])
    .dropna()
)

df_transactions = (
    df_map["transactions"]
    .dropDuplicates(["invoice_no", "stock_code"])
    .dropna()
    .join(
        broadcast(df_invoices.select("invoice_no")),
        on="invoice_no",
        how="inner"
    )
    .join(
        broadcast(df_products.select("stock_code")),
        on="stock_code",
        how="inner"
    )
)

# Define DataFrame-to-table mappings
df_tables = [
    (df_products, "products"),
    (df_customers, "customers"),
    (df_invoices, "invoices"),
    (df_transactions, "transactions")
]

# Write each DataFrame to its respective MySQL table
for frame, table in df_tables:
    frame.write.jdbc(
        url=jdbc_url,
        table=table,
        mode="append",
        properties={
            "user": user,
            "password": password,
            "driver": "com.mysql.cj.jdbc.Driver"
        }
    )

# Stop Spark session
spark.stop()
