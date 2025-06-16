import os
import glob
import shutil
from dateutil import parser

from pyspark.sql import SparkSession
from pyspark.sql.functions import trim, lower, col, broadcast

from utils.sql import SafeSQL
from utils.spark import pyformat
from utils.logging import time_log
from constants import HOME_PATH, NORMALIZED_SCHEMAS, SCHEMA


class DataClient:

    def __init__(self, spark, sql, jdbc_config) -> None:
        self.spark = spark
        self.sql = sql
        self.jdbc_config = jdbc_config

    @staticmethod
    def to_datetime_safe(t):
        try:
            return parser.parse(t).strftime("%Y/%m/%d %H:%M:%S")
        except Exception:
            time_log(f"Failed to parse {t}")
            return None

    def pipeline(self):

        time_log("Running pipeline...")

        # Initialize database and table
        self.sql.run_file(rf"{HOME_PATH}/sql/init.sql")

        time_log("Reading csv data...")

        # Load the CSV file into a DataFrame
        df = self.spark.read.csv(
            rf"{HOME_PATH}/data/e-commerce-data.csv",
            header=True
        )

        # Rename columns to snake_case
        df = df.toDF(*SCHEMA)

        time_log('Normalizing DataFrames...')

        # Create a map of normalized DataFrames
        df_map = {
            name: df.select(*schema)
            for name, schema in NORMALIZED_SCHEMAS.items()
        }

        time_log('Transforming Customers...')

        # Customers: Drop duplicates and null values
        df_customers = (
            df_map["customers"]
            .dropDuplicates(["customer_id"])
            .dropna()
        )

        time_log('Transforming Invoices...')

        # Invoices: Drop duplicates and null values, reformat invoice_date
        df_invoices = (
            df_map["invoices"]
            .dropDuplicates(["invoice_no"])
            .dropna()
        )
        df_invoices = pyformat(df_invoices, "invoice_date", self.to_datetime_safe)

        time_log('Transforming Products...')

        # Products: Drop duplicates and null values, standardize stock_code
        df_products = (
            df_map["products"]
            .withColumn("stock_code", trim(lower(col("stock_code"))))
            .dropDuplicates(["stock_code"])
            .dropna()
        )

        time_log('Transforming Transactions...')

        # Transactions: Drop duplicates and null values
        df_transactions = (
            df_map["transactions"]
            .dropDuplicates(["invoice_no", "stock_code"])
            .dropna()
            # Inner Join Invoices on invoice_no
            .join(
                broadcast(df_invoices.select("invoice_no")),
                on="invoice_no",
                how="inner"
            )
            # Inner Join Products on stock_code
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

        # Write each DataFrame to MySQL and csv
        for df, table in df_tables:

            time_log(f'Writing {table} to MySQL...')

            # Write to MySQL table
            df.write.jdbc(
                url=self.jdbc_config['url'],
                table=table,
                mode='append',
                properties=self.jdbc_config['properties']
            )

            time_log(f'Writing {table} to csv...')

            # Write to csv
            df.coalesce(1).write.csv(
                rf'{HOME_PATH}/data/temp',
                header=True,
                mode="overwrite"
            )

            time_log(f'Relocating {table}.csv...')

            # Retrieve filepath of csv
            csv_filepath = glob.glob(rf'{HOME_PATH}/data/temp/*.csv')[0]

            # Move file to tableau folder
            shutil.move(csv_filepath, rf'{HOME_PATH}/data/tableau/{table}.csv')

        time_log('Emptying data/temp...')

        # Clean out temp folder
        os.system(rf'rm -rf {HOME_PATH}/data/temp')
