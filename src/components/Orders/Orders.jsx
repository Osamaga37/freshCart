import React, { useContext, useEffect, useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import { CartContext } from "../../Context/CartContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState(null); // State to track the expanded order
  const { userId } = useContext(CartContext);

  async function getUserOrders(userId) {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
        {
          headers: {
            token: window.localStorage.getItem("userToken"),
          },
        }
      );
      console.log(res.data);

      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUserOrders(userId);
  }, [userId]);

  const toggleDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div>
      <h1 className="text-3xl text-green-700 font-bold text-center my-10">
        Your Orders
      </h1>
      {orders && orders.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex justify-between mx-10">
            <h3 className="text-gray-600 text-2xl">
              Total Order items: {orders.length}
            </h3>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-green-600 dark:text-gray-400">
            <thead className="text-xs text-green-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order Delivered
                </th>
                <th scope="col" className="px-6 py-3">
                  Order Paid
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment Method
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Order Details
                </th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <React.Fragment key={order._id}>
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-green-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">
                      {order.isDelivered ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4">{order.isPaid ? "Yes" : "No"}</td>
                    <td className="px-6 py-4">{order.paymentMethodType}</td>
                    <td className="px-6 py-4">{order.totalOrderPrice}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleDetails(order._id)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        {expandedOrderId === order._id
                          ? "Hide Details"
                          : "Details"}
                      </button>
                    </td>
                  </tr>
                  {expandedOrderId === order._id && (
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <td colSpan="5" className="px-6 py-4 ">
                        <h3 className="text-xl font-bold">Order Items:</h3>
                        <div>
                          {order.cartItems.map((item) => (
                            <div
                              key={item.product._id}
                              className="flex gap-5 m-10"
                            >
                              <img
                                src={item.product.imageCover}
                                alt={item.product.title}
                                className="w-16 h-16"
                              />
                              <div className="flex flex-col">
                                <h4>{item.product.title}</h4>
                                <h4>Quantity: {item.count}</h4>
                              </div>
                            </div>
                          ))}
                        </div>
                        <h4>Total: ${order.totalOrderPrice}</h4>
                        <h4>Payment Method: {order.paymentMethodType}</h4>
                        <h4>
                          Status:{" "}
                          {order.isDelivered ? "Delivered" : "Not Delivered"}
                        </h4>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <h3>Sorry, No Orders</h3>
          <Link to="/products">
            <button className="btn ms-5">Shop Now</button>
          </Link>
        </div>
      )}
    </div>
  );
}
