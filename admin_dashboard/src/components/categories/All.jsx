import React, { useState, useEffect } from "react";
import axios from "axios";

function All() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/category");
        // Ensure categories is an array
        setCategories(response.data.categories || []);
        console.log(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="block-header">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <ul className="breadcrumb breadcrumb-style">
                <li className="breadcrumb-item">
                  <h4 className="page-title">All Category</h4>
                </li>
                <li className="breadcrumb-item bcrumb-1">
                  <a href="../../index.html">
                    <i className="fas fa-home" /> Home
                  </a>
                </li>
                <li className="breadcrumb-item bcrumb-2">
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Category
                  </a>
                </li>
                <li className="breadcrumb-item active">All Category</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <div className="header">
                <h2>
                  <strong>All</strong> Category
                </h2>
                <ul className="header-dropdown m-r--5">
                  <a href="add_category" className="btn btn-primary btn-lg">
                    Add Category
                  </a>
                </ul>
              </div>
              <div className="body">
                <div className="table-responsive">
                  <table className="table table-hover js-basic-example contact_list">
                    <thead>
                      <tr>
                        <th className="center">#</th>
                        <th className="center">Category Image</th>
                        <th className="center">Category Name</th>
                        <th className="center">Category Url</th>
                        <th className="center">Is Front</th>
                        <th className="center">Status</th>
                        <th className="center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Mapping through categories array */}
                      {categories.length > 0 ? (
                        categories.map((category, index) => (
                          <tr key={category._id || index} className="odd gradeX">
                            <td className="center">{index + 1}</td>
                            <td className="table-img center">
                              <img
                                src={category.image }
                                style={{ width: "50px", height: "50px" }} 
                              />
                            </td>
                            <td className="center">{category.categoryName}</td>
                            <td className="center">{category.categoryUrl}</td>
                            <td className="center">{category.isFront ? "Yes" : "No"}</td>
                            <td className="center">
                              {/* Conditional rendering for status */}
                              {category.status === "Active" ? (
                                <span className="badge badge-success">Active</span>
                              ) : (
                                <span className="badge badge-danger">Inactive</span>
                              )}
                            </td>
                            <td className="center">
                              <a
                                href={`edit_category/${category._id}`} // Dynamic edit link
                                className="btn btn-tbl-edit"
                              >
                                <i className="material-icons">create</i>
                              </a>
                              <a href={`delete_category/${category._id}`} className="btn btn-tbl-delete">
                                <i className="material-icons">delete_forever</i>
                              </a>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center">No categories available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default All;
