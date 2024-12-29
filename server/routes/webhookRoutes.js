const express = require('express');
const router = express.Router();
const { webhookHandler } = require('../controllers/webhookController');

router.post('/razorpay', webhookHandler);

module.exports = router;
