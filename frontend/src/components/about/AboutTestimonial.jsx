import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.min.css'; 
// import 'swiper/swiper.min.css'; 

const AboutTestimonials = () => {
  return (
    <div className="testimonials-section py-10">
      <div className="container mx-auto">
        <h2 className="subtitle text-center text-2xl font-bold mb-8">HAPPY CLIENTS</h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          autoHeight={true}
          breakpoints={{
            992: {
              slidesPerView: 2,
            },
          }}
          loop={true}
          className="testimonials-carousel"
        >
          <SwiperSlide>
            <div className="testimonial bg-gray-100 p-6 rounded-lg shadow-md">
              <div className="testimonial-owner flex items-center mb-4">
                <figure className="w-16 h-16 mr-4">
                  <img
                    src="https://portotheme.com/html/porto_ecommerce/assets/images/clients/client1.png"
                    alt="client"
                    className="w-full h-full object-cover rounded-full"
                  />
                </figure>
                <div>
                  <strong className="testimonial-title block text-lg font-semibold">Bob Smith</strong>
                  <span className="text-sm text-gray-500">CEO, SMARTWAVE</span>
                </div>
              </div>
              <blockquote className="text-gray-700">
                <p>
                  "Working with EasyDeals has been an amazing experience. Their products are top-notch, and the service is exceptional. Highly recommend them for anyone looking for quality and reliability!"
                </p>
              </blockquote>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="testimonial bg-gray-100 p-6 rounded-lg shadow-md">
              <div className="testimonial-owner flex items-center mb-4">
                <figure className="w-16 h-16 mr-4">
                  <img
                    src="https://portotheme.com/html/porto_ecommerce/assets/images/clients/client1.png"
                    alt="client"
                    className="w-full h-full object-cover rounded-full"
                  />
                </figure>
                <div>
                  <strong className="testimonial-title block text-lg font-semibold">John Smith</strong>
                  <span className="text-sm text-gray-500">CEO, SMARTWAVE</span>
                </div>
              </div>
              <blockquote className="text-gray-700">
                <p>
                  "The quality of the products I purchased from EasyDeals is outstanding. They go above and beyond to ensure their customers are happy. I’m a repeat customer, and I will definitely keep coming back!"
                </p>
              </blockquote>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="testimonial bg-gray-100 p-6 rounded-lg shadow-md">
              <div className="testimonial-owner flex items-center mb-4">
                <figure className="w-16 h-16 mr-4">
                  <img
                    src="https://portotheme.com/html/porto_ecommerce/assets/images/clients/client1.png"
                    alt="client"
                    className="w-full h-full object-cover rounded-full"
                  />
                </figure>
                <div>
                  <strong className="testimonial-title block text-lg font-semibold">Mary Johnson</strong>
                  <span className="text-sm text-gray-500">Founder, TECHINSIGHT</span>
                </div>
              </div>
              <blockquote className="text-gray-700">
                <p>
                  "I’ve had the pleasure of shopping with EasyDeals for over a year, and every experience has been flawless. Their customer service is excellent, and they offer the best deals!"
                </p>
              </blockquote>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default AboutTestimonials;
