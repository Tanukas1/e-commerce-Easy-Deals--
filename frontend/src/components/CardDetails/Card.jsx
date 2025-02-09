import { Button, Rating } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

function Card({ subtitle, title, discount, price, button, url, imageUrl }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center justify-between h-full group hover:transition-shadow duration-300">
      <Link to={url}>
        <figure className="relative w-full">
          <img
            src={imageUrl}
            alt={title} 
            className="w-full h-64 object-cover"
          />
        </figure>
        <div className="p-2 text-center">
          <div className="mb-2">
            <span className="text-gray-500 text-sm">{subtitle}</span>
          </div>
          <h3 className="text-md font-semibold mb-2">
            <span className="text-gray-800 hover:text-blue-500">{title}</span>
          </h3>
          <div className="flex items-center justify-center space-x-2 mb-1">
            <del className="text-gray-500">{discount}</del>
            <span className="text-xl font-bold text-gray-800">{price}</span>
          </div>
          <Rating value={4} readonly className="mb-1" />
        </div>
      </Link>

      <div className="flex justify-center space-x-2 pb-2">
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href=""
            className="text-gray-500 text-xl hover:text-blue-500 mt-2"
          >
            <i className="fa-regular fa-heart"></i>
          </a>
        </div>
        <button title="">{button}</button>
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a href="#" className="text-gray-500 hover:text-blue-500 mt-2">
            <i className="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Card;
