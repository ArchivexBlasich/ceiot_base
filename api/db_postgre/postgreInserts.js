import { db_postgreSQL } from "./postgres_pool.js";

export function insertDevice(id, name, key) {
    db_postgreSQL.none("INSERT INTO devices VALUES ('"+id+ "', '"+name+"', '"+key+"')");
}