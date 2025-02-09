import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../layout/Layout";
import ProductContent from "../components/product/ProductContent";
import { useParams } from "react-router-dom";

function Product() {
  const { id } = useParams(); // Extract id dynamically from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) { // Ensure id is valid before making the request
      setLoading(true);

      axios
        .get(`http://localhost:5000/user/product-details/${id}`) // Use id in the API call
        .then((response) => {
          if (response.data.product) {
            setProduct(response.data.product); // Set the product data
          } else {
            setError("Product not found.");
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching product data:", err);
          setError("Error fetching product data.");
          setLoading(false);
        });
    }
  }, [id]); // Add id to the dependency array

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Layout>
      {product ? (
        <ProductContent product={product} /> 
      ) : (
        <div>Product not found.</div>
      )}
    </Layout>
  );
}

export default Product;
