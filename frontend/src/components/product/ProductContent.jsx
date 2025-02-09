import React, { useState } from "react";
import Button from "../../utils/Button";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/CartSlice"; // Import the addItemToCart action
import { Link } from "react-router-dom";

function ProductContent({ product }) {
  if (!product) return <div>Product not found</div>;
  const { imageUrl, title, description, discountPrice, price, category, _id } = product;
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        id: _id,
        name: title,
        price: discountPrice || price,
        quantity,
        image: imageUrl || "/placeholder.png", 
      })
    );
  };

  const imageUrlWithBase = imageUrl
    ? `http://localhost:5000/${imageUrl}`
    : "/placeholder.png";

  return (
    <div className="container mx-auto py-12">
      <ol className="flex space-x-2 text-gray-600">
        <li>
          <i className="fa-solid fa-house-user"></i>
        </li>
        <i className="fa-solid fa-greater-than p-1"></i>
        <li>
          <a href="#" className="hover:text-blue-500">
            PRODUCTS
          </a>
        </li>
      </ol>

      <div className="grid grid-cols-12 gap-8 mt-8">
        <div className="col-span-5">
          <img
            src={imageUrlWithBase} 
            alt={title}
            className="w-full max-h-96 object-contain"
          />
        </div>

        <div className="col-span-7">
          <h1 className="text-3xl font-semibold mb-4">{title}</h1>

          <p className="text-xl font-bold text-gray-800 mb-4">
            {discountPrice && (
              <del className="text-gray-500 mr-2">${price}</del>
            )}
            ${discountPrice || price}
          </p>

          <p className="text-lg text-gray-600 mb-6">
            {description || "No description available"}
          </p>

          <ul className="text-lg text-gray-700 mb-6">
            <li>
              <span className="font-semibold">Category:</span>{" "}
              {category?.categoryName || "Uncategorized"}
            </li>
          </ul>

          <hr className="py-5" />
          <div className="flex gap-5 pb-4">
            <div className="border flex items-center">
              <button
                className="px-4 py-2 text-gray-600 bg-white border-r hover:bg-gray-100"
                type="button"
                onClick={handleDecrement}
              >
                <i className="fas fa-minus"></i>
              </button>
              <span className="px-4 py-2 text-gray-600 bg-white border-r">
                {quantity}
              </span>
              <button
                className="px-4 py-2 text-gray-600 bg-white border-l hover:bg-gray-100"
                type="button"
                onClick={handleIncrement}
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>

            <Button title="Add to cart" onClick={handleAddToCart} />
          </div>
          <Link to="/view_cart">
            <button className="w-full px-6 py-3 bg-[#7E60BF] text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300 ease-in-out">
              View Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductContent;
