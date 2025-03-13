const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
require('dotenv').config();

const connectDB = require('./config/db');
const disasterRoutes = require('./routes/disasterRoutes');
const { initializeSocket } = require('./socket');

// Connect to MongoDB
connectDB();

const app = express();
const server = http.createServer(app);

initializeSocket(server); // Initialize Socket.io

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/disasters', disasterRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
