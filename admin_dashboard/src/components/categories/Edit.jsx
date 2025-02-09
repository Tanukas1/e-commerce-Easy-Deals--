import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Edit() {
  const { categoryId } = useParams(); // Get categoryId from URL params
  const [category, setCategory] = useState({
    categoryName: "",
    categoryUrl: "",
    isFront: "yes",
    status: "yes",
    image: null,
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the category data using categoryId
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/admin/category/${categoryId}`,
          { headers: { "Content-Type": "application/json" } }
        );
        if (data.data) {
          setCategory({
            ...data.data,
            isFront: data.data.isFront ? "yes" : "no",
            status: data.data.status === "Active" ? "yes" : "no",
          });
        } else {
          setError("Category not found.");
        }
      } catch (err) {
        setError("Error fetching category data.");
      }
    };

    fetchCategory();
  }, [categoryId]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCategory({ ...category, image: file });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("categoryName", category.categoryName);
      formData.append("categoryUrl", category.categoryUrl);
      formData.append("isFront", category.isFront === "yes");
      formData.append("status", category.status === "yes" ? "Active" : "Inactive");
      if (category.image) {
        formData.append("image", category.image);
      }

      await axios.put(
        `http://localhost:5000/admin/edit-category/${categoryId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLoading(false);
      alert("Category updated successfully");
      navigate("/all_category");
    } catch (err) {
      setLoading(false);
      setError("Failed to update category");
    }
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="block-header">
          <h4 className="page-title">Edit Category</h4>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="header">
                <h2>
                  <strong>Edit</strong> Category
                </h2>
              </div>
              <div className="body">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Category Name</label>
                        <input
                          type="text"
                          name="categoryName"
                          className="form-control"
                          value={category.categoryName}
                          onChange={handleInputChange}
                          placeholder="Enter category name"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Category URL</label>
                        <input
                          type="text"
                          name="categoryUrl"
                          className="form-control"
                          value={category.categoryUrl}
                          onChange={handleInputChange}
                          placeholder="Enter category URL"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row clearfix">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Is Front</label>
                        <select
                          name="isFront"
                          className="form-control"
                          value={category.isFront}
                          onChange={handleInputChange}
                        >
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Status</label>
                        <select
                          name="status"
                          className="form-control"
                          value={category.status}
                          onChange={handleInputChange}
                        >
                          <option value="yes">Active</option>
                          <option value="no">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <label className="control-label">Category Image</label>
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
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Submit"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger waves-effect"
                      onClick={() => window.history.back()}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Edit;
