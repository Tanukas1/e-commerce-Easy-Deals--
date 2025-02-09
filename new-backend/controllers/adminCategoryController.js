const Category = require("../models/adminCategoryModel");

// Controller to add a category
const adminCategory = async (req, res) => {
  const { categoryName, categoryUrl, isFront, status } = req.body;
  const image = req.file ? req.file.path : null;

  console.log("Request Body:", req.body);
  console.log("Uploaded File:", req.file);

  // Validate required fields
  if (!categoryName || !categoryUrl || !isFront) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Validate status field
  const validStatuses = ["Active", "Inactive"];
  const categoryStatus = validStatuses.includes(status) ? status : "Inactive";

  try {
    // Create a new category with the uploaded image
    const category = new Category({
      categoryName,
      categoryUrl,
      isFront,
      status: categoryStatus,
      image,
    });

    // Save the category to MongoDB
    const savedCategory = await category.save();

    return res.status(200).json({
      message: "Category added successfully",
      category: savedCategory,
    });
  } catch (error) {
    console.error("Error adding category:", error);
    return res.status(500).json({
      message: "Error adding category",
      error: error.message,
    });
  }
};

// Controller to fetch all categories
const getAllCategory = async (req, res) => {
  try {
    // Fetch all categories using the Mongoose model
    const categories = await Category.find();

    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    return res.status(200).json({
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({
      message: "Error fetching categories",
      error: error.message,
    });
  }
};


module.exports = { adminCategory, getAllCategory};
