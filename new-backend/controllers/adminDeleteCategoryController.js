  const mongoose = require("mongoose");
  const Category = require("../models/adminCategoryModel");


  const adminDeleteCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;

      // Validate the category ID
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID." });
      }

      // Log the category ID for debugging
      console.log("Requested categoryId for deletion:", categoryId);

      // Attempt to delete the category
      const deletedCategory = await Category.findByIdAndDelete(categoryId);

      // If category not found
      if (!deletedCategory) {
        return res.status(404).json({
          message: "Category not found.",
        });
      }

      // Success response
      res.status(200).json({
        message: "Category deleted successfully.",
        data: deletedCategory,
      });
    } catch (error) {
      console.error("Error deleting category:", error.message); 
      res.status(500).json({
        message: "Internal server error.",
        error: error.message,
      });
    }
  };

  module.exports = { adminDeleteCategory };
