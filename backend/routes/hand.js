import express from 'express';
import { createHandData, getLatestHandData } from '../controllers/handController.js';

const router = express.Router();

router.post('/hand', createHandData);
router.get('/hand/latest', getLatestHandData);

export default router;
