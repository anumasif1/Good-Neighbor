DROP DATABASE IF EXISTS goodneighbor_db;
CREATE DATABASE goodneighbor_db;

USE goodneighbor_db;

CREATE table members(
member_id int not null auto_increment,
member_name varchar (50) not null,
email_address nvarchar (320) not null,
street_address varchar (80) not null,
address_2 varchar (80),
postal_code int not null,
default_radius int,
coordinates point,
Primary key (member_id)
);

SELECT * from members;

create table posts(
post_id int not null auto_increment,
member_id int,
member_post varchar (50) not null,
post_type varchar (50) not null,
post_price int,
Primary Key (post_id),
Foreign Key (member_id) REFERENCES members(member_id)
);

select * from posts;
Delete from posts where post_id between 1 and 4;


create table comments(
comment_id int not null auto_increment,
member_id int,
post_id int,
member_comment varchar(300),
primary key (comment_id),
foreign key(member_id) references members(member_id),
foreign key(post_id) references posts(post_id)
);

select * from comments;
