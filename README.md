### Brief Overview
To setup, make sure to run `npm install` in both the `frontend` and `backend` directories. 

Run `docker compose up --build` from the root directory. This should launch containers for PostgreSQL and the backend. To shut down, run `docker compose down`. 

The frontend is viewable from `localhost:5173`

To see the database in pgAdmin, go to `localhost:5050` and login using the credentials `admin@admin.com` and `mypassword`. If there is no server added, please make a connection to the database by going to `Add New Server`.

Choose an arbitrary name for the server and in the connection tab, fill in the following:
- `postgres_db` in `Host name/address`
- `mypassword` in `Password`