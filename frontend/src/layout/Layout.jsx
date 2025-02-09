import React from 'react'
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

function Layout({children}) {
  return (
    <>
      <Navbar/>
        <main className="">{children}
        </main>
      <Footer/>
    </>
  )   
}

export default Layout