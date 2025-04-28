const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.js');

router.post('/total_revenue', homeController.total_revenue);
router.post('/generate_top_product', homeController.generate_top_product);
router.post('/generatedailySale', homeController.generatedailySale);

module.exports = router;