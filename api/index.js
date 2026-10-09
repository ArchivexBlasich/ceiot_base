import express from "express";
import { checkPostgres } from "./db_postgre/index.js";
import { checkMongo } from "./db_mongo/index.js";
import { errorHandler } from "./errorHandler.js";
import { deviceRoutes, measurementRoutes, webRoutes, termRoutes, adminRoutes } from "./routes/index.js";

// API Server

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.static("spa/static"));

const PORT = 8080;

app.use('/device', deviceRoutes);
app.use('/measurement', measurementRoutes);
app.use('/web', webRoutes);
app.use('/term', termRoutes);
app.use('/admin', adminRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {

    const ok_mongo = await checkMongo();
    if (!ok_mongo) {
        console.error('mongo measurement database Down');
    } else {
        console.log('mongo measurement database Up');
    }

    const ok_postgres = await checkPostgres();
    if (!ok_postgres) {
        console.error('postgres device database Down');
    } else {
        console.log('postgres device database Up');
    }
        
    console.log(`Listening at ${PORT}`);
});
