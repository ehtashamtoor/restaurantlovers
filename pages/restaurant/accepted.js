import OrderRow from "@/components/OrderRow";
import PageHeader from "@/components/PageHeader";
import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Accepted = () => {
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
    const resp = await axios.get(`/api/singleresOrders?status=Accepted`);
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
      <div className="max-w-full md:px-8 px-1 mx-auto mt-8">
        <PageHeader heading={"Accepted Orders"} />
        {orders.length > 0 ? (
          <table className="w-full bg-white shadow-lg">
            <thead>
              <tr>
                <th className="md:px-4 py-2">Customer Name</th>
                <th className="md:px-4 py-2">Dish Name</th>
                <th className="md:px-4 px-1 py-2 hidden md:block">Price</th>
                <th className="md:px-4 px-1 py-2">Total Price</th>
                <th className="md:px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <OrderRow
                  key={order._id}
                  order={order}
                  button="Deliver"
                  setMessage={setMessage}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <h1 className="text-3xl">No Orders</h1>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Accepted;
