DROP VIEW IF EXISTS volunteer_event;
DROP VIEW IF EXISTS tickets_per_customer;
DROP TABLE IF EXISTS contracts_event_organizer;
DROP TABLE IF EXISTS contracts_guest_event;
DROP TABLE IF EXISTS customer_invite;
DROP TABLE IF EXISTS organizes_event;
DROP TABLE IF EXISTS volunteers_for_event;
DROP TABLE IF EXISTS creates_shift;
DROP TABLE IF EXISTS performs;
DROP TABLE IF EXISTS special_guest;
DROP TABLE IF EXISTS belongs;
DROP TABLE IF EXISTS requests;
DROP TABLE IF EXISTS contributes;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS shift;
DROP TABLE IF EXISTS ticket;
DROP TABLE IF EXISTS tier;
DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS province;
DROP TABLE IF EXISTS city;
DROP TABLE IF EXISTS venue;
DROP TABLE IF EXISTS volunteer;
DROP TABLE IF EXISTS organizer;
DROP TABLE IF EXISTS dependants;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id         SERIAL      PRIMARY KEY,
    phone_num       CHAR(10)    UNIQUE,
    first_name      TEXT,
    last_name       TEXT,
    street          TEXT,
    street_num      INTEGER,
    postal_code     CHAR(6),
    birthdate       DATE,
    email_address   TEXT        UNIQUE,
    password        TEXT,
    balance         MONEY DEFAULT 0.00);

