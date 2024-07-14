import FlexSensor from "../models/flex.js";

export const createFlexSensor = async (req, res) => {
  try {
    const flexSensor = new FlexSensor({
      timestamp: req.body.timestamp,
      flex1: req.body.flex1,
      flex2: req.body.flex2,
      flex3: req.body.flex3,
      flex4: req.body.flex4,
      flex5: req.body.flex5,
    });

    const newFlexSensor = await flexSensor.save();
    res.status(201).json(newFlexSensor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
