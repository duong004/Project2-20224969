const express = require('express');
const router = express.Router();
const orderHistoryController = require('../controllers/OrderHistory');
const orderDetailHistoryController = require('../controllers/OrderDetailHistory');

// Route để lưu đơn hàng nhập mới
router.post('/orderHistory/save', orderHistoryController.saveOrderHistory);
router.get('/orderDetail/listorder', orderDetailHistoryController.listOrderDetail);
router.post('/orderDetail/updateDetail', orderDetailHistoryController.updateDetail);
router.get('/orderHistory/getOrder', orderHistoryController.getOrder);

module.exports = router;