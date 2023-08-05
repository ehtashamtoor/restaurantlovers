import CustomerProtectedRoute from "@/components/CustomerProtectedRoute";
import PageHeader from "@/components/PageHeader";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Restaurant = () => {
  const router = useRouter();
  const { restaurantdetails } = router?.query;
  let [restaurantId, setRestaurantID] = useState("");
  let [restaurantName, setRestaurantName] = useState("");
  let [restaurant, setRestaurant] = useState([]);
  let [totalPrice, settotalPrice] = useState(0);
  const { data: session } = useSession();
  let [category, setCategory] = useState("");
  let [qtys, setQtys] = useState([]);
  const [selectedCategoryFoodItems, setSelectedCategoryFoodItems] = useState(
    []
  );

  // console.log(restaurantdetails);

  const getSingleRestaurant = async () => {
    let resp = await axios.get(`/api/singleRestaurant?id=${restaurantId}`);
    if (resp.data.success) {
      // console.log(resp.data.restaurant);
      setRestaurant(resp.data.restaurant);
    } else {
      console.log(resp.data.message);
    }
  };
  useEffect(() => {
    router?.query?.restaurantdetails &&
      (setRestaurantID(restaurantdetails[1]),
      setRestaurantName(restaurantdetails[0]));
  }, [router, restaurantdetails]);
  useEffect(() => {
    restaurantId !== "" && getSingleRestaurant();
  }, [restaurantId]);

  const handleChange = (CatId) => {
    // console.log(CatId);
    const foodItemsForSelectedCategory = restaurant.foodItems.filter(
      (foodItem) => {
        // console.log(foodItem);
        return foodItem.category === CatId;
      }
    );

    setSelectedCategoryFoodItems(foodItemsForSelectedCategory);
    setQtys(
      Array.from({ length: foodItemsForSelectedCategory.length }, () => "0")
    );

    // console.log("fooditemsinCategory", foodItemsForSelectedCategory);
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    const total = selectedCategoryFoodItems.reduce((acc, foodItem, index) => {
      return acc + foodItem.price * +qtys[index];
    }, 0);
    settotalPrice(total);

    const orderItems = selectedCategoryFoodItems.map((fooditem, index) => {
      if (+qtys[index] > 0) {
        return {
          foodItem: fooditem._id,
          quantity: qtys[index],
        };
      }
    });

    // console.log(orderItems.filter((item) => item));

    const data = {
      customerName: session?.user?.name,
      customerId: session?.user?.id,
      restaurant: restaurantId,
      foodItems: orderItems.filter((item) => item),
      totalPrice: total,
    };

    // console.log("data to send", data);

    try {
      const resp = await axios.post("/api/orders", data);
      // console.log(resp.data);
      if (resp.data.success) {
        router.push("/customer/orders");
        // console.log(resp.data.message);
      } else {
        console.log(resp.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleQty = (e, index) => {
    const inputData = [...qtys];
    inputData[index] = e.target.value;
    setQtys(inputData);
  };
  // console.log(qtys);

  return (
    <CustomerProtectedRoute>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 mt-5 px-2">
            <div>RESTAURANT</div>
            <PageHeader heading={restaurantName} />
            <div className="overflow-hidden">
              <h1 className="text-2xl font-semibold opacity-80">
                Place an Order on our best in town categories
              </h1>

              <select
                value={category._id}
                onChange={(e) => {
                  handleChange(e.target.value);
                }}
              >
                <option value="">Choose a category</option>
                {restaurant?.categories?.map((category, index) => {
                  return (
                    <option key={index} value={category._id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>

              <div className="flex sm:flex-row gap-2 sm:flex-wrap py-4 flex-col">
                {selectedCategoryFoodItems?.map((foodItem, index) => {
                  // console.log(foodItem._id);
                  return (
                    <div
                      className="  mx-auto bg-white rounded-3xl shadow-xl overflow-hidden"
                      key={foodItem._id}
                    >
                      <div className="min-w-[15rem] w-[15rem] sm:w-[18rem] mx-auto">
                        <img
                          className="h-full w-full"
                          src={foodItem?.images[0].url}
                        />
                        <div className="p-4 sm:p-6">
                          <p className="font-bold text-gray-700 capitalize text-[22px] leading-7 mb-1">
                            {foodItem.name}
                          </p>
                          <p className="font-bold text-gray-700 text-[22px] leading-7 mb-1">
                            <span className="opacity-60 text-sm">Rs:</span>{" "}
                            {foodItem.price}
                          </p>
                          <p className="font-bold text-gray-700 capitalize text-[22px] leading-7 mb-1">
                            <span className="opacity-60 text-sm">
                              Delivery Type:
                            </span>{" "}
                            {foodItem.deliveryType}
                          </p>
                          <p class="text-[#7C7C80] font-[15px] mt-6">
                            Our food is made with choosen methods with extra
                            kick of spices, which are mostly liked by people
                            worldwide
                          </p>

                          <form onSubmit={handleOrder}>
                            <input
                              type="number"
                              min={0}
                              max={10}
                              // value={qty}
                              onChange={(e) => {
                                handleQty(e, index);
                              }}
                              className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 font-bold focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <button
                              type="submit"
                              className="block mt-5 w-full px-4 py-2 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform bg-[#FFC933] rounded-[14px] hover:bg-[#FFC933DD] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80"
                            >
                              Order now!
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerProtectedRoute>
  );
};

export default Restaurant;
