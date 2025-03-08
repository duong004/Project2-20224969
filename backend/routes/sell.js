const express = require('express');
const router = express.Router();
const sellController = require('../controllers/sell');

router.post('/history', sellController.history);
router.post('/get_customer', sellController.get_customer);
router.post('/create_customer', sellController.create_customer);

module.exports = router;