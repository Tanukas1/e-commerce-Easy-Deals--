const mongoose = require("mongoose");
const Product = require("../models/adminProductModels"); 
const Category = require('../models/adminCategoryModel')
// Function to get a product by ID
const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Find products by category and populate the category name
    const products = await Product.find({ category: categoryId })
      .populate('category', 'name') // Populate only the 'name' field from the Category collection

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this category' });
    }

    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const adminGetProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Validate the product ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID." });
    }

    // Find the product by ID
    const product = await Product.findById(productId);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Respond with the product data
    res.status(200).json({
      message: "Product fetched successfully.",
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error.message); // Log errors for debugging
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

// Function to update a product by ID
const adminEditProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      title,
      productUrl,
      price,
      status,
      category,
      description,
      discountPrice,
      imageUrl,
    } = req.body;

    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID." });
    }

    // Log uploaded file
    console.log("Uploaded File:", req.file);

    // Add file path to update data if a file is uploaded
    const updateData = {
      ...(title && { title }),
      ...(productUrl && { productUrl }),
      ...(price && { price }),
      ...(category && { category }),
      ...(description && { description }),
      ...(discountPrice && { discountPrice }),
      ...(status && { status: status === "yes" ? "Active" : "Inactive" }),
      ...(req.file && { imageUrl: `public/uploads/${req.file.filename}` }),
    };

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({
      message: "Product updated successfully.",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};


module.exports = { adminGetProduct, adminEditProduct,getProductsByCategory };
