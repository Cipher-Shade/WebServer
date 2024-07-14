import express from 'express';
const router = express.Router();
import { createFlexSensor } from '../controllers/flexController.js';

router.post('/flex', createFlexSensor);

export default router;