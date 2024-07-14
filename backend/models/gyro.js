import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the sensor data schema
const gyroSensorSchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  gyroscope: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    z: {
      type: Number,
      required: true
    }
  },  
  accelerometer: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    z: {
      type: Number,
      required: true
    }
  }
});

// Create the sensor data model
const GyroSensor = mongoose.model('gyroSensor', gyroSensorSchema);

export default GyroSensor;