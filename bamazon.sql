DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
item_id INT(11) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(150) NOT NULL,
department_name VARCHAR(50) NULL,
product_sales INTEGER(11) DEFAULT 0,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT(11) NOT NULL,
PRIMARY KEY (item_id)
);

-- CREATE TABLE departments (
-- department_id INTEGER(11) NOT NULL AUTO_INCREMENT,
-- department_name VARCHAR(30) NOT NULL,
-- over_head_costs INTEGER(11),
-- PRIMARY KEY (department_id)
-- );

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

-- INSERT INTO departments (department_name, over_head_costs) VALUES ('Pet', '300');
-- INSERT INTO departments (department_name, over_head_costs) VALUES ('Food', '200');
-- INSERT INTO departments (department_name, over_head_costs) VALUES ('Electronics', '7000');
-- INSERT INTO departments (department_name, over_head_costs) VALUES ('Auto', '500');
-- INSERT INTO departments (department_name, over_head_costs) VALUES ('Health', '200');

-- SELECT * FROM products;
-- SELECT item_id, product_name, price FROM products WHERE item_id="1";
-- UPDATE products SET product_sales= 4 WHERE item_id=7;
-- SELECT * FROM products;

-- SELECT * FROM departments;

-- SELECT department_id, departments.department_name, over_head_costs, SUM(product_sales) AS product_sales, ( over_head_costs - product_sales) AS total
-- FROM departments
-- LEFT JOIN products ON departments.department_name = products.department_name
-- GROUP BY departments.department_name;