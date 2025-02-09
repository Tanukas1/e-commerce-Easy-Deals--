import React from "react";

function BannerSlider2() {
  return (
    <div>
      <section className="py-10 bg-gray-100">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-7">
            <div className="text-center">
              <h1 className="text-xl font-semibold text-[#3B1E54]">EXCLUSIVE DISCOUNT</h1>
              <p className="text-gray-600">Get up to 30% off on all our products this season.</p>
            </div>
            <div className="text-center">
              <h1 className="text-xl font-semibold text-[#3B1E54]">FREE SHIPPING</h1>
              <p className="text-gray-600">Enjoy free shipping on all orders over $50.</p>
            </div>
            <div className="text-center">
              <h1 className="text-xl font-semibold text-[#3B1E54]">LIMITED TIME OFFER</h1>
              <p className="text-gray-600">Hurry up! Grab the best deals before they expire.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BannerSlider2;
