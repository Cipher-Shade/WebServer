import mongoose from 'mongoose';

const { Schema } = mongoose;

const messageSchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  flexSensor: {
    type: Schema.Types.ObjectId,
    ref: 'FlexSensor',
    required: true
  },
  gyroSensor: {
    type: Schema.Types.ObjectId,
    ref: 'GyroSensor',
    required: true
  }
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
