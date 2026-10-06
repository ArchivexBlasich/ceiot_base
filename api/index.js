import express from "express";
import { MongoClient } from "mongodb";
import startPostgreSQLDatabase, { getDevices, getDevicesById, insertDevice } from "./db_postgre/index.js";

import render from "./render.js";
import addAdminEndpoint from "./admin.js";
// Measurements database setup and access

let database = null;
const collectionName = "measurements";

async function startDatabase() {
    const uri = "mongodb://localhost:27017/?maxPoolSize=20&w=majority";	
    const connection = await MongoClient.connect(uri);
    database = connection.db();
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

// API Server

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.static("spa/static"));

const PORT = 8080;

app.post('/measurement', function (req, res) {
       console.log("device id    : " + req.body.id + " key         : " + req.body.key + " temperature : " + req.body.t + " humidity    : " + req.body.h);	
    const {insertedId} = insertMeasurement({id:req.body.id, t:req.body.t, h:req.body.h});
	res.send("received measurement into " +  insertedId);
});

app.post('/device', function (req, res) {
	console.log("device id    : " + req.body.id + " name        : " + req.body.n + " key         : " + req.body.k );

    insertDevice(req.body.id, req.body.n, req.body.k);
	res.send("received new device");
});


app.get('/web/device', function (req, res) {
	var devices = getDevices().map( function(device) {
		console.log(device);
		return '<tr><td><a href=/web/device/'+ device.device_id +'>' + device.device_id + "</a>" +
			       "</td><td>"+ device.name+"</td><td>"+ device.key+"</td></tr>";
	   }
	);
	res.send("<html>"+
		     "<head><title>Sensores</title></head>" +
		     "<body>" +
		        "<table border=\"1\">" +
		           "<tr><th>id</th><th>name</th><th>key</th></tr>" +
		           devices +
		        "</table>" +
		     "</body>" +
		"</html>");
});

app.get('/web/device/:id', function (req,res) {
    var template = "<html>"+
                     "<head><title>Sensor {{name}}</title></head>" +
                     "<body>" +
		        "<h1>{{ name }}</h1>"+
		        "id  : {{ id }}<br/>" +
		        "Key : {{ key }}" +
                     "</body>" +
                "</html>";


    var device = getDevicesById(req.params.id);
    
    if (device == null || (Array.isArray(device) && device.length === 0)) {
        res.status(404).send("El dispositivo NO existe");
        return;
    }
    
    console.log(device);
    res.send(render(template,{id:device[0].device_id, key: device[0].key, name:device[0].name}));
});	


app.get('/term/device/:id', function (req, res) {
    var red = "\x1b[31m";
    var green = "\x1b[32m";
    var blue = "\x1b[33m";
    var reset = "\x1b[0m";
    var template = "Device name " + red   + "   {{name}}" + reset + "\n" +
		   "       id   " + green + "       {{ id }} " + reset +"\n" +
	           "       key  " + blue  + "  {{ key }}" + reset +"\n";
    var device = getDevicesById(req.params.id);
    
    if (device == null || (Array.isArray(device) && device.length === 0)) {
        res.status(404).send("El dispositivo NO existe");
        return;
    }
    
    console.log(device);
    res.send(render(template,{id:device[0].device_id, key: device[0].key, name:device[0].name}));
});

app.get('/measurement', async (req,res) => {
    res.send(await getMeasurements());
});

app.get('/device', function(req,res) {
    res.send( getDevices() );
});

startDatabase().then(async() => {

    addAdminEndpoint(app, render);

    await insertMeasurement({id:'00', t:'18', h:'78'});
    await insertMeasurement({id:'00', t:'19', h:'77'});
    await insertMeasurement({id:'00', t:'17', h:'77'});
    await insertMeasurement({id:'01', t:'17', h:'77'});
    console.log("mongo measurement database Up");

    startPostgreSQLDatabase();
});

app.listen(PORT, () => {
        console.log(`Listening at ${PORT}`);
    });
