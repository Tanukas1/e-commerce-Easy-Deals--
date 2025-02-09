const mongoose = require("mongoose");
const Product = require("../models/adminProductModels");

const adminDeleteProduct = async (req, res) => {
  try {
    let { productId } = req.params;

    // Trim and clean any unwanted characters like newlines or spaces
    productId = productId.trim();

    // Validate the product ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      console.log("Invalid product ID:", productId); // Debugging log
      return res.status(400).json({ message: "Invalid product ID format." });
    }

    // Attempt to delete the product
    const deletedProduct = await Product.findByIdAndDelete(productId);

    // If no product is deleted, that means the product was not found
    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    // Return success response
    res.status(200).json({
      message: "Product deleted successfully.",
      data: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

module.exports = { adminDeleteProduct };
