const express = require('express');
const router = express.Router();
const sellController = require('../controllers/sell');

router.post('/history', sellController.history);

module.exports = router;