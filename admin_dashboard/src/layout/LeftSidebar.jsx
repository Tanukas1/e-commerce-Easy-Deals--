import React from "react";

function Sidebar() {
  return (
    <aside id="leftsidebar" className="sidebar">
      <div className="menu">
        <ul className="list">
          <li className="sidebar-user-panel active">
            <div className="user-panel">
              <div className="image">
                <img
                  src="public/assets/images/update-images/logo_black_text.png"
                  alt="Logo"
                  style={{
                    maxWidth: "200px",
                    height: "auto",
                    position: "relative",
                    right: "72px",
                  }}
                />
              </div>
            </div>
            <div className="profile-usertitle">
              <div className="sidebar-userpic-name">Admin</div>
            </div>
          </li>
          <li className="header">-- Main</li>
          <li className="active">
            <a href="dashboard" onclick="return false;" className="menu-toggle">
              <i data-feather="monitor" />
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="all_category"
              onclick="return false;"
              className="menu-toggle"
            >
              <i data-feather="tag"></i>
              <span>Category</span>
            </a>
          </li>
          <li>
            <a
              href="all_products"
              onclick="return false;"
              className="menu-toggle"
            >
              <i data-feather="box"></i>
              <span>Products</span>
            </a>
          </li>
          <li>
            <a href="order" onClick="return false;" class="menu-toggle">
              <i data-feather="shopping-cart"></i>
              <span>Order</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
