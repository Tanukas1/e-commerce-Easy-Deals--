const express = require("express");
const { adminCategory, getAllCategory} = require("../controllers/adminCategoryController");
const upload = require("../middleware/upload");

const router = express.Router();

// POST route to add a category
router.post("/category", upload.single("image"), adminCategory);

// GET route to fetch all categories
router.get("/category", getAllCategory);


module.exports = router;
