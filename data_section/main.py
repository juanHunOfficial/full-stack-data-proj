from dotenv import load_dotenv
from pyspark.sql import SparkSession

from app.data_client import DataClient
from utils.sql import SafeSQL
from utils.logging import gotenv

def main():

    # Load environment variables
    load_dotenv()

    # Retrieve environment variables
    jdbc_path = gotenv('JDBC_PATH')
    host = gotenv('MYSQL_HOST')
    database = gotenv('MYSQL_DATABASE')
    user = gotenv('MYSQL_USER')
    password = gotenv('MYSQL_PASSWORD')

    # Construct JDBC configurations
    jdbc_config = {
        'url': f'jdbc:mysql://{host}/{database}',
        'properties': {
            'user': user,
            'password': password,
            'driver': 'com.mysql.cj.jdbc.Driver'
        }
    }

    # Initialize MySQL connection
    sql = SafeSQL(
        host=host,
        user=user,
        password=password
    )

    # Initialize SparkSession
    spark = (
        SparkSession.builder
        .appName('E-Commerce Data')
        .config('spark.jars', jdbc_path)
        .getOrCreate()
    )
    spark.sparkContext.setLogLevel('FATAL')

    dc = DataClient(spark, sql, jdbc_config)

    dc.pipeline()

if __name__ == '__main__':
    main()