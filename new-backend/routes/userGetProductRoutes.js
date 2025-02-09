const express = require('express');
const {getProductById} = require('../controllers/userGetProductController')

const router =  express.Router();

router.get('/product-details/:productId', getProductById);

module.exports = router;