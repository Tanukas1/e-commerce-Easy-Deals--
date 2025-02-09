const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Product = require('../models/adminProductModels');

// Controller to create a new order (User-specific)
const createOrder = async (req, res) => {
  try {
    const { userId, products, totalAmount, shippingAddress } = req.body;

    // Validate incoming data
    if (!userId || !products || !totalAmount || !shippingAddress) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate products
    const productDetails = await Product.find({
      _id: { $in: products.map((product) => product.productId) },
    });

    if (productDetails.length !== products.length) {
      return res.status(400).json({ message: "Invalid product IDs provided" });
    }

    // Prepare product data with names
    const formattedProducts = products.map((product) => {
      const matchingProduct = productDetails.find(
        (prod) => prod._id.toString() === product.productId
      );
      return {
        productId: matchingProduct._id,
        title: matchingProduct.title, // Include product name
        quantity: product.quantity,
        price: matchingProduct.price,
      };
    });

    // Create a new order
    const newOrder = new Order({
      userId,
      userName: user.name, // Include user's name
      products: formattedProducts,
      totalAmount,
      shippingAddress,
      status: 'Pending', // Initial status
    });

    // Save the order in the database
    await newOrder.save();

    // Respond with success message and created order
    return res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// Controller to fetch orders (Admin-specific)
const getAllOrders = async (req, res) => {
  try {
    console.log(`[${new Date().toISOString()}] Route "/admin/orders" was accessed.`);
    const orders = await Order.find();

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json({
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

module.exports = { createOrder, getAllOrders };
