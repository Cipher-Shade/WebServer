import express from "express";
const router = express.Router();
import { createFlexSensor, getLatestFlexSensorData } from "../controllers/flexController.js";

router.post("/flex", createFlexSensor);
router.get('/flexsensor/latest', getLatestFlexSensorData);

export default router;
