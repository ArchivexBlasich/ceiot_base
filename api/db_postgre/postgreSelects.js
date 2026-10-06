import { db_postgreSQL } from "./postgres_pool.js";

export function getDevices() 
{
    const devices = db_postgreSQL.many("SELECT * FROM devices");
    return devices;
}

export function getDevicesById(id)
{
    const device = db_postgreSQL.many(`SELECT * FROM devices WHERE device_id = '${id}'`);
    return device;
}