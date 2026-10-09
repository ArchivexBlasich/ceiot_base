import 'dotenv/config';
import { Pool } from 'pg';

if (!process.env.DB_POSTGRESQL_HOST || !process.env.DB_POSTGRESQL_PORT || !process.env.DB_POSTGRESQL_USER || !process.env.DB_POSTGRESQL_PASSWORD) {
 throw new Error('Faltan variables de entorno:');
}

const pool = new Pool({
  user: process.env.DB_POSTGRESQL_USER,
  password: process.env.DB_POSTGRESQL_PASSWORD,
  host: process.env.DB_POSTGRESQL_HOST,
  port: process.env.DB_POSTGRESQL_PORT,
  database: process.env.DB_POSTGRESQL_DATABASE
});

export async function checkPostgres() {
    try {
        await pool.query('SELECT 1');
        return true;
    } catch (err) {
        return false;
    }
}

export default pool;