import express from "express";
import { checkPostgres } from "./db_postgre/index.js";
import { errorHandler } from "./errorHandler.js";
import { deviceRoutes, measurementRoutes, webRoutes, termRoutes, adminRoutes } from "./routes/index.js";
import { startDatabase } from "./routes/measurement/measurement.js";

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

startDatabase().then(async() => {

    const ok = await checkPostgres();
    if (!ok) {
        console.error('postgres device database Down');
    } else {
        console.log('postgres device database Up');
    }
});

app.use(errorHandler);

app.listen(PORT, () => {
        console.log(`Listening at ${PORT}`);
    });
