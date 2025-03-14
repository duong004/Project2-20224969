const express = require('express');
const router = express.Router();
const orderHistoryController = require('../controllers/OrderHistory');

// Route để lưu đơn hàng nhập mới
router.post('/orderHistory/save', orderHistoryController.saveOrderHistory);

module.exports = router;