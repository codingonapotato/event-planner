import pg from 'pg'
import express from 'express'

const Pool = new pg.Pool({
  user: 'admin',
  host: 'db',
  database: 'test_db',
  password: 'mypassword',
  port: 5432
});

Pool.connect();

const app = express();
app.get('/', (req, res) => {
  res.send("hello world!");
});

app.listen(8000, () => {
  console.log('Listening on port 8000 test');
});

Pool.query('select * from users', (err, res) => {
  console.log(res.rows);
});