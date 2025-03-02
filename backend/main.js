const express = require('express');
const cors = require('cors');
const connectDB = require('./modules/config/db');
require('dotenv').config();

const app = express();

// Connect to Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});