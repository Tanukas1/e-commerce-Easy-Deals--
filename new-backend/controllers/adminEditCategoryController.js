const mongoose = require("mongoose");
const Category = require("../models/adminCategoryModel");

// Function to get a category by ID
const adminGetCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: "Invalid category ID." });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json({ message: "Category fetched successfully.", data: category });
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

// Function to update a category by ID
const adminEditCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { categoryName, categoryUrl, isFront, status } = req.body;

    // Validate category ID
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: "Invalid category ID." });
    }

    // Prepare update data
    const updateData = {
      ...(categoryName && { categoryName }),
      ...(categoryUrl && { categoryUrl }),
      ...(isFront && { isFront: isFront === "yes" }), // Convert string "yes" to boolean
      ...(status && { status: status === "yes" ? "Active" : "Inactive" }), // Map status
    };

    // Include the uploaded image if present
    if (req.file) {
      updateData.image = req.file.path; // Save the image path
    }

    // Update the category
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { $set: updateData },
      { new: true } // Return the updated document
    );

    // Handle case where category is not found
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    // Log the updated category
    console.log("Updated Category:", updatedCategory);

    res.status(200).json({
      message: "Category updated successfully.",
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error.message); // Log errors for debugging
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};


module.exports = { adminGetCategory, adminEditCategory };
