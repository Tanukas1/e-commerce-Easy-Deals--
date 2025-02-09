import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function FixedBanner() {
  return (
    <>
      <section className="bg-[#F6F7F9] py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between space-y-8 md:space-y-0 gap-12">
            {/* Shipping */}
            <div className="w-full md:w-1/3 flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 border-2 border-[#7aa93c] rounded-full text-[#7aa93c] text-4xl">
                <i className="fas fa-truck"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <h5 className="text-lg text-gray-600 mb-3">
                Fast & Reliable Delivery
              </h5>
              <p className="text-gray-500">
                Enjoy free shipping on all orders within the country. We ensure
                fast and reliable delivery to your doorstep, so you can enjoy
                your purchase without any delay.
              </p>
            </div>

            {/* Cash on Delivery */}
            <div className="w-full md:w-1/3 flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 border-2 border-[#7aa93c] rounded-full text-[#7aa93c] text-4xl">
                <i className="fas fa-money-bill-wave"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Cash on Delivery</h3>
              <h5 className="text-lg text-gray-600 mb-3">Pay on Delivery</h5>
              <p className="text-gray-500">
                We offer Cash on Delivery (COD) as a payment option for all
                orders. Pay for your items when they arrive at your doorstep,
                ensuring a hassle-free shopping experience.
              </p>
            </div>

            {/* Customer Support */}
            <div className="w-full md:w-1/3 flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 border-2 border-[#7aa93c] rounded-full text-[#7aa93c] text-4xl">
                <i className="fas fa-headphones-alt"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
              <h5 className="text-lg text-gray-600 mb-3">24/7 Assistance</h5>
              <p className="text-gray-500">
                Our dedicated customer support team is available around the
                clock. Whether you need assistance with an order or have any
                questions, we’re here to help you anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <img
          src="https://portotheme.com/html/porto_ecommerce/assets/images/demoes/demo4/banners/banner-5.jpg"
          alt="Promotional Banner"
          className="w-full h-auto"
        />
      </section>
    </>
  );
}

export default FixedBanner;
