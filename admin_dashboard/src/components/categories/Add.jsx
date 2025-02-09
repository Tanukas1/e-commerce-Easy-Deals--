import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Add() {
  
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryUrl: "",
    isFront: "no",
    status: "yes", 
    image: null
  });
  const navigate = useNavigate(); 

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
    // Append each field from the state to the FormData
    Object.keys(formData).forEach((key) => {
      if (formData[key]) formPayload.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/admin/category", 
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Category added:", response.data);
      alert("Category added successfully!");

      // Redirect to "All Categories" page
      navigate("/all_category");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Error adding category.");
    }
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="block-header">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <ul className="breadcrumb breadcrumb-style">
                <li className="breadcrumb-item">
                  <h4 className="page-title">Category</h4>
                </li>
                <li className="breadcrumb-item bcrumb-1">
                  <a href="../../index.html">
                    <i className="fas fa-home"></i> Home
                  </a>
                </li>
                <li className="breadcrumb-item bcrumb-2">
                  <a href="#" onClick="return false;">
                    Category
                  </a>
                </li>
                <li className="breadcrumb-item active">Add Category</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="card">
              <div className="header">
                <h2>
                  <strong>Add</strong> Category
                </h2>
              </div>
              <div className="body">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <div className="form-line">
                          <input
                            type="text"
                            className="form-control"
                            name="categoryName"
                            placeholder="Category Name"
                            value={formData.categoryName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <div className="form-line">
                          <input
                            type="text"
                            className="form-control"
                            name="categoryUrl"
                            placeholder="Category URL"
                            value={formData.categoryUrl}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row clearfix">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <div className="form-line">
                          <label className="control-label ">IsFront</label>
                          <select
                            className="form-control"
                            name="isFront"
                            value={formData.isFront}
                            onChange={handleChange}
                          >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <div className="form-line">
                          <label className="control-label ">status</label>
                          <select
                            className="form-control"
                            name="isFront"
                            value={formData.status}
                            onChange={handleChange}
                          >
                            <option value="yes">Active</option>
                            <option value="no">Inactive</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-12">
                      <label className="control-label col-md-3">Category Image</label>
                      <form
                        action="https://www.radixtouch.com/"
                        id="frmFileUpload"
                        className="dropzone py-3 px-3"
                        method="post"
                        encType="multipart/form-data"
                      >
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
