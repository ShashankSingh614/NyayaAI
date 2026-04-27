import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:8080',  // Local development
    'http://localhost:8081',  // Current frontend port
    'http://localhost:8082',
    'http://localhost:8083',  // Future ports
    'https://nyayaai-1.onrender.com',  // Your new hosted frontend domain
    'https://nyayaai-o5mh.onrender.com',  // Old hosted domain (keep for compatibility)
    'https://your-frontend-domain.com'  // Replace with your actual frontend domain
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Nyaya.ai API is running');
});

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
