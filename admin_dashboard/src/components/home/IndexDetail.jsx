import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function IndexDetail() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/admin/login", {
        email,
        password,
      });

      if (response.status === 200) {
        toast.success("Login successful!");
        console.log("Response data:", response.data);
    
        setTimeout(() => {
          navigate("/dashboard"); 
        }, 3000);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error logging in: ", err);
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form onSubmit={handleLogin} className="login100-form validate-form">
            <span className="login100-form-title p-b-45">Login</span>

          
            <div
              className="wrap-input100 validate-input"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                className="input100"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="focus-input100" />
              <span className="label-input100">Email</span>
            </div>

          
            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="focus-input100" />
              <span className="label-input100">Password</span>
            </div>

        
            <div className="flex-sb-m w-full p-t-15 p-b-20">
              <div className="form-check">
                <label className="form-check-label">
                  <input className="form-check-input" type="checkbox" /> Remember
                  me
                </label>
              </div>
              <div>
                <a href="#" className="txt1">
                  Forgot Password?
                </a>
              </div>
            </div>

         
            <div className="container-login100-form-btn">
              <button type="submit" className="login100-form-btn">
                Login
              </button>
            </div>

            <div className="text-center p-t-45 p-b-20">
              <span className="txt2">or sign up using</span>
            </div>
            <div className="login100-form-social flex-c-m">
              <a
                href="#"
                className="login100-form-social-item flex-c-m bg1 m-r-5"
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                href="#"
                className="login100-form-social-item flex-c-m bg2 m-r-5"
              >
                <i className="fab fa-twitter" />
              </a>
            </div>
          </form>
          <div
            className="login100-more"
            style={{
              backgroundImage: 'url("../../assets/images/pages/bg-01.png")',
            }}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default IndexDetail;
