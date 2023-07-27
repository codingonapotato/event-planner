import pg from 'pg'

const pool = new pg.Pool({
  user: 'admin',
  host: 'db',
  database: 'test_db',
  password: 'mypassword',
  port: 5432
});

export const query = (text: string, values: any[]) => {
  return pool.query(text, values);
};