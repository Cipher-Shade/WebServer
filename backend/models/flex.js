import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the sensor data schema
const flexSensorSchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  flex1: {
    type: Boolean,
    required: true
  },
  flex2: {
    type: Boolean,
    required: true
  },
  flex3: {
    type: Boolean,
    required: true
  },
  flex4: {
    type: Boolean,
    required: true
  },
  flex5: {
    type: Boolean,
    required: true
  }
});

const FlexSensor = mongoose.model('flexSensor', flexSensorSchema);

export default FlexSensor;