-- TOTAL_PRICE: Total price of transaction by invoice_no and stock_code --
SELECT
    t.invoice_no,
    t.stock_code,
    t.quantity * p.unit_price AS 'total_price'
FROM
    transactions t
NATURAL JOIN
    products p
ORDER BY
    invoice_no,
    stock_code DESC;

-- TOTAL_SHARES: Total number of shares purchased by stock_code --
SELECT
    stock_code,
    SUM(quantity) AS total_shares_purchased
FROM
    transactions
GROUP BY
    stock_code
ORDER BY
	total_shares DESC;

-- TOTAL_SPENT: Total money spent by customer_id --
SELECT
    i.customer_id,
    SUM(t.quantity * p.unit_price) AS total_money_spent
FROM
    transactions t
NATURAL JOIN
	invoices i
NATURAL JOIN
	products p
GROUP BY
    i.customer_id
ORDER BY
	total_spent DESC;

-- TRANSACTION_LIST: List of transactions by invoice_no --
SELECT
    p.stock_code,
    p.description,
    t.quantity AS 'total_shares',
    t.quantity * p.unit_price AS 'total_price'
FROM
    products p
NATURAL JOIN
    transactions t
WHERE
    t.invoice_no = %s
ORDER BY
    total_price DESC;

-- ALL_DETAILS: List of all details for a given column value --
SELECT
    *
FROM
    customers c
NATURAL JOIN
    invoices i
NATURAL JOIN
    transactions t
NATURAL JOIN
    products p
WHERE
    {} = %s
ORDER BY
    c.customer_id,
    i.invoice_no,
    t.stock_code,
    p.unit_price;