import React from "react";

function AboutDetail() {
  return (
    <div>
      <div>
        <img
          src="public\assets\about.jpg"
          alt="About Us Banner"
          className="w-full h-auto"
        />
      </div>
      <div className="container mx-auto py-12">
        <h5 className="text-xl font-semibold">OUR STORY</h5>
        <p className="text-gray-700 mb-5">
        At EasyDeals, we believe in providing high-quality products that enhance your lifestyle. Founded with the goal of making premium items accessible to everyone, we’ve worked tirelessly to curate a collection of top-notch products in a variety of categories. Our commitment to quality and customer satisfaction is at the core of everything we do. 
        </p>
        <p className="text-gray-700 mb-5">
          Since our inception, we’ve grown into a trusted name in the [industry], delivering
          exceptional service and products. Our mission is to offer a seamless shopping
          experience, ensuring our customers get exactly what they need, whether it's the
          latest trends or classic, timeless pieces.
        </p>
        <p className="text-gray-700 text-2xl">
          “We’re not just about selling products. We’re about creating a lasting impact
          by offering only the best to our customers.”
        </p>
      </div>
      <div className="container-fluid mx-auto py-12 bg-gray-200">
        <h4 className="font-bold text-center mb-4">WHY CHOOSE US</h4>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
          <div className="col-span-1 bg-white p-6 rounded-lg shadow-lg">
            <i className="fas fa-shipping-fast text-4xl text-blue-400 mb-3"></i>
            <h5 className="font-bold mb-3">Free Shipping</h5>
            <p>
              We offer free shipping on all orders over $50, ensuring that your products
              arrive quickly and safely at your doorstep without any additional cost.
            </p>
          </div>
          <div className="col-span-1 bg-white p-6 rounded-lg shadow-lg">
            <i className="fas fa-undo text-4xl text-blue-400 mb-3"></i>
            <h5 className="font-bold mb-3">Easy Returns</h5>
            <p>
              If you’re not completely satisfied with your purchase, we offer a hassle-free
              30-day return policy. Your satisfaction is our priority.
            </p>
          </div>
          <div className="col-span-1 bg-white p-6 rounded-lg shadow-lg">
            <i className="fas fa-headset text-4xl text-blue-400 mb-3"></i>
            <h5 className="font-bold mb-3">24/7 Customer Support</h5>
            <p>
              Our customer support team is available 24/7 to help you with any questions,
              concerns, or issues you may have. We’re always here to assist you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutDetail;
