CREATE DATABASE IF NOT EXISTS ecom_db;

USE ecom_db;

DROP TABLE sales_data;

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