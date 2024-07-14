import mongoose from 'mongoose';

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(con => {
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
  }).catch(err => {
    console.error('Error connecting to database:', err.message);
  });
};

export default connectDatabase;
