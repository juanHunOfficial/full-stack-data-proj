from dotenv import load_dotenv
import pandas as pd

from utils.sql import SafeSQL
from utils.logging import gotenv


# Load .env variables
load_dotenv()
pd.set_option('display.max_columns', None)

# Save environment variables into memory
user = gotenv('MYSQL_USER')
password = gotenv('MYSQL_PASSWORD')
host = gotenv('MYSQL_HOST')

# Make SafeSQL connection
sql = SafeSQL(
    host=host,
    user=user,
    password=password
)

# Run the database and table initialization
sql.run_file('data_section/sql/init.sql')

# Query the sales_data table
output = sql.run('SELECT * FROM sales_data')

# Create a dataframe from the data (The first row is always the column names)
df = pd.DataFrame(output[1:], columns=output[0])

print(df)
