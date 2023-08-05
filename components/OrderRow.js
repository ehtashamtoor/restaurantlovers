import axios from "axios";
import React, { useState } from "react";

const OrderRow = ({ order, button = "", setMessage }) => {
  const handleOrderStatus = async (itemID) => {
    let statusToUpdate = "";
    if (button === "Accept") {
      statusToUpdate = "Accepted";
    } else if (button === "Deliver") {
      statusToUpdate = "Delivered";
    }

    if (statusToUpdate) {
      const data = { _id: itemID, status: statusToUpdate };
      let resp = await axios.patch("/api/singleresOrders", data);

      if (resp.data.success) {
        if (button === "Accept") {
          setMessage("Order has been added to accepted tab");
        } else if (button === "Deliver") {
          setMessage("Order has been added to delivered tab");
        }
      }
    }
  };
  return (
    <tr className="border-b border-gray-300 text-center">
      <td className="md:px-4 py-2 capitalize">{order.customerName}</td>
      {order?.foodItems?.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <td className="md:px-4 py-2 capitalize">{item.foodItem.name}</td>
            <td className="md:px-4 py-2 hidden md:block">
              {item.foodItem.price}
            </td>
          </React.Fragment>
        );
      })}
      <td className="md:px-4 py-2">{order.totalPrice}</td>

      {/* Add more table columns for other information */}
      <td className="px-4 py-2">
        {button && (
          <button
            onClick={() => {
              handleOrderStatus(order._id);
            }}
            className="md:px-4 px-1 py-2 text-white text-[10px] md:text-md bg-green-500 rounded-md"
          >
            {button}
          </button>
        )}
      </td>
    </tr>
  );
};

export default OrderRow;
