const mongoose = require("mongoose");
const Product = require('../models/adminProductModels');

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params; 

    
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        message: "Invalid product ID format",
      });
    }

    const product = await Product.findById(productId)
      .populate("category", "categoryName")
      .exec();

    // If no product found
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    console.log("Fetched Product:", product);

    return res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.error("Error fetching product details:", error.message);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { getProductById };
