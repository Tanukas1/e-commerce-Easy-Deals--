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

const HomeProductSlider = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/product/category/${categoryId}`
        );
        setProducts(response.data.products || []); // Ensure fallback if products key is missing
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [categoryId]);

  
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

  if (loading) return <div>Loading...</div>;

  
  if (!products.length) return <div>No products found for this category.</div>;

  return (
    <section className="bg-[#FBFBFB]">
      <div className="flex items-center mb-8">
        <hr className="flex-grow border-t border-gray-300" />
        <h1 className="px-4 text-center text-2xl font-semibold text-[#3B1E54]">
          Women's Clothing
        </h1>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      <div className="container mx-auto py-10">
        <Swiper
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          breakpoints={{
            600: {
              slidesPerView: 4,
            },
          }}
          modules={[Navigation, Pagination]}
          className="mySwiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <div className="bg-white mb-10 rounded-lg overflow-hidden flex flex-col items-center justify-between h-full group hover:shadow-lg transition-shadow duration-300">
                <figure className="relative w-full">
                  <Link
                    to={`/product/${product._id}`} // Navigate to product detail page
                    aria-label={`View ${product.title}`}
                  >
                    <img
                      src={`http://localhost:5000/${
                        product.imageUrl
                          ? product.imageUrl
                          : "assets/placeholder.jpg"
                      }`}
                      alt={product.title || "Product image"}
                      className="w-full h-64 object-contain p-4"
                    />
                  </Link>
                  <div className="absolute top-2 left-2 space-y-1">
                    {product.discountPrice && (
                      <span className="bg-yellow-600 text-white text-xs font-bold py-1 px-2 rounded">
                        -
                        {Math.round(
                          ((product.price - product.discountPrice) /
                            product.price) *
                            100
                        )}
                        %
                      </span>
                    )}
                  </div>
                </figure>
                <div className="p-4 text-center">
                  <h3 className="text-md font-semibold mb-2">
                    <Link
                      to={`/product/${product._id}`} // Navigate to product detail page
                      className="text-gray-800 hover:text-blue-500"
                    >
                      {product.title}
                    </Link>
                  </h3>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {product.discountPrice && (
                      <del className="text-gray-500">
                        ${product.price.toFixed(2)}
                      </del>
                    )}
                    <span className="text-xl font-bold text-gray-800">
                      $
                      {product.discountPrice
                        ? product.discountPrice.toFixed(2)
                        : product.price.toFixed(2)}
                    </span>
                  </div>
                  <Rating value={4} readonly />
                  <div className="flex justify-center items-center space-x-4 mt-4">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a
                        href="#"
                        className="text-gray-500 text-xl hover:text-blue-500"
                        aria-label="Add to Wishlist"
                      >
                        <i className="fa-regular fa-heart"></i>
                      </a>
                    </div>
                    <Button
                      title="Select Option"
                      onClick={() => handleAddToCart(product)}
                    />
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link
                        to={`/product/${product._id}`} // Navigate to product detail page
                        className="text-gray-500 text-xl hover:text-blue-500"
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
      </div>
    </section>
  );
};

export default HomeProductSlider;
