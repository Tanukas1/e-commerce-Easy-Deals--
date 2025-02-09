const express = require("express");
const { getAllProducts } = require("../controllers/adminproductGetController");

const router = express.Router();

// Define the route to fetch products
router.get("/product", getAllProducts);

module.exports = router;
