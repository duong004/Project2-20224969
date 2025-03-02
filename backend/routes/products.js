const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

router.post('/create', productsController.create);
router.post('/show', productsController.show); // Đổi thành POST để nhất quán với project gốc

module.exports = router;