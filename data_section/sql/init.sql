CREATE DATABASE IF NOT EXISTS ecom_db;

USE ecom_db;

DROP TABLE IF EXISTS sales_data;

CREATE TABLE
    IF NOT EXISTS sales_data (
        invoice_no VARCHAR(20),
        stock_code VARCHAR(20),
        description TEXT,
        quantity INT,
        invoice_date DATETIME,
        unit_price DECIMAL(10, 2),
        customer_id INT,
        country VARCHAR(100)
    );

INSERT INTO
    sales_data
VALUES
    (
        123,
        456,
        'some invoice',
        3,
        '2025-06-12 10:30:00',
        2.4,
        348,
        'United States'
    )