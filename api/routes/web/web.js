import render from "../../render.js";
import { getDevices, getDevicesById } from "../../db_postgre/index.js";
import { Router } from 'express';
const router = Router();

router.get('/device', async (req, res) => {
	var devices = (await getDevices()).map( function(device) {
		console.log(device);
		return '<tr><td><a href=/web/device/'+ device.device_id +'>' + device.device_id + "</a>" +
			       "</td><td>"+ device.name+"</td><td>"+ device.key+"</td></tr>";
	   }
	).join("");
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

router.get('/device/:id', async (req, res) => {
    var template = "<html>"+
                     "<head><title>Sensor {{name}}</title></head>" +
                     "<body>" +
		        "<h1>{{ name }}</h1>"+
		        "id  : {{ id }}<br/>" +
		        "Key : {{ key }}" +
                     "</body>" +
                "</html>";


    var device = await getDevicesById(req.params.id);
    
    if (device == null || (Array.isArray(device) && device.length === 0)) {
        res.status(404).send("El dispositivo NO existe");
        return;
    }
    
    console.log(device);
    res.send(render(template,{id:device[0].device_id, key: device[0].key, name:device[0].name}));
});

export { router as webRoutes };