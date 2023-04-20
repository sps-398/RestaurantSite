const orderController = require('../controllers/order.js');
const express = require('express');
const router = express.Router();

router.get('/orders', orderController.getOrders);

router.post('/add-order', orderController.postAddOrder);

router.post('/delete-order/:orderId', orderController.postDeleteOrder);

module.exports = router;