const express = require("express");
const router = express.Router();

const paymentController= require('../Controller/Payments/index')

router.post('/order',[],paymentController.createOrder)
router.post('/verify',[],paymentController.verify)

module.exports = router