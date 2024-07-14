import express from 'express';
const router = express.Router();
import { createUltrasonicSensor, getLatestUltrasonicSensorData } from '../controllers/ultrasonicController.js';

router.post('/ultrasonic', createUltrasonicSensor);
router.get('/ultrasonicsensor/latest', getLatestUltrasonicSensorData);

export default router;