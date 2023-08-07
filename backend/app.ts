import express from 'express'
import mountRoutes from './src/routes'
import cors from 'cors';


// Pool.connect();

const app = express();
app.use(cors());
app.use(express.json());
mountRoutes(app);

app.listen(8000, () => {
  console.log('Listening on port 8000');
});

// Pool.query('select * from users', (err, res) => {
//   console.log(res.rows);
// });