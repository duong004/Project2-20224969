const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

router.post('/create', productsController.create);
router.post('/show', productsController.show);
router.post('/edit', productsController.edit);
router.post('/deletes', productsController.deletes);

module.exports = router;