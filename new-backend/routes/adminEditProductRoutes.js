const express = require("express");
const router = express.Router();
const multer = require("../middleware/upload"); 
const {
  adminGetProduct,
  adminEditProduct,
  getProductsByCategory,
} = require("../controllers/adminEditProductsController");

// Routes
router.get("/categories", getProductsByCategory);
router.get("/product/:productId", adminGetProduct);

// Edit product route with image upload
router.put("/edit-product/:productId", multer.single("image"), adminEditProduct);

module.exports = router;
