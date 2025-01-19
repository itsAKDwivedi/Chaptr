import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';  // Import CORS
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import bookRoutes from './routes/bookRoutes.js';

dotenv.config();

connectDB();

const app = express();

// Enable CORS for all origins (or restrict it to specific origins)
app.use(cors()); // This allows all origins by default

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Rest API
app.get('/', (req, res) => {
  res.send({
    msg: 'Welcome Ayush',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan);
});
