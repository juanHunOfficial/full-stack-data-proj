import os
import sys
from datetime import datetime

from pyspark import SparkFiles
from dotenv import load_dotenv
from pyspark.sql import SparkSession
from pyspark.sql.types import DateType, TimestampType
from pyspark.sql.functions import broadcast, trim, lower, col, lit, to_timestamp, try_to_timestamp

from utils.logging import gotenv
from utils.transform import pyformat
from utils.sql import SafeSQL

# Load environment variables
load_dotenv()
jdbc_path = gotenv("JDBC_PATH")

# Establish database connection
sql = SafeSQL(
    host=gotenv("MYSQL_HOST"),
    user=gotenv("MYSQL_USER"),
    password=gotenv("MYSQL_PASSWORD")
)

# Initialize SparkSession
spark = SparkSession.builder \
    .appName("E-Commerce Data") \
    .config("spark.jars", jdbc_path) \
    .getOrCreate()

spark.sparkContext.setLogLevel("FATAL")

# Initialize database and table
sql.run_file('data_section/sql/init.sql')

# Load the CSV file into a DataFrame
df = spark.read.csv(r"/home/ubuntu/full-stack-data-proj/data_section/data/e-commerce-data.csv", header=True, inferSchema=True)

# Create to_datetime function
def to_datetime_safe(t):
    try:
        return datetime.strptime(t, '%m/%d/%Y %H:%M').strftime('%Y/%m/%d %H:%M:%S')
    except Exception:
        return None  # or original value if you prefer


# Use the to_datetime function to format the InvoiceDate column of the dataframe
df = pyformat(df, 'InvoiceDate', to_datetime_safe)

# Rename dataframe columns to snake_case
df = df.toDF('invoice_no', 'stock_code', 'description', 'quantity', 'invoice_date', 'unit_price', 'customer_id', 'country')

# Extract tables and drop duplicates
df_customers = df \
    .select(
        'customer_id',
        'country'
    ) \
    .dropDuplicates(['customer_id']) \
    .dropna()

df_invoices = df \
    .select(
        'invoice_no',
        'invoice_date',
        'customer_id'
    ) \
    .dropDuplicates(['invoice_no']) \
    .dropna()

df_products = df \
    .select(
        'stock_code',
        'description',
        'unit_price'
    ) \
    .withColumn('stock_code', trim(lower(col('stock_code')))) \
    .dropDuplicates(['stock_code']) \
    .dropna()
    
df_transactions = df \
    .select(
        'invoice_no',
        'stock_code',
        'quantity'
    ) \
    .dropDuplicates(['invoice_no', 'stock_code']) \
    .join(
        broadcast(df_invoices.select("invoice_no")),
        on="invoice_no",
        how="inner"
    ) \
    .join(
        broadcast(df_products.select("stock_code")),
        on="stock_code",
        how="inner"
    ) \
    .dropna()

# DataFrame - Table pairs
df_tables = (
    (df, 'raw_data'),
    (df_products, 'products'),
    (df_customers, 'customers'),
    (df_invoices, 'invoices'),
    (df_transactions, 'transactions')
)

# Define the MySQL JDBC URL and connection properties
mysql_url = f"jdbc:mysql://{gotenv('MYSQL_HOST')}/{gotenv('MYSQL_DATABASE')}"
mysql_properties = {
    "user": gotenv("MYSQL_USER"),
    "password": gotenv("MYSQL_PASSWORD"),
    "driver": "com.mysql.cj.jdbc.Driver"
}

# Write each DataFrame to it's respective table
for df, table in df_tables:
    df.write.jdbc(url=mysql_url, table=table, mode="append", properties=mysql_properties)

# Stop the Spark session
spark.stop()
