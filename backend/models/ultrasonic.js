import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the ultrasonic sensor data schema
const ultrasonicSensorSchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  distance: {
    type: Number,
    required: true
  }
});

// Create the ultrasonic sensor data model
const UltrasonicSensor = mongoose.model('ultrasonicSensor', ultrasonicSensorSchema);

export default UltrasonicSensor;