create table if not exists users(
    id serial primary key,
    postal_code char(6),
    birthdate date,
    first_name text,
    last_name text,
    street_num integer,
    street text,
    city text,
    country text,
    phone_num text,
    province char(2),
    hours_volunteered integer
);

create table if not exists accounts(
    email_addr text primary key,
    password text,
    balance money,
    user_id int,
    foreign key(user_id) references users (id)
        on delete cascade
);




INSERT INTO users(postal_code, birthdate, first_name, last_name, street_num, street, city, country, phone_num, province, hours_volunteered)
VALUES (
    'PSTCOD',
    '1999-01-08',
    'first',
    'last',
    54,
    'street',
    'city',
    'country',
    '123-456-7890',
    'BC',
    NULL
);

INSERT INTO accounts(email_addr, password, balance, user_id) VALUES ('test@email.com', 'password', 0, 1111);