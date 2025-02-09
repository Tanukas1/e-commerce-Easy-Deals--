import React, { useEffect, useState } from "react";
import axios from "axios";

function OrderDetail() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/orders");
        setOrders(response.data.orders);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="block-header">
          <div className="row">
            <div className="col-lg-12">
              <ul className="breadcrumb breadcrumb-style">
                <li className="breadcrumb-item">
                  <h4 className="page-title">All Orders</h4>
                </li>
                <li className="breadcrumb-item bcrumb-1">
                  <a href="../../index.html">
                    <i className="fas fa-home"></i> Home
                  </a>
                </li>
                <li className="breadcrumb-item bcrumb-2">
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Orders
                  </a>
                </li>
                <li className="breadcrumb-item active">All Orders</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <div className="header">
                <h2>
                  <strong>All</strong> Orders
                </h2>
              </div>
              <div className="body">
                <div className="table-responsive">
                  <table className="table table-hover js-basic-example order_list">
                    <thead>
                      <tr>
                        <th className="center">Order ID</th>
                        <th className="center">User ID</th>
                        <th className="center">Products</th>
                        <th className="center">Total Amount</th>
                        <th className="center">Shipping Address</th>
                        <th className="center">Order Date</th>
                        <th className="center">Status</th>
                        <th className="center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td className="center">{order._id}</td>
                          <td className="center">{order.userId}</td>
                          <td className="center">
                            {order.products.map((product) => (
                              <div key={product._id}>
                                {product.productId}(Qty: {product.quantity})(price: {product.price})
                              </div>
                            ))}
                          </td>
                          <td className="center">${order.totalAmount}</td>
                          <td className="center">{order.shippingAddress}</td>
                          <td className="center">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="center">
                            <span
                              className={`badge ${
                                order.status === "Pending"
                                  ? "badge-warning"
                                  : "badge-success"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="center">
                            <a href="#" className="btn btn-tbl-view">
                              <i className="material-icons">visibility</i>
                            </a>
                            <a href="#" className="btn btn-tbl-edit">
                              <i className="material-icons">create</i>
                            </a>
                            <a href="#" className="btn btn-tbl-delete">
                              <i className="material-icons">delete_forever</i>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderDetail;
