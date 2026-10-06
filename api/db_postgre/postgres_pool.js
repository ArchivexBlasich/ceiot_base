import { newDb } from "pg-mem";

export const db_postgreSQL = newDb().public;
