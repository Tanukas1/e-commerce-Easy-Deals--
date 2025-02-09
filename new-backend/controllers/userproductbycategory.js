const mongoose = require("mongoose");
const Product = require('../models/adminProductModels');
const Category = require('../models/adminCategoryModel');

// Function to get products by category ID
const getProductsByCategory = async (req, res) => {
  try {
    // Extract categoryId from the request parameters and sanitize it
    let categoryId = req.params.categoryId.trim(); // Trim leading/trailing whitespace

    // Sanitize categoryId by removing newlines and carriage return characters
    categoryId = categoryId.replace(/[\n\r]+/g, ''); // Removes newlines and carriage returns

    console.log("Sanitized category ID:", categoryId);  // Debugging sanitized categoryId

    // Validate the categoryId to check if it's a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({
        message: "Invalid category ID format"
      });
    }

    console.log("Fetching products for category ID:", categoryId);

    // Query to find products by category ID and populate category data
    const products = await Product.find({ category: categoryId })
      .populate('category', 'categoryName') // Populate category name only
      .exec();

    // Check if no products are found for the given category
    if (products.length === 0) {
      return res.status(404).json({
        message: "No products found for this category"
      });
    }

    // Return the products with their category information
    return res.status(200).json({
      message: "Products fetched successfully by category",
      products
    });

  } catch (error) {
    console.error("Error fetching products by category:", error.message);
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = { getProductsByCategory };
