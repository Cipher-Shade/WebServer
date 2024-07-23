import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the hand recognition schema
const handRecognitionSchema = new Schema({
  timestamp: {
	type: Date,
	default: Date.now, // Automatically sets to the current time
	required: true
  },
  handDetected: {
	type: Boolean,
	required: true
  }
});

// Create the sensor data model
const HandRecognition = mongoose.model('handRecognition', handRecognitionSchema);

export default HandRecognition;