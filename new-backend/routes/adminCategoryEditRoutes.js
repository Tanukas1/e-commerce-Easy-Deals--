const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  adminGetCategory,
  adminEditCategory,
} = require("../controllers/adminEditCategoryController"); 

router.get("/category/:categoryId", adminGetCategory); 
router.put("/edit-category/:categoryId", upload.single("image"), adminEditCategory);


module.exports = router;
