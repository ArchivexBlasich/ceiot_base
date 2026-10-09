import { MongoClient } from "mongodb";
import { Router } from 'express';
const router = Router();


// Measurements database setup and access

let database = null;
const collectionName = "measurements";

export async function startDatabase() {
    const uri = "mongodb://localhost:27017/?maxPoolSize=20&w=majority";	
    const connection = await MongoClient.connect(uri);
    database = connection.db();

    await insertMeasurement({id:'00', t:'18', h:'78'});
    await insertMeasurement({id:'00', t:'19', h:'77'});
    await insertMeasurement({id:'00', t:'17', h:'77'});
    await insertMeasurement({id:'01', t:'17', h:'77'});
    console.log("mongo measurement database Up");
}

async function getDatabase() {
    if (!database) await startDatabase();
    return database;
}

async function insertMeasurement(message) {
    const {insertedId} = await database.collection(collectionName).insertOne(message);
    return insertedId;
}

async function getMeasurements() {
    return await database.collection(collectionName).find({}).toArray();	
}


router.post('/', function (req, res) {
       console.log("device id    : " + req.body.id + " key         : " + req.body.key + " temperature : " + req.body.t + " humidity    : " + req.body.h);	
    const {insertedId} = insertMeasurement({id:req.body.id, t:req.body.t, h:req.body.h});
	res.send("received measurement into " +  insertedId);
});

router.get('/', async (req,res) => {
    res.send(await getMeasurements());
});

export { router as measurementRoutes };