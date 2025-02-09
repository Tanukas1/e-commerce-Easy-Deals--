import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from './pages/Login';
import ViewCart from './pages/ViewCart';
import CheckOut from './pages/CheckOut';
import { Dashboard } from "./pages/Dashboard";
import Thankyou from "./pages/thankyou";
import Category from "./pages/Category";
import Product from './pages/Product';
import About from "./pages/About";
import Contact from "./pages/Contact";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<Signup/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="view_cart" element={<ViewCart />} />
        <Route path="check_out" element={<CheckOut />} />
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="thankyou" element={<Thankyou/>}/>
        <Route path="/category/:id" element={<Category />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
