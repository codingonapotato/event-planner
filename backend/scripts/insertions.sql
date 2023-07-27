INSERT 
INTO items (item_id, amount, item_name) 
VALUES
	(1, 50, 'chair'),
	(2, 20, 'table'),
	(3, 100,'bottled water'),
	(4, 10, 'canopy'),
	(5, 10, 'radio'),
	(6, 1,  'microphone');

INSERT INTO 
province (postal_code, province)
VALUES
	('K7S9E2', 'ON'),
	('V3A3R2', 'BC'),
	('M6K3L3', 'ON'),
	('M4W34K', 'ON'),
	('V5L4S1', 'BC');

INSERT INTO 
city (postal_code, city)
VALUES
	('V6B6G1', 'Vancouver'),
    ('V3A3R2', 'Langley City'),
    ('M6K3L3', 'Toronto'),
    ('M4W34K', 'Toronto'),
	('V5L4S1', 'Vancouver');

INSERT INTO 
venue (street_num, street, postal_code, name, capacity)
VALUES
	(1234,	'Sesame St', 		'K8V2V3', 'Big Bird''s Emporium', 	100),
	(800, 	'Griffiths Way', 	'V6B6G1', 'Rogers Arena', 			19700),
	(6288,	'Stadium Rd', 		'V6T1Z3', 'Thunderbird Stadium', 	12000),
	(170,	'Princes'' Blvd', 	'M6K3C3', 'BMO Field', 				40000),
	(350,	'W Georgia St', 	'V6B6B1', 'Vancouver Public Library, Central Library', 200);

INSERT
INTO belongs (street_num, street, postal_code, item_id, venue_location)
VALUES
	(1234,	'Sesame St',		'K8V2V3',	1,  'storage room'),
	(1234,	'Sesame St',		'K8V2V3',	2,  'storage room'),
	(6288,	'Stadium Rd',		'V6T1Z3',	3,  'patio'),
	(170,	'Princes'' Blvd',	'M6K3C3',	4,  'stage'),
	(1234,	'Sesame St',		'K8V2V3',	5,  'stage');

INSERT 
INTO special_guest (id, first_name, last_name)
VALUES 
	(0, 'Nigel',	'Ng'),
	(1, 'Gordon',	'Ramsay'),
	(2, 'Taylor',	'Swift'),
	(3, 'Harry',	'Houdini'),
	(4, 'Inori',	'Minase'),
	(5, 'Suisei',	'Hoshimachi'),
	(6, 'Gawr',		'Gura');

INSERT INTO 
users (user_id, phone_num, first_name, last_name, street, street_num, postal_code, birthdate, email_address, balance)
VALUES
	(1, '1111111111', 'John', 'Smith', 'Johnson Street', 1111, 'V1R68B', '1990-05-08', 'john@gmail.com', 1.00),
	(2, '2222222222', 'Jon', 'Smythe', 'Jonson Avenue', 2222, 'T4E0N7', '1991-06-27', 'jon@gmail.com', 2.00),
	(3, '3333333333', 'Jonathon', 'Smiff', 'Jonathon Court', 3333, 'J0T8X6', '1993-03-03', 'jonathon3@gmail.com', 3.00),
	(4, '4444444444', 'Johnnefer', 'Smith', 'Johnson Street', 1111, 'V1R68B', '1990-08-05', 'johnnefer85@gmail.com', 4.00),
	(5, '5555555555', 'Johnson', 'Smyff', 'John Avenue', 5555, 'V3H7E1', '2003-08-15', 'jonsmyff@outlook.com', 5.00),
	(6, '6666666666', 'Vawlin', 'Tear', 'Main Street', 50, 'P9N3R6', '2000-02-05', 'vawlintear@gmail.com', 1000.00),
	(7, '7777777777', 'Ore', 'Guhnaiser', 'Pender Street', 30, 'E8L8L4', '1985-11-30', 'oreguhaniser@outlook.com', 50.00),
	(8, '8888888888', 'Kaw', 'Stoomer', 'North Road', 3048, 'J0E4H0', '1992-12-01', 'kawstoomer@gmail.com', 35.00);


INSERT INTO 
customer (customer_id)
VALUES (8), (1), (2), (4), (5);

INSERT INTO 
organizer (organizer_id) 
VALUES (7), (3), (4), (1), (2);

INSERT INTO 
volunteer (volunteer_id, hours_volunteered)
VALUES (6, 500), (2, 4), (4, 8), (1, 5), (5, 10);


INSERT 
INTO contributes (contrib_user_id, item_id, contrib_start_time, contrib_end_time, contrib_amt) VALUES
	(1,  1, '2023-07-25 9:00:00',	'2023-07-25 16:00:00',  5),
	(2,  1, '2023-07-25 9:00:00',	'2023-07-25 16:00:00',  10),
	(4,  3, '2023-07-25 9:00:00',	'2023-07-25 16:00:00',  20),
	(5,  3, '2023-07-25 9:00:00',	'2023-07-25 16:00:00',  30),
	(8,  3, '2023-07-25 9:00:00',	'2023-07-25 16:00:00',  50);

INSERT 
INTO requests (req_user_id, item_id, req_amt)
VALUES
	(1,  1,   20),
	(2,  2,   10),
	(3,  3,   100),
	(3,  4,   5),
	(7,  5,   2);


