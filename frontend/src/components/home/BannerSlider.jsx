import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, HashNavigation } from "swiper/modules";

function BannerSlider() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        hashNavigation={{
          watchState: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, HashNavigation]}
        className="mySwiper"
      >
        <SwiperSlide data-hash="slide1">
          <div className="relative">
            <img
              src="/assets/1.jpg"
              alt="Summer Sale Banner"
              className="object-cover w-full h-[500px]"
            />
            <div className="absolute top-1/2 left-[180px] transform -translate-y-1/2 text-[#2B2D42]">
              <p className="text-lg font-medium mb-4">
                Discover the latest trends at unbeatable prices.
              </p>
              <h2 className="text-5xl font-bold mb-2">Summer Sale</h2>
              <h1 className="text-7xl font-bold mb-4">70% OFF</h1>
              <button className="bg-[#81c784] hover:bg-[#66bb6a] text-white py-2 px-6 rounded-lg font-bold shadow-lg transition-all duration-300">
                Shop Now
              </button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide data-hash="slide3">
          <div className="relative">
            <img
              src="/assets/3.jpg"
              alt="Discount Banner"
              className="object-cover w-full h-[500px]"
            />

            <div className="absolute top-1/2 left-[90px] transform -translate-y-1/2 text-white">
              <h2 className="text-4xl font-bold mb-2">Mega Discounts</h2>
              <h1 className="text-6xl font-bold mb-4">Up to 80% OFF</h1>
              <button className="bg-[#7aa93c] text-white py-2 px-6 rounded-lg font-bold">
                Grab Deals
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default BannerSlider;
