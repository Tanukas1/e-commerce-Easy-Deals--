import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";

function Thankyou() {
  const navigate = useNavigate();

  // State for order details
  const [orderDetails, setOrderDetails] = useState({
    products: [],
    totalAmount: 0,
  });

  useEffect(() => {
    // Fetch and parse data from localStorage
    const cartData = localStorage.getItem("cart");
    const productName = localStorage.getItem("productName");
    const productPrice = localStorage.getItem("productPrice");
    const cartQuantity = localStorage.getItem("cartQuantity");

    if (cartData) {
      try {
        // Parse the cart array and calculate the total
        const parsedCart = JSON.parse(cartData);
        const totalAmount = parsedCart.reduce(
          (acc, product) => acc + product.price * product.quantity,
          0
        );

        setOrderDetails({
          products: parsedCart,
          totalAmount,
        });
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    } else {
      setOrderDetails({
        products: [
          {
            name: productName,
            price: parseFloat(productPrice),
            quantity: parseInt(cartQuantity, 10),
            image: "/placeholder.png", 
          },
        ],
        totalAmount: parseFloat(productPrice) * parseInt(cartQuantity, 10),
      });
    }

    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Layout>
      <div className="bg-gray-50 min-h-[75vh] flex items-center justify-center px-4">
        <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center items-center mb-6">
            <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Thank You for Your Order!
          </h1>
          <p className="text-gray-500 mt-4">
            We appreciate your business! Your order has been placed successfully.
          </p>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Order Summary
            </h2>
            <div className="bg-gray-50 p-4 rounded-md shadow">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Total Amount:</span>
                <span className="font-semibold">₹{orderDetails.totalAmount}</span>
              </div>

              {orderDetails.products.map((product, index) => (
                <div
                  key={index}
                  className="flex justify-between border-t pt-2 mt-2"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={`http://localhost:5000/${product.image || "/placeholder.png"}`}
                      alt=""
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-sm font-medium text-gray-800">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Qty: {product.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-800">
                    ₹{product.price * product.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 text-gray-400 text-sm">
            <p>
              Need help?{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Contact Us
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Thankyou;
