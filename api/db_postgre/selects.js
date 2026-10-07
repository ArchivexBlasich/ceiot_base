import pool from "./pool.js";

export async function getDevices() 
{
    const { rows } = await pool.query("SELECT * FROM devices");
    return rows;
}

export async function getDevicesById(id)
{
    const { rows } = await pool.query("SELECT * FROM devices WHERE device_id = $1", [id]);
    return rows;
}