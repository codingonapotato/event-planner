import pg from 'pg'

const pool = new pg.Pool({
  user: 'admin',
  host: 'db',
  database: 'test_db',
  password: 'mypassword',
  port: 5432
});

export const query = async (text: string, values: any[]) => {
    const res = await pool.query(text, values);
    return res;
};