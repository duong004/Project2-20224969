const express=require('express')
const morgan = require('morgan')
const cors = require('cors');
const routes = require('./routes/main')
const path = require('path');
const connectDB = require('./modules/config/db');
const bodyParser = require('body-parser');
const setupSocket = require("./modules/config/socket");
require('dotenv').config();

const app = express();

// Connect to Database
connectDB();

// Main router
routes(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'))
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io =setupSocket(server);
require('./controllers/chat')(io)