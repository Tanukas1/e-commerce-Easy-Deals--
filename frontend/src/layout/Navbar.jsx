import React, { useState, useEffect } from "react";
import { Drawer, Typography, IconButton } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { Menu,MenuHandler,MenuList,MenuItem,Button,} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { removeItemFromCart } from "../store/CartSlice";

function Navbar() {
  const [openRight, setOpenRight] = useState(false);
  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch categories
  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/category", {
        headers: {
          Authorization: "Bearer YOUR_ACCESS_TOKEN",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCategories(response.data.categories || []);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong!");
      });
  }, []);

  // Check for logged-in user in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const loggedInUser = JSON.parse(storedUser);
        setUser(loggedInUser);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        setUser(null); // Reset user state if parsing fails
      }
    }
  }, []);

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signup"); // Redirect to signup/login page
  };

  // Cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart({ id }));
  };

  return (
    <>
      <div className="page-wrapper">
        <header className="header">
          <div className="header-middle sticky top-0 shadow-md z-50 bg-[#3B1E54]">
            <div className="container mx-auto flex items-center justify-between py-5">
              {/* Logo */}
              <div className="header-left flex items-center space-x-2 lg:w-auto w-full pl-0">
                <Link to="/" className="logo">
                  <img
                    src="public/assets/logo_transparent.png"
                    alt="Porto Logo"
                    className="w-auto h-[60px]"
                  />
                </Link>
              </div>

              {/* Menu for large screens */}
              <div className="header-center flex items-center space-x-4 lg:flex hidden">
                <ul className="menu flex justify-center space-x-1 text-white">
                  <li>
                    <Button variant="text" color="white">
                      <Link to="/">Home</Link>
                    </Button>
                  </li>
                  <li className="relative group">
                    <Menu>
                      <MenuHandler>
                        <Button variant="text" color="white">
                          Categories
                        </Button>
                      </MenuHandler>
                      <MenuList>
                        {categories.map((category) => (
                          <MenuItem key={category._id}>
                            <Link to={`/category/${category._id}`}>
                              {category.categoryName}
                            </Link>
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  </li>
                  <li>
                    <Button variant="text" color="white">
                      <Link to="/about">About</Link>
                    </Button>
                  </li>
                  <li>
                    <Button variant="text" color="white">
                      <Link to="/contact">Contact Us</Link>
                    </Button>
                  </li>
                </ul>
              </div>

              {/* Hamburger Menu for small screens */}
              <div className="lg:hidden flex items-center">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="text-white text-2xl"
                >
                  <i
                    className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}
                  ></i>
                </button>
                {menuOpen && (
                  <div className="absolute top-0 left-0 w-full h-screen bg-[#3B1E54] text-white p-4 overflow-y-auto">
                    <ul className="space-y-6">
                      <li>
                        <Link to="/" onClick={() => setMenuOpen(false)}>
                          Home
                        </Link>
                      </li>
                      <li>
                        <button
                          className="flex items-center justify-between w-full"
                          onClick={() => setShowCategories(!showCategories)}
                        >
                          Categories
                          <i
                            className={`fa-solid ${
                              showCategories
                                ? "fa-chevron-up"
                                : "fa-chevron-down"
                            }`}
                          ></i>
                        </button>
                        {showCategories && (
                          <ul className="pl-6 space-y-2">
                            {categories.map((category) => (
                              <li key={category._id}>
                                <Link
                                  to={`/category/${category._id}`}
                                  onClick={() => setMenuOpen(false)}
                                >
                                  {category.categoryName}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                      <li>
                        <Link to="/about" onClick={() => setMenuOpen(false)}>
                          About
                        </Link>
                      </li>
                      <li>
                        <Link to="/contact" onClick={() => setMenuOpen(false)}>
                          Contact Us
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Header Right */}
              <div className="header-right flex items-center space-x-4">
                {/* User Authentication */}
                {user ? (
                  <Menu>
                    <MenuHandler>
                      <Button className="text-white" variant="text">
                        <i className="fa-solid fa-user"></i> {user.name}
                      </Button>
                    </MenuHandler>
                    <MenuList>
                      <MenuItem>
                        <Link to="/dashboard">My Profile</Link>
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                ) : (
                  <Link
                    to="/signup"
                    className="header-icon text-2xl text-white"
                    title="Login"
                    aria-label="Login"
                  >
                    <i className="fa-solid fa-user"></i>
                  </Link>
                )}

                {/* Cart Drawer */}
                <div className="relative">
                  <button
                    onClick={openDrawerRight}
                    title="Cart"
                    className="text-2xl text-white"
                    aria-label="Open Drawer"
                  >
                    <div className="relative inline-block">
                      <i className="fa-solid fa-cart-shopping text-2xl"></i>
                      {totalItems > 0 && (
                        <span className="absolute -top-1 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                          {totalItems}
                        </span>
                      )}
                    </div>
                  </button>

                  <Drawer
                    placement="right"
                    open={openRight}
                    onClose={closeDrawerRight}
                    className="p-4"
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <Typography variant="h5" color="blue-gray">
                        Your Cart
                      </Typography>
                      <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={closeDrawerRight}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </IconButton>
                    </div>

                    <Typography color="gray" className="mb-8 font-normal">
                      <div className="rounded-lg p-4 bg-white shadow-md">
                        <h3 className="text-lg font-bold mb-4">Your Cart</h3>
                        <div className="space-y-4">
                          {cartItems.map((item) => (
                            <div
                              key={item.id}
                              className="product flex items-center"
                            >
                              <div className="flex-1">
                                <h4 className="text-sm font-semibold">
                                  <Link
                                    to={`/product/${item.id}`}
                                    className="hover:text-gray-600 transition-colors"
                                  >
                                    {item.name}
                                  </Link>
                                </h4>
                                <span className="text-gray-600">
                                  <span className="cart-product-qty">
                                    {item.quantity}
                                  </span>{" "}
                                  × ${item.price.toFixed(2)}
                                </span>
                              </div>
                              <figure className="flex items-center space-x-2">
                                <Link to={`/product/${item.id}`}>
                                  <img
                                    src={
                                      `http://localhost:5000/${item.image}` ||
                                      "/placeholder.png"
                                    }
                                    alt={item.name}
                                    className="w-16 h-16 rounded-lg object-cover"
                                  />
                                </Link>
                                <button
                                  className="btn-remove text-gray-500 hover:text-red-600 text-xl"
                                  aria-label="Remove product"
                                  onClick={() => handleRemoveItem(item.id)}
                                >
                                  &times;
                                </button>
                              </figure>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between font-semibold text-sm mt-4 border-t pt-4">
                          <span>SUBTOTAL:</span>
                          <span className="text-gray-800">
                            ${subtotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-3 mt-4">
                        <Link
                          to="/view_cart"
                          className="block bg-blue-400 text-white  hover:bg-blue-500 text-center py-2 rounded font-medium transition-colors"
                        >
                          View Cart
                        </Link>
                      </div>
                    </Typography>
                  </Drawer>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default Navbar;
