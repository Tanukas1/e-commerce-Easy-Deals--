const Product = require('../models/adminProductModels');
const Category = require('../models/adminCategoryModel')

const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.find({ category: categoryId }).populate(
      "category",
      "name"
    );

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    // Add the full URL for the image path
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const updatedProducts = products.map((product) => ({
      ...product.toObject(),
      imageUrl: product.imageUrl
        ? `${baseUrl}/${product.imageUrl}`  // Full URL for image
        : null,
    }));

    res.status(200).json({ products: updatedProducts });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const adminProductController = async (req, res) => {
  // Log incoming request data
  console.log("Request Body:", req.body);
  console.log("File Info:", req.file);

  // Destructure the incoming request body
  const { title, price, category, description, discountPrice, productUrl } = req.body;

  // Check if all necessary fields are present
  if (!title || !price || !category || !description || !discountPrice || !productUrl) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Handle image upload (if exists)
  const imageUrl = req.file ? `${req.file.path.replace(/\\/g, '/')}` : null;

  try {
    // Create a new product with the correct sequence
    const newProduct = new Product({
      imageUrl,
      title,
      price: parseFloat(price),
      discountPrice: parseFloat(discountPrice),
      description,
      category,
      productUrl,
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    console.log("Inserted product:", savedProduct);

    // Return the saved product details in the correct sequence
    return res.status(200).json({
      message: "Product added successfully",
      product: {
        imageUrl: savedProduct.imageUrl,
        title: savedProduct.title,
        price: savedProduct.price,
        discountPrice: savedProduct.discountPrice,
        description: savedProduct.description,
        category: savedProduct.category,
        productUrl: savedProduct.productUrl,
        _id: savedProduct._id,
      },
    });

  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({
      message: "Error adding product",
      error: error.message,
    });
  }
};



module.exports = { adminProductController, getProductsByCategory };
