import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import Button from "../utils/Button";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CheckOut() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing cart data from localStorage:", error);
      }
    }
  }, []);

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    if (!userId) {
      console.error("User ID is missing in local storage.");
      alert("Please log in to proceed to checkout.");
      navigate("/login"); // Redirect to login page if userId is missing
    }
  }, [userId, navigate]);

  // State for order details
  const [orderDetails, setOrderDetails] = useState({
    userId: userId || "", // Dynamically set userId
    products: [],
    totalAmount: 0,
    shippingAddress: "123 Main Street, City, Country",
  });

  useEffect(() => {
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      products: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        image: item.image,
      })),
      totalAmount: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    }));
  }, [cartItems]);

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post('http://localhost:5000/user/order', orderDetails);
      console.log('Order Response:', response.data);
      alert('Order placed successfully!');
      navigate('/thankyou'); // Navigate to thank-you page
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-[75vh] flex items-center justify-center py-12">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-md rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h2>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700">Shipping Information</h3>
                {orderDetails.shippingAddress ? (
                  <p className="text-gray-500 mt-2 font-medium">{orderDetails.shippingAddress}</p>
                ) : (
                  <p className="text-gray-500 mt-2 font-medium">Oops! No address</p>
                )}
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-700">Express Checkout</h3>
                <p className="text-gray-500 mt-2">How do you want to pay?</p>
                <div className="flex items-center mt-4 space-x-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      className="form-radio text-blue-500"
                    />
                    <span className="text-gray-700">Cash on Delivery</span>
                  </label>
                </div>
              </div>
              <a href="#" className="text-blue-500 text-sm mt-6 block hover:underline">Return to Cart</a>
            </div>

            <div className="bg-white shadow-md rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Order Summary</h2>
              {orderDetails.products.map((product) => (
                <div key={product.productId} className="flex items-center space-x-4 mb-6">
                  <img
                    src={`http://localhost:5000/${product.image}`}
                    alt="Product"
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-700">{product.name}</h3>
                    <p className="text-gray-500 text-sm">Qty: {product.quantity}</p>
                  </div>
                  <p className="font-semibold text-gray-800">₹{product.price * product.quantity}</p>
                </div>
              ))}

              <div className="mt-6">
                <div className="flex justify-between text-gray-500 mb-2">
                  <span>Delivery Charges</span>
                  <span className="font-medium">FREE</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pb-4">
                  <span>Payable Amount</span>
                  <span>₹{orderDetails.totalAmount}</span>
                </div>
              </div>
              <Button title="Place Order" onClick={handlePlaceOrder} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CheckOut;
