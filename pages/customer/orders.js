import CustomerProtectedRoute from "@/components/CustomerProtectedRoute";
import PageHeader from "@/components/PageHeader";
import axios from "axios";
import React, { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const resp = await axios.get("/api/orders");

      if (resp.data.success) {
        setOrders(resp.data.orders);
        // console.log(resp.data.orders);
        // console.log(resp.data.message);
      } else {
        console.log(resp.data.message);
      }
    };

    getOrders();
  }, []);

  return (
    <CustomerProtectedRoute>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 mt-5 px-2">
            <PageHeader heading="Orders" />
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-blue-300 border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900  md:px-6 px-2 py-4 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900  md:px-6 px-2 py-4 text-left"
                    >
                      Food item
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900  md:px-6 px-2 py-4 text-left"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900  md:px-6 px-2 py-4 text-left"
                    >
                      Qty
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900  md:px-6 px-2 py-4 text-left"
                    >
                      Order Status
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900  md:px-6 px-2 py-4 text-left"
                    >
                      Total price(Rs)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    return (
                      <tr
                        key={order._id}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                      >
                        <td className=" md:px-6 px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          1
                        </td>

                        {order?.foodItems.map((item) => {
                          return (
                            <>
                              <td className="text-sm text-gray-900 font-light  md:px-6 px-2 py-4 whitespace-nowrap">
                                {item.foodItem.name}
                              </td>
                              <td className="text-sm text-gray-900 font-light  md:px-6 px-2 py-4 whitespace-nowrap">
                                {item.foodItem.price}
                              </td>
                              <td className="text-sm text-gray-900 font-light  md:px-6 px-2 py-4 whitespace-nowrap">
                                {item.quantity}
                              </td>
                            </>
                          );
                        })}

                        <td
                          className={`text-sm font-bold ${
                            order.status === "Pending"
                              ? "text-orange-600"
                              : order.status === "Accepted"
                              ? "text-green-500"
                              : "text-blue-500"
                          }  md:px-6 px-2 py-4 whitespace-nowrap`}
                        >
                          {order.status}
                        </td>
                        <td className="text-sm text-gray-900 font-light  md:px-6 px-2 py-4 whitespace-nowrap">
                          {order.totalPrice}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </CustomerProtectedRoute>
  );
};

export default OrdersPage;
