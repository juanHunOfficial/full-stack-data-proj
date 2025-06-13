import os
import sys
from datetime import datetime

from pyspark import SparkFiles
from dotenv import load_dotenv
from pyspark.sql import SparkSession
from pyspark.sql.types import DateType, TimestampType
from pyspark.sql.functions import col, lit, to_timestamp, try_to_timestamp

from utils.logging import gotenv
from utils.transform import pyformat

os.environ["PYSPARK_PYTHON"] = "python"
os.environ["PYSPARK_DRIVER_PYTHON"] = "python"

print("Python version:", sys.version)

# Load environment variables
load_dotenv()
jdbc_path = gotenv("JDBC_PATH")

# Initialize SparkSession
spark = SparkSession.builder \
    .appName("E-Commerce Data") \
    .config("spark.jars", jdbc_path) \
    .getOrCreate()

spark.sparkContext.setLogLevel("FATAL")

# Load the CSV file into a DataFrame
df = spark.read.csv(r"C:\Users\kenneth.copas\OneDrive - PeopleShores PBC\Desktop\full-stack-data-proj\data_section\data\test-data.csv", header=True, inferSchema=True)

print("\nBefore:\n")
df.show(5)


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

# Show the dataframe to verify the transformations
print("\nAfter:\n")
df.show(5)

# Define the MySQL JDBC URL and connection properties
mysql_url = f"jdbc:mysql://{gotenv('MYSQL_HOST')}/{gotenv('MYSQL_DATABASE')}"
mysql_properties = {
    "user": gotenv("MYSQL_USER"),
    "password": gotenv("MYSQL_PASSWORD"),
    "driver": "com.mysql.cj.jdbc.Driver"
}

# Write the DataFrame to MySQL
df.write \
    .jdbc(url=mysql_url, table="sales_data", mode="append", properties=mysql_properties)

# Stop the Spark session
spark.stop()
