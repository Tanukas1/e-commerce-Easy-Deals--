const express = require("express");
const { getProductsByCategory } = require("../controllers/userproductbycategory");
const router = express.Router();

// Route to fetch products by Category ID
router.get("/product/category/:categoryId", getProductsByCategory);

module.exports = router;
