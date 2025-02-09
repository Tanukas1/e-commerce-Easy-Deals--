const express = require("express");
const router = express.Router();
const { adminDeleteCategory } = require("../controllers/adminDeleteCategoryController");

// Delete category route
router.delete("/delete-category/:categoryId", adminDeleteCategory);

module.exports = router;
