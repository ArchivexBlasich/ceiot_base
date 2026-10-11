import { insertDevice, getDevices, getDevicesById } from "../../db_postgre/index.js";
import { Router } from 'express';
const router = Router();

router.post('/', async (req, res) => {
    console.log("device id    : " + req.body.id + " name        : " + req.body.n + " key         : " + req.body.k );

    const device = await getDevicesById(req.body.id);
    
    if (device != null && device.length > 0) {
        res.status(400).send("El dispositivo ya existe");
        return;
    }

    await insertDevice(req.body.id, req.body.n, req.body.k);
    res.send("received new device");
});

router.get('/', async (req,res) => {
    res.send(await getDevices());
});

export { router as deviceRoutes };