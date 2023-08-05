import PageHeader from "@/components/PageHeader";
import ProtectedRoute from "@/components/ProtectedRoute";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { withSwal } from "react-sweetalert2";

const FoodItems = ({ swal }) => {
  const [Foods, setFoods] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [deliveryType, setDeliveryType] = useState("");
  const [Message, setMessage] = useState("");
  const [isError, setisError] = useState(false);
  const [editedFood, setEditedFood] = useState(null);
  let [images, setImages] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [imageInfo, setImageInfo] = useState({});
  const { data: session } = useSession();
  const router = useRouter();

  const getCategories = async () => {
    const resp = await axios.get("/api/categories");
    // console.log(resp.data);
    if (resp.data) {
      setCategories(resp.data);
    }
  };

  const saveFood = async (e) => {
    e.preventDefault();
    // console.log(data.deliveryType);

    // we will have restaurant from the session to send it to user
    const data = {
      name,
      price,
      category,
      images,
      deliveryType,
      restaurant: session.user.id,
    };
    // console.log(data);

    if (editedFood) {
      data._id = editedFood._id;
      const resp = await axios.put("/api/fooditems", data);
      if (resp.data.success) {
        setMessage(resp.data.message);
        setisError(false);
        // setName("");
        setEditedFood(null);
        getFoods();
      } else {
        setMessage(resp.data.message);
        setisError(true);
      }
    } else {
      const resp = await axios.post("/api/fooditems", data);
      if (resp.data.success) {
        setMessage(resp.data.message);
        setisError(false);
        getFoods();
        // setName("");
      } else {
        setMessage(resp.data.message);
        setisError(true);
      }
    }
  };
  const getFoods = async () => {
    const resp = await axios.get("/api/fooditems");
    // console.log(resp.data);
    if (resp.data) {
      setFoods(resp.data);
      // console.log(resp.data);
    }
  };
  useEffect(() => {
    getFoods();
    getCategories();
  }, []);

  const uploadFiles = async (e) => {
    setIsLoading(true);
    let data = new FormData();
    data.append("file", e.target?.files[0]);

    data.append("upload_preset", "foodimages");

    try {
      const resp = await axios.post(process.env.NEXT_PUBLIC_CLOUD_LINK, data);

      if (resp.data) {
        imageInfo = {
          public_id: resp.data.public_id,
          url: resp.data.secure_url,
        };
        setImageInfo(imageInfo);

        setImages([...images, imageInfo]);
        setIsLoading(false);

        // console.log(images);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const editFood = (food) => {
    setEditedFood(food);
    setName(food.name);
    setCategory(food.category._id);
    setPrice(food.price);
    setImages(food.images);
    setDeliveryType(food.deliveryType);
  };
  const deleteFood = (fooditem) => {
    swal
      .fire({
        title: "This action is permanent?",
        text: `Do you want to delete ${fooditem.name}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete!",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = fooditem;
          const resp = await axios.delete("/api/fooditems?_id=" + _id);
          if (resp.data.success) {
            setMessage(resp.data.message);
            setisError(false);
          } else {
            setMessage(resp.data.message);
            setisError(true);
          }
          getFoods();
        }
      });
  };

  useEffect(() => {
    if (!session?.user?.role === "restaurant") {
      router.push("/auth/signin/restaurant");
    }
  }, [session, router]);
  return (
    <ProtectedRoute>
      <div className="md:px-8 px-1 mt-5">
        <PageHeader heading="Food Items" />
        <div>
          <h1
            className={`text-2xl ${
              isError ? "text-red-500" : "text-green-500"
            }`}
          >
            {Message}
          </h1>
        </div>
        <label>
          {" "}
          {editedFood ? `Edit Food Item: ${editedFood.name}` : "New Food Item"}
        </label>
        <form className="flex gap-3 flex-col mt-5" onSubmit={saveFood}>
          <div className="flex flex-col gap-1">
            {/* Food name */}
            <label>
              Enter Food Name
              <input
                type="text"
                placeholder="Food name"
                className="font-normal mb-0"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            {/* Food price */}
            <label>
              Enter Food Price
              <input
                type="text"
                placeholder="Food price"
                className="font-normal mb-0"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>

            {/* Category */}
            <label>Category</label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">No food category</option>
              {categories.length > 0 &&
                categories.map((category) => {
                  return (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  );
                })}
            </select>

            {/* food images */}
            <label>Food Images</label>
            <div className="mb-2">
              <label className="w-24 h-12 hover:text-white flex items-center cursor-pointer justify-center gap-1 font-normal text-white bg-blue-500">
                upload
                <input type="file" className="hidden" onChange={uploadFiles} />
              </label>
              <div className="flex gap-2 mt-2">
                {images.length > 0 &&
                  images.map(({ url, public_id }, index) => {
                    return (
                      <div
                        key={index}
                        className="h-auto md:w-28 w-24 bg-white shadow-sm rounded-lg shadow-gray-800"
                      >
                        <img
                          src={url}
                          alt="image"
                          className="rounded-lg h-full w-full"
                        />
                      </div>
                    );
                  })}
                {isLoading && <Spinner />}
              </div>
            </div>

            {/* Delivery type */}
            <label>
              Choose deilvery type
              <select
                required
                value={deliveryType}
                className="font-normal"
                onChange={(e) => setDeliveryType(e.target.value)}
              >
                <option value="">Choose delivery type</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </label>
          </div>

          <div className="flex gap-1">
            {editedFood && (
              <button
                type="button"
                onClick={() => {
                  setEditedFood(null);
                  setName("");
                }}
                className="btn-default"
              >
                Cancel
              </button>
            )}
            <button
              className="btn-primary py-1 h-[2.5rem] self-start"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>

        {!editedFood && (
          // <div className="">
          <table className="mt-2 w-full">
            <thead>
              <tr className="text-left border-b-2">
                <th className="  py-2"> Name</th>
                <th className="  py-2"> Price</th>
                <th className="  py-2"> Category</th>
                <th className="hidden md:block  py-2"> Delivery type</th>
                <th className="  py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Foods.length > 0 &&
                Foods.map((food) => {
                  return (
                    <tr key={food._id}>
                      <td className="  py-2">{food.name}</td>
                      <td className="  py-2">{food.price}</td>
                      <td className="  py-2">{food.category?.name}</td>
                      <td className="hidden md:block  py-2">
                        {food.deliveryType}
                      </td>
                      <td className="  py-2">
                        <button
                          onClick={() => editFood(food)}
                          className="btn-default text-sm bg-gray-600 px-2 text-white  hover:bg-blue-500 mr-1 mt-1"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteFood(food)}
                          className="btn-default text-sm bg-gray-600 px-2 text-white  hover:bg-blue-500 mt-1"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          // </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default withSwal(({ swal }, ref) => <FoodItems swal={swal} />);
