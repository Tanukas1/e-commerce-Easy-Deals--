import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Edit() {
  const { productId } = useParams();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    productUrl: "",
    category: "",
    discountPrice: "",
    description: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null); // For storing the selected image
  const navigate = useNavigate();

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
      });
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        console.error("No product ID found");
        return;
      }
      try {
        const { data } = await axios.get(
          `http://localhost:5000/admin/product/${productId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (data.data) {
          setProduct(data.data);
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        setError("Error fetching product data.");
      }
    };

    fetchProduct();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("price", product.price);
    formData.append("productUrl", product.productUrl);
    formData.append("category", product.category);
    formData.append("discountPrice", product.discountPrice);
    formData.append("description", product.description);
    if (image) formData.append("image", image);

    try {
      await axios.put(
        `http://localhost:5000/admin/edit-product/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      alert("Product updated successfully");
      navigate("/all_products");
    } catch (err) {
      setLoading(false);
      setError("Failed to update product");
    }
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="block-header">
          <h4 className="page-title">Edit Product</h4>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="header">
                <h2>
                  <strong>Edit</strong> Product
                </h2>
              </div>
              <div className="body">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="row clearfix">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Product Title</label>
                        <div className="form-line">
                          <input
                            type="text"
                            name="title"
                            className="form-control"
                            value={product.title}
                            onChange={handleInputChange}
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
                            name="price"
                            className="form-control"
                            value={product.price}
                            onChange={handleInputChange}
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
                            name="productUrl"
                            className="form-control"
                            value={product.productUrl}
                            onChange={handleInputChange}
                            placeholder="Enter product URL"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Category</label>
                        <div className="form-line">
                          <select
                            name="category"
                            className="form-control p-2"
                            value={product.category}
                            onChange={handleInputChange}
                          >
                            {categories.map((category) => (
                              <option key={category._id} value={category._id}>
                                {category.categoryName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row clearfix">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Discount Price</label>
                        <div className="form-line">
                          <input
                            type="text"
                            name="discountPrice"
                            className="form-control"
                            value={product.discountPrice}
                            onChange={handleInputChange}
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
                            name="description"
                            className="form-control no-resize"
                            value={product.description}
                            onChange={handleInputChange}
                            placeholder="Enter description"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row clearfix">
                    <div className="col-sm-12">
                      <label className="control-label col-md-3">
                        Upload Product Image
                      </label>
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
                    
                     {product.imageUrl && (
                        <div className="mt-4">
                          <img
                            src={product.imageUrl}
                            alt="Product"
                            className="max-w-[150px] mt-2"
                          />
                        </div>
                      )}

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
                      onClick={() => navigate("/all_products")}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
                {error && <div className="error-message">{error}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Edit;
