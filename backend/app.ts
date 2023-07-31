import express from 'express'
import mountRoutes from './src/routes'
import cors from 'cors';
import bodyParser from 'body-parser';


// Pool.connect();

const app = express();
app.use(cors());
app.use(bodyParser.json());
mountRoutes(app);

app.listen(8000, () => {
  console.log('Listening on port 8000');
});

// Pool.query('select * from users', (err, res) => {
//   console.log(res.rows);
// });