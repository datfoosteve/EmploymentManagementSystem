USE corpo_db;

Insert into department
(name)
values
('mens'),
('womens'),
('childrens');

insert into role (title,salary,department_id)
values 
('Merchant',10,1),
('Outfitter',14,1),
('Alterator',25,2),
('Babysitter',13,3);

insert into employee(first_name,last_name,role_id,manager_id)
values
('Rick','Riordan',1,NULL),
('Emmet','Killjoy',2,1),
('Kyle','Darnasssus',3,2),
('SallyMae','Sargitarious',4,1);
