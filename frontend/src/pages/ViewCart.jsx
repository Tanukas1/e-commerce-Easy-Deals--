import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import Banner from "../utils/Banner";
import Button from "../utils/Button";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart } from "../store/CartSlice";
import axios from "axios";

function ViewCart() {
  const [cartItems, setCartItems] = useState([]);
  const [guestForm, setGuestForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    pinCode: "",
    city: "",
  });
  const [guestLoginStatus, setGuestLoginStatus] = useState(null);
  const dispatch = useDispatch();
  const cartFromRedux = useSelector((state) => state.cart.items);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    } else {
      setCartItems(cartFromRedux);
    }
  }, [cartFromRedux]);

  // Update quantity in cart
  const updateQuantity = (id, action) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity:
              action === "increment"
                ? item.quantity + 1
                : Math.max(1, item.quantity - 1),
          }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove item from cart
  const removeItem = (id) => {
    dispatch(removeItemFromCart({ id }));

    // Remove from localStorage
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Handle guest form change
  const handleGuestFormChange = (e) => {
    const { name, value } = e.target;
    setGuestForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit guest login
  const submitGuestLogin = async () => {
    try {
      console.log("Submitting guest form data:", guestForm);
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        guestForm
      );

      // Handle success
      setGuestLoginStatus({
        success: true,
        message: response.data.message || "Login successful!",
      });
      console.log("Guest login response:", response.data);
    } catch (error) {
      // Handle error
      setGuestLoginStatus({
        success: false,
        message:
          error.response?.data?.message || "Login failed. Please try again.",
      });
      console.error("Login error:", error);
    }
  };

  return (
    <Layout>
      <Banner />
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Section */}
          <div className="col-span-1 lg:col-span-8 space-y-6">
            {/* Cart Items Card */}
            <div className="border p-4 lg:p-6 rounded-lg bg-white shadow-lg">
              <div className="overflow-x-auto">
                <div className="grid grid-cols-12 gap-1 divide-y divide-gray-200">
                  <div className="col-span-5 p-4 text-xs lg:text-sm font-semibold text-gray-500 bg-gray-100">
                    Product
                  </div>
                  <div className="col-span-2 p-4 text-xs lg:text-sm font-semibold text-gray-500 bg-gray-100">
                    Price
                  </div>
                  <div className="col-span-3 p-4 text-xs lg:text-sm font-semibold text-gray-500 bg-gray-100">
                    Quantity
                  </div>
                  <div className="col-span-2 p-4 text-xs lg:text-sm font-semibold text-gray-500 bg-gray-100 text-right">
                    Subtotal
                  </div>

                  {/* Render cart items */}
                  {cartItems.map((item) => (
                    <div key={item.id} className="contents">
                      <div className="col-span-5 p-4 flex items-center space-x-4 bg-white">
                        <img
                          src={`http://localhost:5000/${item.image}`}
                          className="w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-md"
                        />

                        <div>
                          <h5 className="text-xs lg:text-sm font-medium text-gray-800">
                            <a href="#" className="hover:text-blue-500">
                              {item.name}
                            </a>
                          </h5>
                          <button
                            className="text-red-600 hover:text-red-800 text-xs mt-1"
                            title="Remove Product"
                            onClick={() => removeItem(item.id)}
                          >
                            <i className="fas fa-times" /> Remove
                          </button>
                        </div>
                      </div>

                      <div className="col-span-2 p-4 text-xs lg:text-sm text-gray-900 bg-white">
                        ${item.price.toFixed(2)}
                      </div>
                      <div className="col-span-3 p-4 bg-white">
                        <div className="flex items-center justify-center space-x-1">
                          <button
                            className="px-2 py-1 lg:px-3 lg:py-2 bg-gray-200 hover:bg-gray-300 rounded-l"
                            onClick={() => updateQuantity(item.id, "decrement")}
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <span className="px-3 lg:px-4 py-1 lg:py-2 text-gray-800 border bg-gray-100">
                            {item.quantity}
                          </span>
                          <button
                            className="px-2 py-1 lg:px-3 lg:py-2 bg-gray-200 hover:bg-gray-300 rounded-r"
                            onClick={() => updateQuantity(item.id, "increment")}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                      <div className="col-span-2 p-4 text-right text-xs lg:text-sm font-semibold text-gray-900 bg-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Note and Checkout Card */}
            <div className="border p-4 lg:p-6 rounded-lg bg-white shadow-lg">
              <h5 className="mb-4 font-bold text-base lg:text-lg">Note</h5>
              <textarea
                className="w-full h-24 lg:h-24 p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Enter your message here..."
              ></textarea>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm lg:text-base">
                  <p>Subtotal</p>
                  <p>${calculateTotal()}</p>
                </div>
                <hr />
                <div className="flex justify-between text-lg lg:text-xl font-bold">
                  <p>Total</p>
                  <p>${calculateTotal()}</p>
                </div>
              </div>

              <div className="mt-6">
                <a href="check_out">
                  <Button title="Proceed to Checkout" />
                </a>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="col-span-1 lg:col-span-4">
            <div className="space-y-6 bg-white p-4 lg:p-6 rounded-lg shadow-md">
              <h3 className="text-xl lg:text-2xl font-bold mb-4">
                Guest Login
              </h3>

              {guestLoginStatus && (
                <p
                  className={`text-sm ${
                    guestLoginStatus.success ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {guestLoginStatus.message}
                </p>
              )}

              <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={guestForm.name}
                    onChange={handleGuestFormChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={guestForm.email}
                    onChange={handleGuestFormChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={guestForm.phone}
                  onChange={handleGuestFormChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={guestForm.address}
                  onChange={handleGuestFormChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                ></textarea>
              </div>

              <div className="flex items-center justify-between space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={guestForm.city}
                    onChange={handleGuestFormChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="pinCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Pin Code
                  </label>
                  <input
                    type="text"
                    id="pinCode"
                    name="pinCode"
                    value={guestForm.pinCode}
                    onChange={handleGuestFormChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <Button title="Login as Guest" onClick={submitGuestLogin} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ViewCart;
