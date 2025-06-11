from utils.sql import SafeSQL
from utils.logging import gotenv
from dotenv import load_dotenv
import pandas as pd


load_dotenv()

sql = SafeSQL(
    host=gotenv('MYSQL_HOST'),
    user=gotenv('MYSQL_USER'),
    password=gotenv('MYSQL_PASSWORD')
)

sql.run('SELECT 1;')

# df = pd.read_csv(r'data_section/data/e-commerce-data.csv', nrows=10)

# print(df)
