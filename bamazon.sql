DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
item_id INT(11) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(150) NOT NULL,
department_name VARCHAR(50) NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT(11) NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Wellness Core Dry Dog Food", "Pet", 69.99, 20);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Old Mother Hubbard Dog Treats", "Pet", 6.25, 16);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Jade Leaf Matcha", "Food", 9.95, 35);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Apple Macbook Pro 15.4 Laptop", "Electronics", 2799.00, 12);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Car Dash Camera", "Electronics", 48.50, 25);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Apple Iphone X 256 GB", "Electronics", 1219.00, 10);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Bosch Icon 13A Wiper Blade", "Auto", 14.99, 13);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Bosch Icon 28A Wiper Blade", "Auto", 20.98, 15);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Amazing Grass Organic Vegan Protein Powder", "Food", 21.99, 25);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Oral-B Replacement Toothbrush Heads", "Health", 30.79, 17);