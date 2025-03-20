const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

router.post('/create', productsController.create);
router.post('/show', productsController.show);
router.post('/edit', productsController.edit);
router.post('/deletes', productsController.deletes);
router.post('/get_supplier', productsController.get_supplier);
router.post('/create_supplier', productsController.create_supplier);
router.post('/history', productsController.get_history);

module.exports = router;