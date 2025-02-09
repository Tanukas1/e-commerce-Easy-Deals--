const express = require("express");
const { adminProductController, getProductsByCategory} = require("../controllers/adminProductController");
const upload = require("../middleware/upload");

const router = express.Router();

// Route to fetch categories
router.get("/categories", getProductsByCategory);

// Route to handle product creation
router.post("/product", upload.single("image"), adminProductController);

module.exports = router;
