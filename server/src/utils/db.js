import mongoose from 'mongoose';

export async function connectDB() {
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/COD_Tournament_DB1';
    try {
        await mongoose.connect(mongoURI, {
         
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }   
}
