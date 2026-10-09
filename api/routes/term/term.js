import render from "../../render.js";
import { getDevicesById } from "../../db_postgre/index.js";
import { Router } from 'express';
const router = Router();

router.get('/device/:id', async (req, res) => {
    var red = "\x1b[31m";
    var green = "\x1b[32m";
    var blue = "\x1b[33m";
    var reset = "\x1b[0m";
    var template = "Device name " + red   + "   {{name}}" + reset + "\n" +
		   "       id   " + green + "       {{ id }} " + reset +"\n" +
	           "       key  " + blue  + "  {{ key }}" + reset +"\n";
    var device = await getDevicesById(req.params.id);
    
    if (device == null || (Array.isArray(device) && device.length === 0)) {
        res.status(404).send("El dispositivo NO existe");
        return;
    }
    
    console.log(device);
    res.send(render(template,{id:device[0].device_id, key: device[0].key, name:device[0].name}));
});

export { router as termRoutes };