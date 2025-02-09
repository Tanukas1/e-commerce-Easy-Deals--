import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import Category from './pages/Category';
import AddCategory from './pages/AddCategory';
import EditCategory from './pages/EditCategory';
import DeleteCategory from './pages/DeleteCategory';
import AllProducts from './pages/AllProducts';
import AddProducts from './pages/AddProducts';
import EditProducts from './pages/EditProducts';
import DeleteProducts from './pages/DeleteProducts';
import Order from './pages/Order';

function App() {
  return (
    <>
   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index/>}/>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path ="all_category" element={<Category/>} />
          <Route path="add_category" element={<AddCategory/>}/>
          <Route path="/edit_category/:categoryId" element={<EditCategory/>}/>
          <Route path="/delete_category/:categoryId" element={<DeleteCategory/>}/>
         
          <Route path="all_products" element={<AllProducts />}/>
          <Route path="add_products" element={<AddProducts />}/> 
          <Route path="/edit_products/:productId" element={<EditProducts />}/> 
          <Route path="delete_products/:productId" element={<DeleteProducts />}/> 
          <Route path="order" element={<Order/>}/> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
