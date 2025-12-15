import express from 'express';
import dotenv from 'dotenv';
import router from './routes/UserRouter.js';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/Cod_Tourment', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}
).catch(err => {
    console.error('Error connecting to MongoDB', err);
}
);



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());



app.get('/api', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
