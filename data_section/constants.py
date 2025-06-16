# Original schema of csv, used to rename columns
SCHEMA = (
    'invoice_no',
    'stock_code',
    'description',
    'quantity',
    'invoice_date',
    'unit_price',
    'customer_id',
    'country'
)

# Normalized schema (table_name: (col, col, col...))
NORMALIZED_SCHEMAS = {
    'customers': (
        'customer_id',
        'country'
    ),
    'invoices': (
        'invoice_no',
        'customer_id',
        'invoice_date'
    ),
    'products': (
        'stock_code',
        'description',
        'unit_price'
    ),
    'transactions': (
        'invoice_no',
        'stock_code',
        'quantity'
    )
}

# Path to the working directory for data
HOME_PATH = r"/home/ubuntu/full-stack-data-proj/data_section"
