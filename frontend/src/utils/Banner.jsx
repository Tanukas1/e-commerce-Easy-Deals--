import React from 'react'

function Banner() {
  return (
    <div className="page-header p-20 bg-gray-200 text-dark text-center ">
          <div className="container flex flex-col items-center">
            <nav aria-label="breadcrumb" class="breadcrumb-nav">
              <div className="container">
                <ol className="breadcrumb flex space-x-2 text-gray-600">
                  <li className="breadcrumb-item">
                    <a href="" class="hover:text-blue-500">
                      Home
                    </a>
                  </li>
                  <i className="fa-solid fa-greater-than pt-1"></i>
                  <li className="breadcrumb-item">
                    <a href="" class="hover:text-blue-500">
                      Shop
                    </a>
                  </li>
                  <i className="fa-solid fa-greater-than pt-1"></i>
                  <li
                    className="breadcrumb-item text-gray-900 font-semibold"
                    aria-current="page">
                    My Account
                  </li>
                </ol>
              </div>
            </nav>

            <h1 class="text-3xl font-bold mt-4">My Account</h1>
          </div>
    </div>
  )
}

export default Banner