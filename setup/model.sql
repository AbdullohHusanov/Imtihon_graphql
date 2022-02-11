CREATE DATABASE imtihon_loyiha;

CREATE TABLE categories (
    category_id serial primary key,
    category_name character varying(30) not null
);

DROP TABLE products cascade;

CREATE TABLE products (
    product_id serial primary key,
    product_category int references categories(category_id),
    product_name character varying(30) not null,
    price decimal(7, 2) not null,
    short_desc character varying(40) not null,
    long_desc text not null,
    product_img character varying(128) not null,
    product_created_at timestamptz 
); 

DROP TABLE users cascade;

CREATE TABLE users (
    user_id serial primary key,
    username character varying(128) not null unique,
    user_password character varying(300) not null,
    user_contact character varying(12) not null check (user_contact ~* '^9989[012345789][0-9]{7}$'),
    user_email character varying(100) not null check (user_email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
    user_created_at timestamptz,
    user_role varchar(10) default 'user'
);

CREATE TABLE orders (
    order_id serial primary key,
    user_id int not null references users(user_id),
    is_paid boolean default false
);

CREATE TABLE order_products (
    order_product_id serial primary key,
    order_id int references orders(order_id),
    product_id int references products(product_id)
);


INSERT INTO categories (category_name) VALUES 
('Phone'),
('TV'),
('Laptop'),
('Watch'),
('earphone');

INSERT INTO products ( product_category, product_name, price, short_desc, long_desc, product_img ) VALUES 
(
    3,
    'Razer blade 15',
    2500,
    'This is Razer blade 15',
    'Significantly more powerful camera system. Absolutely new sensations from the display.',
    '/home/abdulloh/Node-JS/JS/79-imtihon/iphone-13-pro-blue-select.jpeg'
),
(
    3,
    'Macbook Pro 13 inch with M1',
    1100,
    'This is Macbook Pro',
    'Significantly more powerful camera system. Absolutely new sensations from the display.',
    '/home/abdulloh/Node-JS/JS/79-imtihon/iphone-13-pro-blue-select.jpeg'
),
(
    2,
    'LG QLED 42`',
    800,
    'This is LG',
    'Significantly more powerful camera system. Absolutely new sensations from the display.',
    '/home/abdulloh/Node-JS/JS/79-imtihon/iphone-13-pro-blue-select.jpeg'
),
(
    4,
    'iWatch 6',
    400,
    'This is iWatch serie 6',
    'Significantly more powerful camera system. Absolutely new sensations from the display.',
    '/home/abdulloh/Node-JS/JS/79-imtihon/iphone-13-pro-blue-select.jpeg'
),
(
    5,
    'Airpods Max',
    520,
    'This is Airpods Max',
    'Significantly more powerful camera system. Absolutely new sensations from the display.',
    '/home/abdulloh/Node-JS/JS/79-imtihon/iphone-13-pro-blue-select.jpeg'
),
(
    1,
    'Iphone 12 pro',
    700,
    'This is Iphone 12 pro',
    'Significantly more powerful camera system. Absolutely new sensations from the display.',
    '/home/abdulloh/Node-JS/JS/79-imtihon/iphone-13-pro-blue-select.jpeg'
);

INSERT INTO users (username, user_password, user_contact, user_email) VALUES 
('ali', crypt('pass1234', gen_salt('bf')), '998983423843', 'falonchi@gmail.com'),
('vali', crypt('word457', gen_salt('bf')), '998938243423', 'pistonchi@gmail.com'),
('akmal', crypt('xaxa94', gen_salt('bf')), '998997343627', 'akmal@gmail.com'),
('anvar', crypt('ifd3485', gen_salt('bf')), '998902376427', 'falonchi@gmail.com'),
('hamid', crypt('su&%7', gen_salt('bf')), '998947894563', 'falonchi@gmail.com'),
('bekzod', crypt('HjhjJg776^&', gen_salt('bf')), '998975643265', 'falonchi@gmail.com'),
('husan', crypt('asu7632&&^$#', gen_salt('bf')), '998947894561', 'falonchi@gmail.com');


select 
    c.category_name,
    array_agg(p.product_name)
from categories c
inner join products p on p.product_category = c.category_id
group by c.category_name
;