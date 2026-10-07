import pool from "./pool.js";

export async function insertDevice(id, name, key) {
    return await pool.query("INSERT INTO devices (device_id, name, key) VALUES ($1, $2, $3)", [id, name, key]);
}