from pyspark.sql import Row, DataFrame


def pyformat(df: DataFrame, col: str, func: callable) -> DataFrame:
    """Applies a transformer function to a specific column in a DataFrame

    This function creates a formatter function that takes a row, applies
    the callable passed, and returns the new row. This formatter function
    is then passed to the spark.rdd.map function to be applied to all rows.

    Args:
        df (DataFrame): PySpark Dataframe
        col (str): Column name to be changed
        func (callable): Function to be applied to the column
    
    Returns:
        DataFrame: The newly formatted DataFrame
    """

    # Retrieve the DataFrame column names
    col_names = df.columns

    # Define a formatter function using the column name and function passed
    def formatter(row: Row) -> tuple:

        # Convert the row to a dict
        rd = row.asDict()

        # Call the function on the specified cell
        rd[col] = func(rd[col])

        # Return the updated row as a tuple
        return tuple(rd[col] for col in col_names)

    # Convert to rdd, map the formatter to each row, convert to DF, return
    return df.rdd.map(formatter).toDF(col_names)
