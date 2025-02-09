import React from 'react';
import Navbar from '../layout/Navbar';
import LeftSidebar from '../layout/LeftSidebar';
function Layout({ children }) { 
  return (
    <>
      <Navbar />
      <LeftSidebar/>
      <main>{children}</main>
    </>
  );
}

export default Layout;
