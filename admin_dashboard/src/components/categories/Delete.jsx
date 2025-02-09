import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Delete() {
  const { categoryId } = useParams(); // Extract categoryId from the URL
  const navigate = useNavigate(); // Navigate after delete action
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [success, setSuccess] = useState(null); // Success message state

  // Handle category delete
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.delete(
        `http://localhost:5000/admin/delete-category/${categoryId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess(response.data.message || "Category deleted successfully.");
      navigate("/all_category"); // Redirect to all categories page
    } catch (err) {
      console.error("Error deleting category:", err);
      setError(
        err.response?.data?.message || "Failed to delete category. Please try again."
      );
    } finally {
      setLoading(false);
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
                  <h4 className="page-title">Delete Category</h4>
                </li>
                <li className="breadcrumb-item bcrumb-1">
                  <a href="../../index.html">
                    <i className="fas fa-home" /> Home
                  </a>
                </li>
                <li className="breadcrumb-item bcrumb-2">
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Categories
                  </a>
                </li>
                <li className="breadcrumb-item active">Delete Category</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="card">
              <div className="header">
                <h2>
                  <strong>Delete</strong> Category
                </h2>
              </div>
              <div className="body">
                {/* Show error or success message */}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="alert alert-success" role="alert">
                    {success}
                  </div>
                )}

                <p>Are you sure you want to delete this category?</p>
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-danger waves-effect m-r-15"
                    onClick={handleDelete}
                    disabled={loading}
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary waves-effect"
                    onClick={() => navigate("/all_category")}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Delete;
