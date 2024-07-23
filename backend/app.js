import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import gyroRouter from './routes/gyro.js'; 
import ultrasonicRouter from './routes/ultrasonic.js';
import flexRouter from './routes/flex.js';
import handRouter from './routes/hand.js';
import messageRouter from './routes/message.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use('/api/v1', gyroRouter);
app.use('/api/v1', ultrasonicRouter);
app.use('/api/v1', flexRouter);
app.use('/api/v1', handRouter);
app.use('/api/v1', messageRouter);

export default app;