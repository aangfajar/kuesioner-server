const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');

// Load environment variables
dotenv.config();

// Koneksi ke MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({origin: 'https://kuesioner-client.vercel.app'})); // Biar frontend (React) bisa akses API
app.use(express.json()); // Supaya bisa baca req.body format JSON

// Route Dasar (Cek API nyala atau tidak)
app.get('/', (req, res) => {
  res.send('API Kuesioner Running...');
});

// Import & Gunakan Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/survey', require('./routes/surveyRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server jalan di port ${PORT} bosku!`);
});