drop database if exists bamazon;

create database bamazon;

use bamazon;

create table products (
	item_id integer(10) not null auto_increment,
    product_name varchar(100) not null,
    department_name varchar(100) null,
    price float(10) not null,
    stock_quantity integer(10) null,
    primary key(item_id)
);

insert into products (product_name, department_name, price, stock_quantity)
values ("shampoo", "bathroom", 3.75, 100);

insert into products (product_name, department_name, price, stock_quantity)
values ("body wash", "bathroom", 4, 100);

insert into products (product_name, department_name, price, stock_quantity)
values ("burgers", "grocery", 5, 100);

insert into products (product_name, department_name, price, stock_quantity)
values ("hot dogs", "grocery", 5, 100);

insert into products (product_name, department_name, price, stock_quantity)
values ("ketchup", "grocery", 2.50, 100);

insert into products (product_name, department_name, price, stock_quantity)
values ("mustard", "grocery", 2, 100);

insert into products (product_name, department_name, price, stock_quantity)
values ("mayo", "grocery", 5, 100);

insert into products (product_name, department_name, price, stock_quantity)
values ("broom", "home", 15, 100);

insert into products (product_name, department_name, price, stock_quantity)
values ("dust pan", "home", 3, 100);

insert into products (product_name, department_name, price, stock_quantity)
values ("vaccum", "home", 50, 100);

select * from products;