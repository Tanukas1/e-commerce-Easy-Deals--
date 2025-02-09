const Product = require("../models/adminProductModels.js");
const Category = require("../models/adminCategoryModel"); 

const getAllProducts = async (req, res) => {
  try {
    console.log("Attempting to fetch raw products...");
    const rawProducts = await Product.find();
    console.log("Raw Products Fetched:", rawProducts);
  
    // Fetch products and populate category information (adjust field name if needed)
    const products = await Product.find()
      .populate("category", "categoryName") // Populate 'category' field with 'categoryName' from Category model
      .exec(); // Ensure the query executes properly
  
    console.log("Populated Products Fetched:", products);
  
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
  
    return res.status(200).json({
      message: "Products fetched successfully",
      products, 
    });
  } catch (error) {
    console.error("Error during product fetch:", error.message);
    return res.status(500).json({
      message: "Error fetching products",
      error: error.message, // Return error message from the catch block
    });
  }
};

module.exports = { getAllProducts };
