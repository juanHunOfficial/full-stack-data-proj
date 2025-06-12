from pyspark.sql import Row, DataFrame


def pyformat(df: DataFrame, col: str, func: callable) -> callable:
    """
    Takes a pyspark dataframe, column name, and function. Uses the df.rdd.map
    method to apply the function to a specific column in the dataframe and
    returns the updated dataframe.

    Args:
        df (DataFrame): PySpark Dataframe
        col (str): Column name to be changed
        func (callable): Function to be applied to the column
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
        return tuple([rd[col] for col in col_names])

    # Convert to rdd, map the formatter to each row, convert to DF, return
    return df.rdd.map(formatter).toDF(col_names)
