import 'dotenv/config';
import { Pool } from 'pg';

if (!process.env.DB_HOST || !process.env.DB_PORT || !process.env.DB_USER || !process.env.DB_PASSWORD) {
 throw new Error('Faltan variables de entorno:');
}

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
});

export default pool;

export async function checkPostgres() {
    try {
        await pool.query('SELECT 1');
        return true;
    } catch (err) {
        return false;
    }
}