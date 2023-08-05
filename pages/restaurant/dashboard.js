import PageHeader from "@/components/PageHeader";
import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState();
  const router = useRouter();
  // console.log(session);

  const getOrders = async () => {
    const resp = await axios.get("/api/singleresOrders");
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
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 mt-5 px-2">
            <PageHeader heading="Order Summaries" />
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
                      Customer Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900  md:px-6 px-2 py-4 text-left"
                    >
                      Total Price
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900  md:px-6 px-2 py-4 text-left"
                    >
                      Order Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order, index) => {
                    return (
                      <tr
                        key={order._id}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                      >
                        <td className=" md:px-6 px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="text-sm text-gray-900 font-light capitalize  md:px-6 px-2 py-4 whitespace-nowrap">
                          {order.customerName}
                        </td>
                        <td className="text-sm text-gray-900 font-light  md:px-6 px-2 py-4 whitespace-nowrap">
                          {order.totalPrice}
                        </td>
                        <td className="text-sm text-gray-900 font-light  md:px-6 px-2 py-4 whitespace-nowrap">
                          {order.status}
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
    </ProtectedRoute>
  );
};

export default DashboardPage;
