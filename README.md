## CPSC 304 Project - Event Planning
The goal of our project was to create a platform for planning/organizing events. Here is a brief list of features:
* Users can register for an account and freely edit their account details 
* Users can create, edit and delete events; they can also adjust how many tickets are released for an event 
* Users can purchase tickets, or sign up/drop volunteer shifts - they can finetune their experience by filtering by city or province
* Users can browse a catalogue of all events/shifts
* Event organizers can view statistics about their events, like lifetime revenue or the number of returning customers


### Instructions for Running the App Locally
To run the project locally, make sure to run `npm install` in both the `frontend` and `backend` directories. Please also ensure that you have Docker installed.

Run `docker compose up --build` from the root directory. This should launch containers for PostgreSQL, the backend, the frontend, and pgAdmin. To shut down, run `docker compose down`. 

The frontend is viewable from `localhost:5173`

To see the database in pgAdmin, go to `localhost:5050` and login using the credentials `admin@admin.com` and `mypassword`. If there is no server added, please make a connection to the database by going to `Add New Server`.

Choose an arbitrary name for the server and in the connection tab, fill in the following:
- `postgres_db` in `Host name/address`
- `mypassword` in `Password`

To execute a .sql script to drop all tables and recreate the database, run
`docker exec -u postgres postgres_db psql test_db admin -f /docker-entrypoint-initdb.d/seed_db.sql`