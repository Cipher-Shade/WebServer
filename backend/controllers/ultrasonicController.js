import UltrasonicSensor from '../models/ultrasonic.js'; 

export const createUltrasonicSensor = async (req, res) => {
  try {
    const ultrasonicSensor = new UltrasonicSensor({
      timestamp: req.body.timestamp,
      distance: req.body.distance
    });

    const newUltrasonicSensor = await ultrasonicSensor.save();
    res.status(201).json(newUltrasonicSensor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getLatestUltrasonicSensorData = async (req, res) => {
    try {
      const latestData = await UltrasonicSensor.findOne().sort({ timestamp: -1 });
      if (latestData) {
        res.json(latestData);
      } else {
        res.status(404).json({ message: 'No data found' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
