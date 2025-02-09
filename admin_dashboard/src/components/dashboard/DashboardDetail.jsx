import React from "react";

function DashboardDetail() {
  return (
    <section className="content">
      <div className="container-fluid">
        <div className="block-header">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <ul className="breadcrumb breadcrumb-style ">
                <li className="breadcrumb-item">
                  <h4 className="page-title">Dashboard</h4>
                </li>
                <li className="breadcrumb-item bcrumb-1">
                  <a href="index.html">
                    <i className="fas fa-home" /> Home
                  </a>
                </li>
                <li className="breadcrumb-item active">Dashboard</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 mx-auto">
            <div
              className="card"
              style={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              {/* Header Section */}
              <div
                className="header"
                style={{
                  background: "#3B1E54",
                  color: "white",
                  padding: "24px",
                  textAlign: "center",
                }}
              >
                <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
                  Welcome to <span style={{ color: "#facc15" }}>Dashboard</span>
                </h1>
                <p style={{ marginTop: "8px", fontSize: "14px" }}>
                  Your personalized space for efficient task and project
                  management.
                </p>
              </div>

              {/* Body Section */}
              <div
                className="body"
                style={{
                  backgroundColor: "#f9fafb",
                  padding: "24px",
                  textAlign: "center",
                  color: "#374151",
                }}
              >
                <p style={{ fontSize: "18px", marginBottom: "16px" }}>
                  Let's get started with your dashboard experience.
                </p>
                <button
                  style={{
                    marginTop: "16px",
                    backgroundColor: "#7E60BF",
                    color: "white",
                    padding: "12px 24px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#3B1E54")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#3B1E54")
                  }
                >
                  Explore Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardDetail;
