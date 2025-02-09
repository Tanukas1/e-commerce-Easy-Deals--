const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters'],
    trim: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z\s]+$/.test(v); 
      },
      message: 'Name must contain only letters and spaces',
    },
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v); // Regex for 10-digit phone number
      },
      message: 'Phone number must be 10 digits',
    },
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Basic email regex
      },
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: function () {
      return !this.isGuest; // Password is required only for non-guest users
    },
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false, // Exclude from queries by default
  },
  address: {
    type: String,
    minlength: [5, 'Address must be at least 5 characters long'],
    maxlength: [100, 'Address cannot exceed 100 characters'],
    trim: true,
  },
  pinCode: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[0-9]{6}$/.test(v); // Regex for 6-digit pin code
      },
      message: 'Pin code must be 6 digits',
    },
  },
  city: {
    type: String,
    minlength: [3, 'City must be at least 3 characters long'],
    maxlength: [50, 'City cannot exceed 50 characters'],
    trim: true,
  },
  isGuest: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
