import React, { useEffect, useState } from "react";
import Card from "../CardDetails/Card";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "../../utils/Button";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/CartSlice";

function CategoryDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    axios
      .get(`http://localhost:5000/user/product/category/${id}`)
      .then((res) => {
        console.log("Fetched products:", res.data.products);
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  const truncateDescription = (description, maxLength = 100) => {
    return description && description.length > maxLength
      ? `${description.substring(0, maxLength)}...`
      : description || "No description available.";
  };

  const handleAddToCart = (product) => {
    dispatch(
      addItemToCart({
        id: product._id,
        name: product.title,
        price: product.discountPrice || product.price,
        image: product.imageUrl,
      })
    );
  };

  return (
    <div className="container mx-auto py-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-12">
        <div className="col-span-12 p-3">
          {loading ? (
            <p>Loading products...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {products.map((product) => {
                const imageUrl = product.imageUrl
                  ? `http://localhost:5000/${product.imageUrl}`
                  : "../../assets/images/user/user1.jpg"; 
                return (
                  <div key={product._id}>
                    <Card
                      url={`/product/${product._id}`}
                      imageUrl={imageUrl}
                      title={product.title}
                      price={product.price}
                      discountPrice={product.discountPrice} // Add separate discount price
                      description={truncateDescription(product.description)} // Update to use description instead of subtitle
                      button={
                        <Button
                          title="Add to cart"
                          onClick={() => handleAddToCart(product)}
                        />
                      }
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryDetail;

 