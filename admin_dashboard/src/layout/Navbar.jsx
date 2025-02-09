import React from "react";

function Navbar() {
  return (
    <>
      <nav className="navbar">
      <div className="container-fluid">
      <div className="navbar-header">
        <a
          href="#"
          onclick="return false;"
          className="navbar-toggle collapsed"
          data-bs-toggle="collapse"
          data-target="#navbar-collapse"
          aria-expanded="false"
        />
        <a href="#" onclick="return false;" className="bars" />
        <a className="navbar-brand" href="index.html">
        </a>
      </div>
      <div className="collapse navbar-collapse" id="navbar-collapse">
        <ul className="pull-left">
          <li>
            <a href="#" onclick="return false;" className="sidemenu-collapse">
              <i data-feather="menu" />
            </a>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          {/* Full Screen Button */}
          <li className="fullscreen">
            <a href="javascript:;" className="fullscreen-btn">
              <i className="fas fa-expand" />
            </a>
          </li>
          {/* #END# Full Screen Button */}
         
          {/* #END# Notifications*/}
          <li className="dropdown user_profile">
            <div className="dropdown-toggle" data-bs-toggle="dropdown">
              <img src="assets/images/user.jpg" alt="user" />
            </div>
            <ul className="dropdown-menu pullDown">
              <li className="body">
                <ul className="user_dw_menu">
                  <li>
                    <a href="#" onclick="return false;">
                      <i className="material-icons">person</i>Profile
                    </a>
                  </li>
                
                  <li>
                    <a href="#" onclick="return false;">
                      <i className="material-icons">power_settings_new</i>Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          {/* #END# Tasks */}
          <li className="pull-right">
            <a
              href="#"
              onclick="return false;"
              className="js-right-sidebar"
              data-close="true"
            >
              <i className="fas fa-cog" />
            </a>
          </li>
        </ul>
      </div>
      </div>
      </nav>  
    </>
  );
}

export default Navbar;
