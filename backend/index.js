import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';
import marksRoutes from './routes/marks.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

const app = express()
app.use(express.json());

app.use(cors());

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('api/marks', marksRoutes);

// app.get('/test', (req, res) => {
//     res.send("Hello from test API");
// });

app.get('/', (req, res) => {
    res.send("Hello from Node API server");
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});  