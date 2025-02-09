import React from "react";

function HomeNews() {
  return (
    <div>
      <section className="container mx-auto py-12">
          <div className="flex items-center mb-5">
            <hr className="flex-grow border-t border-gray-300" />
            <h1 className="px-4 text-center text-2xl font-semibold text-[#3B1E54]">
             Latest News
            </h1>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-start">
            <img
              src="https://portotheme.com/html/porto_ecommerce/assets/images/blog/home/post-1.jpg"
              alt="Top New Collection"
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h5 className="text-lg font-semibold mb-2">Top New Collection</h5>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              alias eaque, cumque, facere quia libero enim repellat deleniti
              ratione neque repellendus veniam vel dolore tempore? Delectus
              nulla voluptatibus dolorum vero!
            </p>
          </div>

          <div className="flex flex-col items-start">
            <img
              src="https://portotheme.com/html/porto_ecommerce/assets/images/blog/home/post-1.jpg"
              alt="Top New Collection"
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h5 className="text-lg font-semibold mb-2">Top New Collection</h5>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              alias eaque, cumque, facere quia libero enim repellat deleniti
              ratione neque repellendus veniam vel dolore tempore? Delectus
              nulla voluptatibus dolorum vero!
            </p>
          </div>

          <div className="flex flex-col items-start">
            <img
              src="https://portotheme.com/html/porto_ecommerce/assets/images/blog/home/post-1.jpg"
              alt="Top New Collection"
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h5 className="text-lg font-semibold mb-2">Top New Collection</h5>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              alias eaque, cumque, facere quia libero enim repellat deleniti
              ratione neque repellendus veniam vel dolore tempore? Delectus
              nulla voluptatibus dolorum vero!
            </p>
          </div>

          <div className="flex flex-col items-start">
            <img
              src="https://portotheme.com/html/porto_ecommerce/assets/images/blog/home/post-1.jpg"
              alt="Top New Collection"
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h5 className="text-lg font-semibold mb-2">Top New Collection</h5>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              alias eaque, cumque, facere quia libero enim repellat deleniti
              ratione neque repellendus veniam vel dolore tempore? Delectus
              nulla voluptatibus dolorum vero!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeNews;
