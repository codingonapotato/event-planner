import express from 'express'
import mountRoutes from './src/routes'


// Pool.connect();

const app = express();
mountRoutes(app);

app.listen(8000, () => {
  console.log('Listening on port 8000');
});

// Pool.query('select * from users', (err, res) => {
//   console.log(res.rows);
// });