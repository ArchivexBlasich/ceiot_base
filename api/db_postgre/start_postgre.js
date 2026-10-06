import { db_postgreSQL } from "./postgres_pool.js";

const startPostgreSQLDatabase = () => {

    db_postgreSQL.none("CREATE TABLE devices (device_id VARCHAR, name VARCHAR, key VARCHAR)");
    db_postgreSQL.none("INSERT INTO devices VALUES ('00', 'Fake Device 00', '123456')");
    db_postgreSQL.none("INSERT INTO devices VALUES ('01', 'Fake Device 01', '234567')");
    db_postgreSQL.none("CREATE TABLE users (user_id VARCHAR, name VARCHAR, key VARCHAR)");
    db_postgreSQL.none("INSERT INTO users VALUES ('1','Ana','admin123')");
    db_postgreSQL.none("INSERT INTO users VALUES ('2','Beto','user123')");

    console.log("sql device database up");
};

export default startPostgreSQLDatabase;