INSERT INTO 
event (event_id, start_time, end_time, visibility, budget, organizer_id, street_num, street, postal_code)
VALUES
	(1, '2023-08-20 10:00:00', '2023-08-20 16:00:00', 'public', 1000.00, 7, 1234, 'Sesame St', 'K8V2V3'),
	(2, '2023-09-17 18:00:00', '2023-09-18 00:00:00', 'private', 500.00, 3, 1234, 'Sesame St', 'K8V2V3'),
	(3, '2023-05-18 12:00:00', '2023-05-18 16:00:00', 'public', 0.00, 4, 350, 'W Georgia St', 'V6B6B1'),
	(4, '2023-12-31 23:00:00', '2024-01-01 02:00:00', 'public', 10000.00, 1, 800, 'Griffiths Way', 'V6B6G1'),
	(5, '2023-08-17 12:00:00', '2023-08-20 12:00:00', 'public', 1000.00, 2, 350, 'W Georgia St', 'V6B6B1');


INSERT
INTO tier (tier_id, tier_description, tier_name, price)
VALUES
	(1,  'Balcony Seating', 	'Tier 1',   49),
	(2,  'Standard Seating',	'Tier 2',   79),
	(3,  'Rear Standing',		'Tier 3',   99),
	(4,  'Front Standing',		'Tier 4',   129),
	(5,  'VIP Box',				'VIP',  	550),
	(6, 'General Admission',	'Tier 0', 	5);


INSERT INTO 
ticket(ticket_id, seat_number, tier_id, event_id, customer_id)
VALUES
	(1, NULL, 6, 5, NULL),
	(2, NULL, 6, 5, 8),
	(3, 500, 2, 1, 1),
	(4, 125, 4, 4, 4),
	(5, 5, 5, 3, 2);


INSERT
INTO dependants(first_name, last_name, customer_id, birthdate)
VALUES
('John',	'Tolkien',	1,	'2012-08-07'),
('Jane',	'Austen',	2,	'2013-09-04'),
('Jackie',	'Chan',		4,	'2014-10-09'),
('Julia',	'Roberts',	5,	'2015-11-11'),
('Jack',	'Black',	8,	'2016-12-25');

INSERT
INTO organizes_event(organizer_id, event_id, customer_id)
VALUES
	(7, 1, 8),
	(3, 2, 1),
	(4, 3, 2),
	(1, 4, 4),
	(2, 5, 5);

INSERT
INTO customer_invite(customer_id, event_id, date_sent, date_accepted)
VALUES
	(8,  1,   '2023-01-01',   '2023-01-02'),
	(1,  2,   '2023-04-07',   '2023-04-07'),
	(2,  3,   '2023-04-10',   '2023-04-13'),
	(4,  4,   '2023-05-22',   '2023-05-24'),
	(5,  5,   '2023-07-01',   NULL);

INSERT
INTO Shift(shift_id, role, start_time, end_time, station, volunteer_id, event_id)
VALUES 
('0','Barista', '2023-08-10 10:00:00', '2023-08-13 12:00:00', 'Concession', 6, 1),
('1','Line Cook', '2023-08-10 10:00:00', '2023-08-13 17:00:00', 'Concession', 2, 2),
('2','Cashier', '2023-08-10 10:00:00', '2023-08-13 17:00:00', 'Concession', 4, 3),
('3','Greeter', '2023-08-10 10:00:00', '2023-08-13 17:00:00', 'Front of House', 1, 4),
('4','Cashier', '2023-08-10 10:00:00', '2023-08-13 17:00:00', 'Ticket Booth', 5, 4),
('5','Security', '2023-08-10 12:30:00', '2023-08-13 17:00:00', 'Security', 1, 5);

INSERT
INTO volunteers_for_event(volunteer_id, event_id)
VALUES 
('6', '1'),
('2', '2'),
('4', '3'),
('1', '4'),
('5', '4'),
('1', '5');

INSERT
INTO performs(guest_id, event_id, start_time, end_time, location)
VALUES 
('0', '1', '2023-08-20 10:00:00', '2023-08-20 16:00:00', 'The Great Hall'),
('1', '2', '2023-09-17 18:00:00', '2023-09-18 00:00:00', 'Basement'),
('2', '3', '2023-05-18 12:00:00', '2023-05-18 16:00:00', 'The Three Broomsticks'),
('3', '4', '2023-12-31 23:00:00', '2024-01-01 02:00:00', 'FSC 1005'),
('4', '5', '2023-08-17 12:00:00', '2023-08-20 12:00:00', 'Thunderbird Stadium');

INSERT 
INTO contracts_guest_event (guest_id, event_id, date_invited, date_accepted, commission)
VALUES
('1', '1', '2023-08-04', '2023-08-07', '500.00'),
('2', '2', '2023-09-04', '2023-09-07', '50.00'),
('3', '3', '2023-05-04', '2023-05-07', '5.00'),
('4', '4', '2023-12-04', '2023-12-07', '0.50'),
('5', '5', '2023-08-04', '2023-08-07', '0.05');

INSERT 
INTO contracts_event_organizer (event_id, organizer_id)
VALUES
('1', '7'),
('2', '3'),
('3', '4'),
('4', '1'),
('5', '2');

