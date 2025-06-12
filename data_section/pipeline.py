from pyspark.sql import SparkSession
from pyspark.sql.functions import col, lit, to_timestamp, try_to_timestamp
from pyspark.sql.types import DateType, TimestampType
from pyspark import SparkFiles
from dotenv import load_dotenv
from utils.logging import gotenv
import os

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
df = spark.read.csv("data_section/data/test-data.csv", header=True, inferSchema=True)

# Adjust headers to match mysql columns
df = df.toDF("invoice_no", "stock_code", "description", "quantity", "invoice_date", "unit_price", "customer_id", 'country')

# Show the dataframe to verify the transformations
df.show(5)

# Define the MySQL JDBC URL and connection properties
mysql_url = f"jdbc:mysql://{os.getenv('MYSQL_HOST')}/{os.getenv('MYSQL_DATABASE')}"
mysql_properties = {
    "user": os.getenv("MYSQL_USER"),
    "password": os.getenv("MYSQL_PASSWORD"),
    "driver": "com.mysql.cj.jdbc.Driver"
}

# Write the DataFrame to MySQL
df.write \
    .jdbc(url=mysql_url, table="sales_data", mode="append", properties=mysql_properties)

# Stop the Spark session
spark.stop()