CREATE TABLE customer ( 
    customer_id INTEGER PRIMARY KEY,
    FOREIGN KEY (customer_id) REFERENCES users(user_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE dependants (
    first_name  TEXT,
    last_name   TEXT,
    customer_id INTEGER,
    birthdate   DATE NOT NULL,
    PRIMARY KEY (first_name, last_name, customer_id),
    UNIQUE(customer_id, birthdate, first_name),
    FOREIGN KEY (customer_id)
        REFERENCES customer (customer_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE);

CREATE TABLE organizer (
    organizer_id INTEGER PRIMARY KEY,
    FOREIGN KEY (organizer_id) REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE);

CREATE TABLE volunteer (
    volunteer_id        INTEGER PRIMARY KEY,
    hours_volunteered   INTEGER,
    FOREIGN KEY (volunteer_id) REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE);

CREATE TABLE venue (
    street_num      INTEGER,
    street          TEXT,
    postal_code     CHAR(6),
    name            TEXT,
    capacity        INTEGER DEFAULT 0,
    PRIMARY KEY (street_num, street, postal_code));

CREATE TABLE city(
    postal_code CHAR(6),
    city TEXT,
    PRIMARY KEY (postal_code));

CREATE TABLE province (
    postal_code CHAR(6),
    province CHAR(2),
    PRIMARY KEY (postal_code));

CREATE TABLE event (
    event_id        SERIAL PRIMARY KEY,
    name            TEXT,
    start_time      TIMESTAMP DEFAULT LOCALTIMESTAMP,
    end_time        TIMESTAMP DEFAULT LOCALTIMESTAMP,
    visibility      TEXT DEFAULT 'public',
    budget          MONEY DEFAULT 0.00,
    organizer_id    INTEGER     NOT NULL,
    street_num      INTEGER     NOT NULL,
    street          TEXT        NOT NULL,
    postal_code     CHAR(6)     NOT NULL,
    UNIQUE (start_time, end_time, street_num, street, postal_code),
    FOREIGN KEY (organizer_id) REFERENCES organizer(organizer_id)
        ON DELETE CASCADE,
    FOREIGN KEY (street_num, street, postal_code) REFERENCES venue(street_num,
    street, postal_code)
        ON DELETE CASCADE);

CREATE TABLE tier (
    tier_id             SERIAL PRIMARY KEY,
    tier_description    TEXT DEFAULT 'Unreserved Seating',
    tier_name           TEXT DEFAULT 'General Admission',
    price               MONEY DEFAULT 0.0,
    organizer_id        INTEGER NOT NULL,
    FOREIGN KEY (organizer_id) REFERENCES organizer (organizer_id)
        ON DELETE CASCADE);

CREATE TABLE ticket (
    ticket_id   SERIAL     PRIMARY KEY,
    seat_number INTEGER,
    tier_id     INTEGER     NOT NULL,
    event_id    INTEGER     NOT NULL,
    customer_id INTEGER,
    UNIQUE (seat_number, event_id),
    FOREIGN KEY (tier_id)   REFERENCES tier (tier_id)
        ON DELETE CASCADE,
    FOREIGN KEY (event_id)  REFERENCES event (event_id)
        ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customer (customer_id)
        ON DELETE SET NULL);

CREATE TABLE shift (
    shift_id        SERIAL     PRIMARY KEY,
    role            TEXT,
    start_time      TIMESTAMP,
    end_time        TIMESTAMP,
    station         TEXT,
    volunteer_id    INTEGER,
    event_id        INTEGER     NOT NULL,
    FOREIGN KEY (volunteer_id) REFERENCES volunteer
        ON UPDATE CASCADE,
    FOREIGN KEY (event_id) REFERENCES event
        ON DELETE CASCADE
        ON UPDATE CASCADE);

CREATE TABLE items (
    item_id         SERIAL,
    amount          INTEGER     NOT NULL,
    item_name       TEXT        NOT NULL,
    PRIMARY KEY (item_ID)
);

CREATE TABLE contributes (
    contrib_user_id     INTEGER,
    item_id             SERIAL,
    contrib_start_time  TIMESTAMP,
    contrib_end_time    TIMESTAMP,
    contrib_amt         INTEGER,
    PRIMARY KEY (contrib_user_id, item_id),
    FOREIGN KEY (contrib_user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (item_id)
        REFERENCES items (item_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE requests (
    req_user_id INTEGER,
    item_id     SERIAL,
    req_amt     INTEGER,
    PRIMARY KEY (req_user_id, item_id),
    FOREIGN KEY (req_user_id)
        REFERENCES users (user_id)
        ON UPDATE CASCADE,
    FOREIGN KEY (item_id)
        REFERENCES items (item_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE belongs (
    street_num      INTEGER,
    street          TEXT,
    postal_code     CHAR(6),
    item_id         SERIAL,
    venue_location  TEXT,
    PRIMARY KEY (street_num, street, postal_code, item_id),
    FOREIGN KEY (street_num, street, postal_code)
        REFERENCES venue (street_num, street, postal_code)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (item_id)
        REFERENCES items (item_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE VIEW volunteer_event (event_id, name, start_time, end_time, organizer_first_name, organizer_last_name, street_num, street, postal_code) AS
SELECT e.event_id, e.name, e.start_time, e.end_time, u.first_name, u.last_name, e.street_num, e.street, e.postal_code
FROM event e, users u 
WHERE e.organizer_id = u.user_id;

CREATE VIEW tickets_per_customer(event_id, ticket_count) AS
SELECT E.event_id, COUNT(*)
FROM ticket T, users U, event E
WHERE T.customer_id = U.user_id AND T.event_id = E.event_id
GROUP BY T.customer_id, E.event_id;

CREATE TABLE special_guest (
    id          SERIAL PRIMARY KEY,
    first_name  TEXT,
    last_name   TEXT);

CREATE TABLE performs (
    guest_id    INTEGER,
    event_id    INTEGER,
    start_time  TIMESTAMP,
    end_time    TIMESTAMP,
   location    TEXT,
    PRIMARY KEY (guest_id, event_id),
    FOREIGN KEY (guest_id) REFERENCES special_guest,
    FOREIGN KEY (event_id) REFERENCES event
        ON DELETE CASCADE);

CREATE TABLE creates_shift (
    organizer_id INTEGER,
    shift_id INTEGER,
    date_created TIMESTAMP,
    PRIMARY KEY (organizer_id, shift_id),
    FOREIGN KEY (organizer_id) REFERENCES organizer
        ON DELETE CASCADE,
    FOREIGN KEY (shift_id) REFERENCES shift
        ON DELETE CASCADE);

CREATE TABLE volunteers_for_event (
    volunteer_id    INTEGER,
    event_id        INTEGER,
    PRIMARY KEY (volunteer_id, event_id),
    FOREIGN KEY (volunteer_id) REFERENCES volunteer
        ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES event
        ON DELETE CASCADE);

CREATE TABLE organizes_event (
    organizer_ID    INTEGER,
    event_id        INTEGER,
    FOREIGN KEY (organizer_id)
        REFERENCES organizer (organizer_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (event_id)
        REFERENCES event (event_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE);

CREATE TABLE customer_invite (
    customer_id     INTEGER,
    event_id        INTEGER,
    date_sent       TIMESTAMP,
    date_accepted   TIMESTAMP,
    PRIMARY KEY (customer_id, event_id),
    FOREIGN KEY (customer_id)
        REFERENCES customer (customer_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (event_id)
        REFERENCES event (event_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE);

CREATE TABLE contracts_guest_event (
    guest_id        INTEGER,
    event_id        INTEGER,
    date_invited    TIMESTAMP,
    date_accepted   TIMESTAMP,
    commission      MONEY,
    PRIMARY KEY (guest_id, event_id),
    FOREIGN KEY (guest_id) REFERENCES special_guest
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (event_id) REFERENCES event
        ON DELETE CASCADE
        ON UPDATE CASCADE);

CREATE TABLE contracts_event_organizer (
    event_id        INTEGER PRIMARY KEY,
    organizer_id    INTEGER,
    FOREIGN KEY (organizer_id) REFERENCES organizer
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (event_id) REFERENCES event
        ON DELETE CASCADE
        ON UPDATE CASCADE);

-- Omitting user_id because of auto-incrementing serial type
INSERT INTO 
users (phone_num, first_name, last_name, street, street_num, postal_code, birthdate, email_address, password, balance)
VALUES
	('1111111111', 'John',      'Smith',    'Johnson Street',   1111,   'K8V0A9',   '1990-05-08',   'john@gmail.com',           'pass1', 1.00),
	('2222222222', 'Jon',       'Smythe',   'Jonson Avenue',    2222,   'T4E0N7',   '1991-06-27',   'jon@gmail.com',            'pass2', 2.00),
	('3333333333', 'Jonathon',  'Smiff',    'Jonathon Court',   3333,   'M6S0A1',   '1993-03-03',   'jonathon3@gmail.com',      'pass3', 3.00),
	('4444444444', 'Johnnefer', 'Smith',    'Johnson Street',   1111,   'K8V0A9',   '1990-08-05',   'johnnefer85@gmail.com',    'pass4', 4.00),
	('5555555555', 'Johnson',   'Smyff',    'John Avenue',      5555,   'V6P1S8',   '2003-08-15',   'jonsmyff@outlook.com',     'pass5', 5.00),
	('6666666666', 'Vawlin',    'Tear',     'Main Street',      50,     'V6E1H3',   '2000-02-05',   'vawlintear@gmail.com',     'pass6', 1000.00),
	('7777777777', 'Ore',       'Guhnaiser','Pender Street',    30,     'V5L2V7',   '1985-11-30',   'oreguhnaiser@outlook.com', 'pass7', 50.00),
	('8888888888', 'Kaw',       'Stoomer',  'North Road',       3048,   'V5N1M1',   '1992-12-01',   'kawstoomer@gmail.com',     'pass8', 35.00);

INSERT INTO 
customer (customer_id)
VALUES (8), (1), (2), (4), (5), (7);

INSERT
INTO dependants(first_name, last_name, customer_id, birthdate)
VALUES
('John',	'Tolkien',	1,	'2012-08-07'),
('Jane',	'Austen',	2,	'2013-09-04'),
('Jackie',	'Chan',		4,	'2014-10-09'),
('Julia',	'Roberts',	5,	'2015-11-11'),
('Jack',	'Black',	8,	'2016-12-25'),
('Dee',     'Pendant',  7,  '2014-08-24');

INSERT INTO 
organizer (organizer_id) 
VALUES (7), (3), (4), (1), (2);

INSERT INTO 
volunteer (volunteer_id, hours_volunteered)
VALUES (6, 500), (2, 4), (4, 8), (1, 5), (5, 10), (7, 10);

INSERT INTO 
venue (street_num, street, postal_code, name, capacity)
VALUES
	(1234,	'Event St', 		'K8V2V3', null, 	1000),
	(4321,	'Planning St', 		'K8V2V3', null, 	1000),
	(800, 	'Griffiths Way', 	'V6B6G1', 'Rogers Arena', 			19700),
	(6288,	'Stadium Rd', 		'V6T1Z3', 'Thunderbird Stadium', 	12000),
	(170,	'Princes'' Blvd', 	'M6K3C3', 'BMO Field', 				40000),
	(350,	'W Georgia St', 	'V6B6B1', 'Vancouver Public Library, Central Library', 200);

INSERT INTO 
city (postal_code, city)
VALUES
    ('K8V2V3', 'Trenton'),
    ('V6B6G1', 'Vancouver'),
    ('V6T1Z3', 'Vancouver'),
    ('M6K3C3', 'Toronto'),
    ('V6B6B1', 'Vancouver'),
    ('T4E0N7', 'Red Deer County'),
    ('K8V0A9', 'Vancouver'),
    ('M6S0A1', 'Hamilton'),
    ('V6P1S8', 'Vancouver'),
    ('V6E1H3', 'Vancouver'),
    ('V5L2V7', 'Vancouver'),
    ('V5N1M1', 'Vancouver');

INSERT INTO 
province (postal_code, province)
VALUES
	('K8V2V3', 'ON'),
	('V6B6G1', 'BC'),
	('V6T1Z3', 'BC'),
	('M6K3C3', 'ON'),
	('V6B6B1', 'BC'),
    ('T4E0N7', 'AB'),
    ('K8V0A9', 'BC'),
    ('M6S0A1', 'ON'),
    ('V6P1S8', 'BC'),
    ('V6E1H3', 'BC'),
    ('V5N1M1', 'BC');

INSERT INTO 
event (name, start_time, end_time, visibility, budget, organizer_id, street_num, street, postal_code)
VALUES
	('Ore''s Spectacular Event', '2023-08-20 10:00:00', '2023-08-20 16:00:00', 'public', 1000.00, 7, 1234, 'Event St', 'K8V2V3'),
	('Ore''s Amazing Event',     '2023-09-17 18:00:00', '2023-09-18 00:00:00', 'public', 500.00, 7, 4321, 'Planning St', 'K8V2V3'),
	('Family Storytime',         '2023-10-18 12:00:00', '2023-10-18 16:00:00', 'public', 0.00, 4, 350, 'W Georgia St', 'V6B6B1'),
	('New Years'' Fireworks',    '2023-12-31 23:00:00', '2024-01-01 02:00:00', 'public', 10000.00, 1, 800, 'Griffiths Way', 'V6B6G1'),
	('Summer Storytime',         '2023-08-17 12:00:00', '2023-08-17 13:00:00', 'public', 1000.00, 2, 350, 'W Georgia St', 'V6B6B1'),
    ('BMO Concert',              '2023-08-25 17:00:00', '2023-08-25 21:00:00', 'public', 3000.00, 3, 170, 'Princes'' Blvd', 'M6K3C3');


INSERT
INTO tier (tier_name, tier_description, price, organizer_id)
VALUES
	('Balcony Seating', 	'Reserved Seating',   49, 7),
	('Standard Seating',	'Reserved Seating',   79, 7),
	('Rear Standing',		'Seating not provided',   99, 3),
	('Front Standing',		'Expedited Check-in',   129, 3),
	('VIP Box',				'Complimentary Refreshments;Expedited Check-in', 550, 1),
	('General Admission',	'Unreserved Seating', 	5, 2),
	('General Admission',	'Unreserved Seating', 	5, 4);


INSERT INTO 
ticket(seat_number, tier_id, event_id, customer_id)
VALUES
    (50, 1, 1, 8),
    (50, 1, 2, 8),
	(NULL, 6, 5, NULL),
	(NULL, 6, 5, 7),
    (NULL, 3, 6, 7),
    (NULL, 3, 6, 7),
    (NULL, 4, 6, 7),
    (NULL, 4, 6, 7),
	(500, 2, 1, 1),
	(125, 4, 2, 8),
	(5, 5, 4, 7),
    (NULL, 3, 2, 1);

INSERT
INTO shift(role, start_time, end_time, station, volunteer_id, event_id)
VALUES 
('Barista',     '2023-08-20 10:00:00', '2023-08-20 16:00:00', 'Concession',     6,      1),
('Line Cook',   '2023-09-17 18:00:00', '2023-09-17 23:00:00', 'Concession',     6,      2),
('Cashier',     '2023-10-18 12:00:00', '2023-10-18 16:00:00', 'Concession',     7,      3),
('Greeter',     '2023-12-31 23:00:00', '2024-01-01 00:00:00', 'Front of House', 1,      4),
('Cashier',     '2023-12-31 23:00:00', '2024-01-01 00:00:00', 'Ticket Booth',   4,      4),
('Security',    '2023-08-17 12:00:00', '2023-08-17 13:00:00', 'Security',       1,      5),
('Valet',       '2023-12-31 23:00:00', '2024-01-01 02:00:00', 'Parking Lot',    null,   4),
('Security',    '2023-08-20 10:00:00', '2023-08-20 16:00:00', 'Security',       null,   1),
('Cashier',     '2023-08-20 10:00:00', '2023-08-10 16:00:00', 'Concession',     null,   1);

INSERT
INTO organizes_event(organizer_id, event_id)
VALUES
	(7, 1),
	(3, 2),
	(4, 3),
	(1, 4),
	(2, 5);

INSERT
INTO creates_shift(organizer_id, shift_id, date_created)
VALUES
(7, 1, '2023-08-09 10:00:00'),
(3, 2, '2023-08-09 10:00:00'),
(4, 3, '2023-08-09 10:00:00'),
(1, 4, '2023-08-09 10:00:00'),
(1, 5, '2023-08-09 10:00:00'),
(2, 6, '2023-08-09 12:30:00'),
(1, 7, '2023-08-09 10:00:00'),
(7, 8, '2023-08-09 10:00:00'),
(7, 9, '2023-08-09 10:00:00');

INSERT
INTO volunteers_for_event(volunteer_id, event_id)
VALUES 
(6, 1),
(6, 2),
(4, 3),
(1, 4),
(5, 4),
(1, 5);

INSERT INTO 
items (amount, item_name) 
VALUES
	(50, 'chair'),
	(20, 'table'),
	(100,'bottled water'),
	(10, 'canopy'),
	(10, 'radio'),
	(1,  'microphone');

INSERT
INTO belongs (street_num, street, postal_code, item_id, venue_location)
VALUES
	(1234,	'Event St', 		'K8V2V3',	1,  'storage room'),
	(1234,	'Event St',		'K8V2V3',	2,  'storage room'),
	(6288,	'Stadium Rd',		'V6T1Z3',	3,  'patio'),
	(170,	'Princes'' Blvd',	'M6K3C3',	4,  'stage'),
	(1234,	'Event St',		'K8V2V3',	5,  'stage');

INSERT 
INTO special_guest (first_name, last_name)
VALUES 
	('Nigel',	'Ng'),
	('Gordon',	'Ramsay'),
	('Taylor',	'Swift'),
	('Harry',	'Houdini'),
	('Inori',	'Minase'),
	('Suisei',	'Hoshimachi'),
	('Gawr',		'Gura');

INSERT 
INTO contributes (contrib_user_id, item_id, contrib_start_time, contrib_end_time, contrib_amt) 
VALUES
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


INSERT
INTO customer_invite(customer_id, event_id, date_sent, date_accepted)
VALUES
	(8,  1,   '2023-01-01',   '2023-01-02'),
	(1,  2,   '2023-04-07',   '2023-04-07'),
	(2,  3,   '2023-04-10',   '2023-04-13'),
	(4,  4,   '2023-05-22',   '2023-05-24'),
	(5,  5,   '2023-07-01',   NULL);

INSERT
INTO performs(guest_id, event_id, start_time, end_time, location)
VALUES 
(1, 1, '2023-08-20 10:00:00', '2023-08-20 16:00:00', 'The Great Hall'),
(2, 2, '2023-09-17 18:00:00', '2023-09-18 00:00:00', 'Basement'),
(3, 3, '2023-05-18 12:00:00', '2023-05-18 16:00:00', 'The Three Broomsticks'),
(4, 4, '2023-12-31 23:00:00', '2024-01-01 02:00:00', 'FSC 1005'),
(5, 5, '2023-08-17 12:00:00', '2023-08-20 12:00:00', 'Thunderbird Stadium');

INSERT 
INTO contracts_guest_event (guest_id, event_id, date_invited, date_accepted, commission)
VALUES
(1, 1, '2023-08-04', '2023-08-07', '500.00'),
(2, 2, '2023-09-04', '2023-09-07', '50.00'),
(3, 3, '2023-05-04', '2023-05-07', '5.00'),
(4, 4, '2023-12-04', '2023-12-07', '0.50'),
(5, 5, '2023-08-04', '2023-08-07', '0.05');

INSERT 
INTO contracts_event_organizer (event_id, organizer_id)
VALUES
(1, 7),
(2, 3),
(3, 4),
(4, 1),
(5, 2);
