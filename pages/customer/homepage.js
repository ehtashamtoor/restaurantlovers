import PageHeader from "@/components/PageHeader";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import image from "../../public/restaurant.jpg";
import CustomerProtectedRoute from "@/components/CustomerProtectedRoute";

const Homepage = () => {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState([]);

  const getAllRestaurants = async () => {
    let resp = await axios.get("/api/allrestaurants");
    // console.log(resp.data.allrestaurants);
    if (resp.data.success) {
      setRestaurants(resp.data.allrestaurants);
    }
  };

  useEffect(() => {
    getAllRestaurants();
  }, []);

  const handleClick = (restaurantName, id) => {
    router.push(`/customer/${restaurantName}/${id}`);
  };
  return (
    <CustomerProtectedRoute>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 mt-5 px-2">
            <PageHeader heading="All Restaurants" />

            <div className="flex sm:flex-row gap-2 sm:flex-wrap py-4 flex-col cursor-pointer">
              {restaurants?.map((restaurant, index) => (
                <div
                  key={index}
                  className="mx-auto bg-white rounded-3xl shadow-xl overflow-hidden"
                  onClick={() => {
                    handleClick(restaurant.name, restaurant._id);
                  }}
                >
                  <div className="min-w-[15rem] w-[15rem] sm:w-[22rem] mx-auto">
                    <img
                      src={restaurant?.image?.url || "/restaurant.jpg"}
                      className="h-[14rem] w-full"
                    />
                    <div className="p-4 sm:p-6">
                      <p className="font-bold text-gray-700 capitalize text-[22px] leading-7 mb-1">
                        {restaurant.name}
                      </p>
                      {restaurant?.categories.length > 0 && (
                        <p>
                          <span className="opacity-60">
                            Our specialized food categories:
                          </span>{" "}
                          &nbsp;
                          {restaurant.categories.map((category, index, arr) => {
                            //   console.log(category);
                            return (
                              <span
                                key={index}
                                className="text-black font-bold text-lg capitalize opacity-90"
                              >
                                {category.name}
                                {index === arr.length - 1 ? "" : ","}
                                &nbsp;
                              </span>
                            );
                          })}
                        </p>
                      )}

                      <p className="text-[#7C7C80] font-[15px] mt-6">
                        Our food is made with choosen methods with extra kick of
                        spices, which are mostly liked by people worldwide
                      </p>

                      <button
                        className="block mt-5 w-full px-4 py-2 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform bg-[#FFC933] rounded-[14px] hover:bg-[#FFC933DD] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80"
                        onClick={() => {
                          handleClick();
                        }}
                      >
                        See Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CustomerProtectedRoute>
  );
};

export default Homepage;
