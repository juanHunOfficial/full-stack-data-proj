DROP DATABASE ecom_db;

CREATE DATABASE IF NOT EXISTS ecom_db;

USE ecom_db;

-- Customers
CREATE TABLE
    IF NOT EXISTS customers (
        customer_id INT PRIMARY KEY,
        country VARCHAR(100)
    );

-- Invoices
CREATE TABLE
    IF NOT EXISTS invoices (
        invoice_no VARCHAR(20) PRIMARY KEY,
        customer_id INT,
        invoice_date DATETIME,
        FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
    );

-- Products
CREATE TABLE
    IF NOT EXISTS products (
        stock_code VARCHAR(20) PRIMARY KEY,
        description TEXT,
        unit_price DECIMAL(10, 2)
);

-- Transactions
CREATE TABLE
    IF NOT EXISTS transactions (
        invoice_no VARCHAR(20),
        stock_code VARCHAR(20),
        quantity INT,
        PRIMARY KEY (invoice_no, stock_code),
        FOREIGN KEY (invoice_no) REFERENCES invoices(invoice_no),
        FOREIGN KEY (stock_code) REFERENCES products(stock_code)
);
