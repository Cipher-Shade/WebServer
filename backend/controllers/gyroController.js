import GyroSensor from '../models/gyro.js'; 

export const createGyroSensor = async (req, res) => {
  try {
    const gyroSensor = new GyroSensor({
      timestamp: req.body.timestamp,
      gyroscope: req.body.gyroscope,
      accelerometer: req.body.accelerometer
    });

    const newGyroSensor = await gyroSensor.save();
    res.status(201).json(newGyroSensor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getLatestGyroSensorData = async (req, res) => {
  try {
    const latestData = await GyroSensor.findOne().sort({ timestamp: -1 });
    if (latestData) {
      res.json(latestData);
    } else {
      res.status(404).json({ message: 'No data found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
