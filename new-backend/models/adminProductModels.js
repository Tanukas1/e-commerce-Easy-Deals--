const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', 
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  productUrl: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Products", productSchema);

module.exports = Product;
