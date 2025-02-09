import React from "react";

function Footer() {
  return (
    <footer className="bg-[#3B1E54] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          {/* Contact Info */}
          <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-6">
            <h4 className="text-xl font-bold mb-4">Contact Info</h4>
            <ul className="space-y-2">
              <li>
                <span className="font-semibold">Address:</span><br />
                123 Street Name, City, England
              </li>
              <li>
                <span className="font-semibold">Phone:</span><br />
                <a href="tel:1234567890" className="text-blue-400">
                  (123) 456-7890
                </a>
              </li>
              <li>
                <span className="font-semibold">Email:</span><br />
                <a href="mailto:mail@example.com" className="text-blue-400">
                  mail@example.com
                </a>
              </li>
              <li>
                <span className="font-semibold">Working Days/Hours:</span><br />
                Mon - Sun / 9:00 AM - 8:00 PM
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-6">
            <h4 className="text-xl font-bold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Help & FAQs</a></li>
              <li><a href="#" className="hover:underline">Order Tracking</a></li>
              <li><a href="#" className="hover:underline">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:underline">Orders History</a></li>
              <li><a href="#" className="hover:underline">About Us</a></li>
            </ul>
          </div>

          {/* Subscribe Newsletter */}
          <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-6">
            <h4 className="text-xl font-bold mb-4">Subscribe Newsletter</h4>
            <p className="mb-4">Get all the latest information on events, sales, and offers. Sign up for our newsletter:</p>
            <form action="#" className="flex flex-col space-y-3">
              <input
                type="email"
                className="form-control w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Email address"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-4 mt-4">
          <div className="flex flex-wrap items-center justify-between">
            <span className="text-sm text-gray-400">© easydeals eCommerce. 2024. All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
