const express = require('express');
const public = require('../controllers/public');

const router = express.Router();
router.get('/success', public.success);
router.get('/', public.mn);

module.exports = router;