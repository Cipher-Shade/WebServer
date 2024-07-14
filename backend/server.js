import app from './app.js'; 
import connectDatabase from './config/database.js'; 
import dotenv from 'dotenv';

dotenv.config({ path: './config/config.env' });

connectDatabase();

const PORT = process.env.PORT || 4002; 
const NODE_ENV = process.env.NODE_ENV || 'development'; 

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT} in ${NODE_ENV} mode`);
});
