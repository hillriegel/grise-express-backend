import dotenv from 'dotenv';
dotenv.config(); // This should be called as early as possible

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/users.js'; // Static import, ensure path is correct


const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000'  // Allows access from your frontend URL
}));


// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
