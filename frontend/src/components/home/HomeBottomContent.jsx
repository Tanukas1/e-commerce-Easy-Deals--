import React from "react";
import { Rating } from "@material-tailwind/react";

const ProductCard = ({ image, title, price, rating }) => (
  <div className="flex items-start p-4 space-x-4 bg-white rounded-lg">
    <figure>
      <a href="">
        <img src={image} className="w-20 h-20 object-cover" alt={title} />
      </a>
    </figure>
    <div className="flex flex-col justify-between">
      <h3 className="text-lg font-semibold text-gray-800">
        <a href="">{title}</a>
      </h3>
      <div className="flex items-center mt-2">
        <Rating value={rating} readOnly />
        <span className="ml-2 text-sm text-gray-500">{rating}.00</span>
      </div>
      <div className="mt-2">
        <span className="text-xl font-bold text-green-600">${price}</span>
      </div>
    </div>
  </div>
);

function HomeBottomContent() {
  return (
    <div>
      <section className="container mx-auto py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <h4 className="mb-4 text-xl font-semibold col-span-3">
            Featured Products
          </h4>

          <ProductCard
            image="https://portotheme.com/html/porto_ecommerce/assets/images/products/small/product-1.jpg"
            title="Ultimate 3D Bluetooth Speaker"
            price="49.00"
            rating={5}
          />
          <ProductCard
            image="https://portotheme.com/html/porto_ecommerce/assets/images/products/small/product-1.jpg"
            title="Ultimate 3D Bluetooth Speaker"
            price="49.00"
            rating={5}
          />
          <ProductCard
            image="https://portotheme.com/html/porto_ecommerce/assets/images/products/small/product-1.jpg"
            title="Ultimate 3D Bluetooth Speaker"
            price="49.00"
            rating={5}
          />
          <ProductCard
            image="https://portotheme.com/html/porto_ecommerce/assets/images/products/small/product-1.jpg"
            title="Ultimate 3D Bluetooth Speaker"
            price="49.00"
            rating={5}
          />
          <ProductCard
            image="https://portotheme.com/html/porto_ecommerce/assets/images/products/small/product-1.jpg"
            title="Ultimate 3D Bluetooth Speaker"
            price="49.00"
            rating={5}
          />
          <ProductCard
            image="https://portotheme.com/html/porto_ecommerce/assets/images/products/small/product-1.jpg"
            title="Ultimate 3D Bluetooth Speaker"
            price="49.00"
            rating={5}
          />

          <ProductCard
            image="https://portotheme.com/html/porto_ecommerce/assets/images/products/small/product-1.jpg"
            title="Ultimate 3D Bluetooth Speaker"
            price="49.00"
            rating={5}
          />
          <ProductCard
            image="https://portotheme.com/html/porto_ecommerce/assets/images/products/small/product-1.jpg"
            title="Ultimate 3D Bluetooth Speaker"
            price="49.00"
            rating={5}
          />
          <ProductCard
            image="https://portotheme.com/html/porto_ecommerce/assets/images/products/small/product-1.jpg"
            title="Ultimate 3D Bluetooth Speaker"
            price="49.00"
            rating={5}
          />
        </div>
      </section>
    </div>
  );
}

export default HomeBottomContent;
