import OrderRow from "@/components/OrderRow";
import PageHeader from "@/components/PageHeader";
import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Pending = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!session?.user?.role === "restaurant") {
      router.push("/auth/signin/restaurant");
    }
  }, [session, router]);
  const getOrders = async () => {
    const resp = await axios.get(`/api/singleresOrders?status=Pending`);
    if (resp.data.success) {
      // console.log(resp.data.orders);
      setOrders(resp.data.orders);
    } else {
      console.log(resp.data.message);
    }
  };
  useEffect(() => {
    getOrders();
  }, [message]);

  return (
    <ProtectedRoute>
      <div className="max-w-full md:px-8 mx-auto mt-8">
        <PageHeader heading={"Pending Orders"} />
        <h1 className="text-2xl">{message}</h1>
        {orders.length > 0 ? (
          <table className="w-full bg-white shadow-lg">
            <thead>
              <tr>
                <th className="md:px-4 px-1 py-2">Customer Name</th>
                <th className="md:px-4 px-1 py-2">Dish Name</th>
                <th className="md:px-4 px-1 py-2 hidden md:block">Price</th>
                <th className="md:px-4 px-1 py-2">Total Price</th>
                <th className="md:px-4 px-1 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <OrderRow
                  key={order._id}
                  order={order}
                  button="Accept"
                  setMessage={setMessage}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <h1 className="text-2xl">No Orders</h1>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Pending;
