import express from 'express';
const router = express.Router();
import { createGyroSensor, getLatestGyroSensorData } from '../controllers/gyroController.js';

router.post('/gyrosensor', createGyroSensor);
router.get('/gyrosensor/latest', getLatestGyroSensorData);

export default router;