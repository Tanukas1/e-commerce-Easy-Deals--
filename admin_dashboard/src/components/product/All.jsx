import React, { useState, useEffect } from "react";
import axios from "axios";

function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/product");
        setProducts(response.data.products || []);
        console.log(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts(); 
  }, []);

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="block-header">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <ul className="breadcrumb breadcrumb-style">
                <li className="breadcrumb-item">
                  <h4 className="page-title">All Products</h4>
                </li>
                <li className="breadcrumb-item bcrumb-1">
                  <a href="../../index.html">
                    <i className="fas fa-home" /> Home
                  </a>
                </li>
                <li className="breadcrumb-item bcrumb-2">
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Products
                  </a>
                </li>
                <li className="breadcrumb-item active">All Products</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <div className="header">
                <h2>
                  <strong>All</strong> Products
                </h2>
                <ul className="header-dropdown m-r--5">
                  <a href="add_products" className="btn btn-primary btn-lg">
                    Add Product
                  </a>
                </ul>
              </div>
              <div className="body">
                <div className="table-responsive">
                  <table className="table table-hover js-basic-example contact_list">
                    <thead>
                      <tr>
                        <th className="center">#</th>
                        <th className="center">Product Image</th>
                        <th className="center">Product Name</th>
                       
                        <th className="center">Product Category</th>
                        <th className="center">Price</th>
                        <th className="center">Status</th>
                        <th className="center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, index) => (
                        <tr key={product._id || index} className="odd gradeX">
                          <td className="center">{index + 1}</td>
                          <td className="center">
                            <img
                              src={product.imageUrl ? `http://localhost:5000/${product.imageUrl}` : "../../assets/images/user/user1.jpg"}
                              alt={product.name}
                              style={{ width: "30px", height: "30px" }}
                            />
                            </td>
                          <td className="center">{product.title}</td>
                          <td className="center">{product.category?.categoryName || 'N/A'}</td>
                          <td className="center">${product.price}</td>
                          <td className="center">
                            <div className={`badge ${product.status === "active" ? "col-green" : "col-red"}`}>
                              {product.status}
                            </div>
                          </td>
                          <td className="center">
                          <a href={`/edit_products/${product._id}`} className="btn btn-tbl-edit">
                            <i className="material-icons">create</i>
                            </a>

                            <a href={`delete_products/${product._id}`} className="btn btn-tbl-delete">
                              <i className="material-icons">delete_forever</i>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {products.length === 0 && (
                    <p className="text-center">No products found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AllProducts;
