import { insertMeasurement, getMeasurements } from '../../db_mongo/index.js';
import { Router } from 'express';
const router = Router();

router.post('/', async function (req, res) {
       console.log("device id    : " + req.body.id + " key         : " + req.body.key + " temperature : " + req.body.t + " humidity    : " + req.body.h);	
    const {insertedId} = await insertMeasurement({id:req.body.id, t:req.body.t, h:req.body.h});
	res.send("received measurement into " +  insertedId);
});

router.get('/', async (req,res) => {
    res.send(await getMeasurements());
});

export { router as measurementRoutes };