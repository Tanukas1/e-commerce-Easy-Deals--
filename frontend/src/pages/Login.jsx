import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import Banner from "../utils/Banner";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from "react-router-dom";
import { Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react';

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check for existing user data in localStorage on page load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        const loggedInUser = JSON.parse(storedUser);
        setUser(loggedInUser);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        setUser(null); // Reset user state if parsing fails
      }
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/signin",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 && response.data.success) {
        toast.success("Login successful!");

        if (response.data.user && response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.user)); // Save user data
          localStorage.setItem("token", response.data.token); // Save JWT token
          setUser(response.data.user); // Set user state
          navigate("/dashboard"); // Redirect to dashboard after login
        }
      } else {
        toast.error(response.data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting form. Please try again.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/signin"); 
  };

  return (
    <>
      <Layout>
        <Banner />
        <div className="container mx-auto py-6">
          <div className="grid grid-cols-1 bg-white rounded-lg shadow-lg shadow-indigo-500/40 p-8 w-full mx-auto max-w-lg">
            <Card color="transparent" shadow={false}>
              <Typography variant="h4" color="blue-gray">
                Sign In
              </Typography>
              <Typography color="gray" className="mt-1 font-normal mb-6">
                Enter your details to sign in.
              </Typography>

              <form className="mt-1 w-full max-w-screen-lg" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <Typography variant="h6" color="blue-gray">Your Email</Typography>
                    <Input
                      size="lg"
                      placeholder="name@mail.com"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Typography variant="h6" color="blue-gray">Password</Typography>
                    <Input
                      type="password"
                      size="lg"
                      placeholder="********"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <Checkbox label="Remember me" />
                  <a href="/forgot_password" className="font-medium text-gray-900">Forgot Your Password?</a>
                </div>

                <Button type="submit" className="mt-6 bg-[#7E60BF] hover:bg-black text-white" fullWidth>
                  Sign In
                </Button>

                <Typography color="gray" className="mt-4 text-center font-normal">
                  Don’t have an account?{" "}
                  <a href="/signup" className="font-medium text-gray-900">Sign Up</a>
                </Typography>
              </form>
              <ToastContainer />
            </Card>
          </div>
        </div>
        {user ? (
          <Menu>
            <MenuHandler>
              <Button className="text-white" variant="text">
                <i className="fa-solid fa-user"></i> {user.name}
              </Button>
            </MenuHandler>
            <MenuList>
              <MenuItem><Link to="/dashboard">My Profile</Link></MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Link to="/signin" className="header-icon text-2xl text-white" title="Login" aria-label="Login">
            <i className="fa-solid fa-user"></i>
          </Link>
        )}
      </Layout>
    </>
  );
}

export default Login;
