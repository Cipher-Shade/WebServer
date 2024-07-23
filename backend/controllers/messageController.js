import mongoose from 'mongoose';
import Message from '../models/message.js';
import FlexSensor from '../models/flex.js'; 
import GyroSensor from '../models/gyro.js'; 

export const createMessage = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.body.flexSensor) || !mongoose.Types.ObjectId.isValid(req.body.gyroSensor)) {
    return res.status(400).json({ message: 'Invalid flexSensor or gyroSensor ID' });
  }

  try {
    const flexSensorExists = await FlexSensor.findById(req.body.flexSensor);
    const gyroSensorExists = await GyroSensor.findById(req.body.gyroSensor);

    if (!flexSensorExists || !gyroSensorExists) {
      return res.status(404).json({ message: 'FlexSensor or GyroSensor not found' });
    }

    const message = new Message({
      timestamp: req.body.timestamp, // Assuming you want to allow setting the timestamp through the request
      message: req.body.message,
      flexSensor: req.body.flexSensor,
      gyroSensor: req.body.gyroSensor,
    });

    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};