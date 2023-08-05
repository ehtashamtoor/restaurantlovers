import OrderRow from "@/components/OrderRow";
import PageHeader from "@/components/PageHeader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProtectedRoute from "@/components/ProtectedRoute";

const Delivered = () => {
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
    const resp = await axios.get(`/api/singleresOrders?status=Delivered`);
    if (resp.data.success) {
      // console.log(resp.data.orders);
      setOrders(resp.data.orders);
    } else {
      console.log(resp.data.message);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <ProtectedRoute>
      <div className="max-w-full md:px-8 px-1 mx-auto mt-8">
        <PageHeader heading={"Delivered Orders"} />
        <table className="w-full bg-white shadow-lg">
          <thead>
            <tr>
              <th className="md:px-4 py-2">Customer Name</th>
              <th className="md:px-4 py-2">Dish Name</th>
              <th className="md:px-4 px-1 py-2 hidden md:block">Price</th>
              <th className="md:px-4 px-1 py-2">Total Price</th>
              {/* <th className="px-4 py-2">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </ProtectedRoute>
  );
};

export default Delivered;
