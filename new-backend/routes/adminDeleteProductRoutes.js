const express = require("express");
const router = express.Router();
const { adminDeleteProduct } = require("../controllers/adminDeleteProductController");

router.delete("/delete-product/:productId", adminDeleteProduct);

module.exports = router;
