CREATE TABLE users (
    user_id         INTEGER     PRIMARY KEY,
    phone_num       CHAR(10)    UNIQUE,
    first_name      TEXT,
    last_name       TEXT,
    street          TEXT,
    street_num      INTEGER,
    postal_code     CHAR(6),
    birthdate       DATE,
    email_address   TEXT        UNIQUE,
    balance         MONEY);

CREATE TABLE items (
    item_id         INTEGER     NOT NULL,
    amount          INTEGER     NOT NULL,
    item_name       TEXT        NOT NULL,
    PRIMARY KEY (item_ID)
);

CREATE TABLE contributes (
    contrib_user_id     INTEGER,
    item_id             INTEGER,
    contrib_start_time  TIMESTAMP,
    contrib_end_time    TIMESTAMP,
    contrib_amt         INTEGER,
    PRIMARY KEY (contrib_user_id, item_id),
    FOREIGN KEY (contrib_user_id)
        REFERENCES users(user_id)
        ON UPDATE CASCADE,
    FOREIGN KEY (item_id)
        REFERENCES items (item_id)
        ON UPDATE CASCADE
);

CREATE TABLE requests (
    req_user_id INTEGER,
    item_id     INTEGER,
    req_amt     INTEGER,
    PRIMARY KEY (req_user_id, item_id),
    FOREIGN KEY (req_user_id)
        REFERENCES users (user_id)
        ON UPDATE CASCADE,
    FOREIGN KEY (item_id)
        REFERENCES items (item_id)
        ON UPDATE CASCADE
);

CREATE TABLE venue (
    street_num      INTEGER,
    street          TEXT,
    postal_code     CHAR(6),
    name            TEXT,
    capacity        INTEGER,
    PRIMARY KEY (street_num, street, postal_code));

CREATE TABLE belongs (
    street_num      INTEGER,
    street          TEXT,
    postal_code     CHAR(6),
    item_id         INTEGER,
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

CREATE TABLE province (
    postal_code CHAR(6),
    province CHAR(2),
    PRIMARY KEY (postal_code));

CREATE TABLE city(
    postal_code CHAR(6),
    city TEXT,
    PRIMARY KEY (postal_code));

CREATE TABLE customer (
    customer_id INTEGER PRIMARY KEY,
    FOREIGN KEY (customer_id) REFERENCES Users(user_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE organizer (
    organizer_id INTEGER PRIMARY KEY,
    FOREIGN KEY (organizer_id) REFERENCES Users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE);

CREATE TABLE volunteer (
    volunteer_id        INTEGER PRIMARY KEY,
    hours_volunteered   INTEGER,
    FOREIGN KEY (volunteer_id) REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE);

CREATE TABLE event (
    event_id        INTEGER     PRIMARY KEY,
    start_time      TIMESTAMP,
    end_time        TIMESTAMP,
    visibility      TEXT,
    budget          MONEY,
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

CREATE TABLE special_guest (
    id          INTEGER PRIMARY KEY,
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
    FOREIGN KEY (event_id) REFERENCES event);

CREATE TABLE shift (
    shift_id        INTEGER     PRIMARY KEY,
    role            TEXT,
    start_time      TIMESTAMP,
    end_time        TIMESTAMP,
    station         TEXT,
    volunteer_id    INTEGER,
    event_id        INTEGER     NOT NULL,
    FOREIGN KEY (volunteer_id) REFERENCES volunteer
        ON UPDATE CASCADE,
    FOREIGN KEY (event_id) REFERENCES event
        ON UPDATE CASCADE);

CREATE TABLE volunteers_for_event (
    volunteer_id    INTEGER,
    event_id        INTEGER,
    PRIMARY KEY (volunteer_id, event_id),
    FOREIGN KEY (volunteer_id) REFERENCES volunteer,
    FOREIGN KEY (event_id) REFERENCES event);

CREATE TABLE tier (
    tier_id             INTEGER PRIMARY KEY,
    tier_description    TEXT,
    tier_name           TEXT,
    price               MONEY);

CREATE TABLE ticket (
    ticket_id   INTEGER     PRIMARY KEY,
    seat_number INTEGER,
    tier_id     INTEGER     NOT NULL,
    event_id    INTEGER     NOT NULL,
    customer_id INTEGER,
    UNIQUE (seat_number, event_id),
    FOREIGN KEY (tier_id)   REFERENCES tier (tier_id),
    FOREIGN KEY (event_id)  REFERENCES event (event_id));



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

CREATE TABLE organizes_event (
    organizer_ID    INTEGER,
    event_id        INTEGER,
    customer_id     INTEGER,
    PRIMARY KEY (customer_id, event_id),
    FOREIGN KEY (organizer_id)
        REFERENCES organizer (organizer_ID)
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