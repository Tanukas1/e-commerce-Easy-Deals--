import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Add() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    productUrl: "",
    category: "",
    discountPrice: "",
    description: "",
    image: null, 
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch categories when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/category", {
        headers: {
          Authorization: "Bearer YOUR_ACCESS_TOKEN", // Add authorization if needed
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong!");
        console.error("Error fetching categories:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) formPayload.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/admin/product",
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Product added:", response.data);
      alert("Product added successfully!");

      // Redirect to "All Products" page
      navigate("/all_products");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product.");
    }
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="block-header">
          <h4 className="page-title">Add Product</h4>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="header">
                <h2>
                  <strong>Add</strong> Product
                </h2>
              </div>
              <div className="body">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Product Title</label>
                        <div className="form-line">
                          <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter product title"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Product Price</label>
                        <div className="form-line">
                          <input
                            type="text"
                            className="form-control"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Enter product price"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row clearfix">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Product URL</label>
                        <div className="form-line">
                          <input
                            type="url"
                            className="form-control"
                            name="productUrl"
                            value={formData.productUrl}
                            onChange={handleChange}
                            placeholder="Enter product URL"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <label>Select a category</label>
                      <select
                        className="form-control"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        {categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="row clearfix">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Discount Price</label>
                        <div className="form-line">
                          <input
                            type="text"
                            className="form-control"
                            name="discountPrice"
                            value={formData.discountPrice}
                            onChange={handleChange}
                            placeholder="Enter discount price"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Description</label>
                        <div className="form-line">
                          <textarea
                            rows={4}
                            className="form-control no-resize"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter description"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row clearfix">
                    <div className="col-sm-12">
                      <label>Upload Product Image</label>
                      <form
                        action="https://www.radixtouch.com/"
                        id="frmFileUpload"
                        className="dropzone py-3 px-3"
                        method="post"
                        encType="multipart/form-data">
                        <div className="fallback">
                          <input
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                          />
                        </div>
                      </form>
                     
                    </div>
                  </div>

                  <div className="col-lg-12 p-t-20 text-center">
                    <button
                      type="submit"
                      className="btn btn-primary waves-effect m-r-15"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger waves-effect"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Add;
