import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectDB() {
  const mongoURI = process.env.MONGO_URI;
    try {
        await mongoose.connect(mongoURI, {
         
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }   
}
