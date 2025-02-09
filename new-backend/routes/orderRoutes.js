const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders } = require('../controllers/userOrderController');

router.post('/user/order', createOrder);

router.get('/admin/orders', getAllOrders); 

module.exports = router;
