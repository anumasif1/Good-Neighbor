INSERT INTO members(member_name, email_address, street_address, address_2, postal_code, default_radius, coordinates)
values
('John','john@gmail.com', 'Campus Drive', 253, 92602, 1,null),
('Asad','asad@gmail.com', 'Campus Drive',2, 92602, 0.5,null);

INSERT INTO posts(member_post, post_type, post_price)
values 
('Cookies cookies', 'Sell', 20);

INSERT INTO comments(member_comment)
values 
('I would love some cookies');
