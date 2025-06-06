const express = require('express');
const cors = require('cors');
const routes = require('./routes/main');
const connectDB = require('./modules/config/db');
const setupSocket = require("./modules/config/socket");
require('dotenv').config();

const app = express();

// Connect to Database
connectDB();

// Main router
routes(app);

// Middlewares
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io =setupSocket(server);
require('./controllers/chat')(io)