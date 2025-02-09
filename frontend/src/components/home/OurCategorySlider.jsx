import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Button from "../../utils/Button";
import { Rating } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/CartSlice";

const OurCategorySlider = ({ categoryId }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Fetch categories data from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/product/category/${categoryId}`
        );
        setCategories(response.data.products || []); // Ensure fallback if products key is missing
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategories();
    }
  }, [categoryId]); // Re-fetch when categoryId changes

  // Add to Cart handler
  const handleAddToCart = (category) => {
    dispatch(
      addItemToCart({
        id: category._id,
        name: category.title,
        price: category.discountPrice || category.price,
        image: category.imageUrl,
      })
    );
  };

  // Loading state
  if (loading) return <div>Loading...</div>;

  // No categories found
  if (!categories.length) return <div>No categories found.</div>;

  return (
    <section className="bg-[#FBFBFB]">
      {/* Section Header */}
      <div className="flex items-center">
        <hr className="flex-grow border-t border-gray-300" />
        <h1 className="px-4 text-center text-2xl font-semibold text-[#3B1E54]">
          Men's Clothing
        </h1>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      <main className="p-6">
        <Swiper
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          breakpoints={{
            600: {
              slidesPerView: 5,
            },
          }}
          modules={[Navigation, Pagination]}
          className="mySwiper"
        >
          {categories.map((category) => (
            <SwiperSlide key={category._id}>
              <div className="bg-white mb-10 rounded-lg overflow-hidden flex flex-col items-center justify-between h-full group hover:shadow-lg transition-shadow duration-300">
                {/* Category Image */}
                <figure className="relative w-full z-10">
                  <Link to={`/product/${category._id}`} aria-label={`View ${category.title}`}>
                    <img
                      src={`http://localhost:5000/${
                        category.imageUrl || "assets/placeholder.jpg"
                      }`}
                      alt={category.categoryName || "Category image"}
                      className="w-full h-64 object-cover"
                    />
                  </Link>
                </figure>

                {/* Category Details */}
                <div className="p-4 text-center">
                  <div className="mb-2">
                    <Link
                      to={`/category/${category.categoryId || "unknown"}`}
                      className="text-gray-500 text-sm"
                    >
                      {category.categoryName || "Category"}
                    </Link>
                  </div>

                  <h3 className="text-md font-semibold mb-2">
                    <Link
                      to={`/product/${category._id}`}
                      className="text-gray-800 hover:text-blue-500"
                    >
                      {category.title}
                    </Link>
                  </h3>

                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {category.discountPrice && (
                      <del className="text-gray-500">
                        ${category.price.toFixed(2)}
                      </del>
                    )}
                    <span className="text-xl font-bold text-gray-800">
                      ${category.discountPrice
                        ? category.discountPrice.toFixed(2)
                        : category.price.toFixed(2)}
                    </span>
                  </div>

                  <Rating value={4} readonly />

                  <div className="flex justify-center space-x-2">
                    {/* Wishlist Icon */}
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a
                        href="#"
                        className="text-gray-500 text-xl hover:text-blue-500 mt-2"
                        aria-label="Add to Wishlist"
                      >
                        <i className="fa-regular fa-heart"></i>
                      </a>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      title="Select Option"
                      onClick={() => handleAddToCart(category)}
                    />

                    {/* External Link Icon */}
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link
                        to={`/product/${category._id}`}
                        className="text-gray-500 hover:text-blue-500 mt-2"
                        aria-label="View Product"
                      >
                        <i className="fas fa-external-link-alt"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </main>
    </section>
  );
};

export default OurCategorySlider;
