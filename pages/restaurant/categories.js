import PageHeader from "@/components/PageHeader";
import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";
import { toast } from "react-toastify";

const CatgoryPage = ({ swal }) => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  // const [Message, setMessage] = useState("");
  const [isError, setisError] = useState(false);
  const [editedCategory, setEditedCategory] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();

  const getCategories = async () => {
    const resp = await axios.get("/api/categories");
    // console.log(resp.data);
    if (resp.data) {
      setCategories(resp.data);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  const saveCategory = async (e) => {
    e.preventDefault();

    // we will have restaurant from the session to send it to user
    const data = {
      name,
      restaurant: session.user.id,
    };

    if (editedCategory) {
      data._id = editedCategory._id;
      const resp = await axios.put("/api/categories", data);
      // console.log(resp.data.success);
      if (resp.data.success) {
        toast.success(resp.data.message)
        setName("");
        setEditedCategory(null);
        getCategories();
      }
    } else {
      const resp = await axios.post("/api/categories", data);
      if (resp.data.success) {
        // setMessage(resp.data.message);
        toast.success(resp.data.message);
        setisError(false);
        setName("");
      } else {
        // setMessage(resp.data.message);
        toast.error(resp.data.message);
        setisError(true);
      }
      getCategories();
    }
  };

  const editCategory = (category) => {
    // console.log(category);
    setEditedCategory(category);
    setName(category.name);
  };
  function deleteCategory(category) {
    swal
      .fire({
        title: "This action is permanent?",
        text: `Do you want to delete ${category.name}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete!",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = category;
          const resp = await axios.delete("/api/categories?_id=" + _id);
          if (resp.data.success) {
            // setMessage(resp.data.message);
            toast.success(resp.data.message);
            setisError(false);
          } else {
            // setMessage(resp.data.message);
            toast.error(resp.data.message);
            setisError(true);
          }
          getCategories();
        }
      });
  }

  useEffect(() => {
    if (!session?.user?.role === "restaurant") {
      router.push("/auth/signin/restaurant");
    }
  }, [session, router]);

  return (
    <ProtectedRoute>
      <div className="px-8 mt-5">
        <PageHeader heading="Categories" />
        {/* <div>
          <h1
            className={`text-2xl ${
              isError ? "text-red-500" : "text-green-500"
            }`}
          >
            {Message}
          </h1>
        </div> */}
        <label>
          {" "}
          {editedCategory
            ? `Edit Category: ${editedCategory.name}`
            : "New Category"}
        </label>
        <form className="flex gap-3 flex-col" onSubmit={saveCategory}>
          <div className="flex gap-1">
            <input
              type="text"
              placeholder="Category name"
              className="font-normal mb-0"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex gap-1">
            {editedCategory && (
              <button
                type="button"
                onClick={() => {
                  setEditedCategory(null);
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

        {!editedCategory && (
          <table className="basic mt-2 ">
            <thead>
              <tr>
                <td>Category Name</td>
                <td>Actions</td>
              </tr>
            </thead>

            <tbody>
              {categories.length > 0 &&
                categories.map((category) => {
                  return (
                    <tr key={category._id}>
                      <td>{category.name}</td>
                      <td>
                        <button
                          onClick={() => editCategory(category)}
                          className="btn-default hover:bg-blue-500 mr-1 mt-1"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCategory(category)}
                          className="btn-default hover:bg-blue-500 mt-1"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default withSwal(({ swal }, ref) => <CatgoryPage swal={swal} />);
