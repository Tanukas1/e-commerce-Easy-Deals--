import React, { useState } from "react";
import Layout from "../layout/Layout";
import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import Banner from "../utils/Banner";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response data:", response.data);

      if (response.data.success) {
        toast.success(response.data.message || "Signup successful!");
        const { user, token } = response.data;

        // Save token to localStorage
        if (token) {
          localStorage.setItem("token", token);
        } else {
          console.error("Token is missing from response.");
          toast.error("Failed to get token.");
        }

        // Save user data and userId separately to localStorage
        if (user) {
          localStorage.setItem("user", JSON.stringify(user)); // Save user data
          if (user.id) {
            localStorage.setItem("userId", user.id); // Save user ID separately
            console.log("User ID saved to localStorage:", user.id);
          } else {
            console.error("User ID is missing in the response.");
            toast.error("Failed to get user ID.");
          }
        } else {
          console.error("User data is missing from response.");
          toast.error("Failed to get user data.");
        }
      } else {
        toast.error(response.data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Error submitting form. Please try again."
      );
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Layout>
        <Banner />
        <div className="container mx-auto py-6">
          <div className="grid grid-cols-1 bg-white rounded-lg shadow-lg shadow-indigo-500/40 p-8 w-full mx-auto max-w-lg">
            <Card color="transparent" shadow={false}>
              <Typography variant="h4" color="blue-gray">Sign Up</Typography>
              <Typography color="gray" className="mt-1 font-normal mb-6">
                Enter your details to sign up.
              </Typography>

              <form className="mt-1 w-full max-w-screen-lg" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <Typography variant="h6" color="blue-gray">Your Name</Typography>
                    <Input
                      type="text"
                      size="lg"
                      placeholder="Enter your name"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Typography variant="h6" color="blue-gray">Your Email</Typography>
                    <Input
                      type="email"
                      size="lg"
                      placeholder="name@mail.com"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
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
                      placeholder="*********"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <Checkbox label={
                  <Typography variant="small" color="gray" className="flex items-center font-normal">
                    I agree to the
                    <a href="#" className="font-medium transition-colors hover:text-gray-900">
                      &nbsp;Terms and Conditions
                    </a>
                  </Typography>
                } />
                <Button type="submit" className="mt-6 bg-[#7E60BF] hover:bg-black text-white" fullWidth>Sign Up</Button>
                <Typography color="gray" className="mt-4 text-center font-normal">
                  Already have an account? <a href="/login" className="font-medium text-gray-900">Sign In</a>
                </Typography>
              </form>
              <ToastContainer />
            </Card>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Signup;
