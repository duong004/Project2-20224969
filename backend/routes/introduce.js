const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');

router.post('/sign_up', loginController.sign_up);
router.post('/login_raw', loginController.login_raw);

module.exports = router;