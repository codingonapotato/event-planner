import pg from 'pg'
import express from 'express'

const client = new pg.Client({
  user: 'admin',
  host: 'db',
  database: 'test_db',
  password: 'mypassword',
  port: 5432,
});

const app = express();
app.get('/', (req, res) => {
  res.send("hello world!");
});

app.listen(8000, () => {
  console.log('Listening on port 8000');
});

client.connect().then(() => {
  client.query('SELECT * FROM users', (err, res) => {
    console.log(err);
    console.log(res.rows)
    client.end();
  });

  client.query('select * from accounts', (err, res) => {
    console.log(res.rows);
  })

  client.end();
}).catch((error) => {
  console.log(error)
});