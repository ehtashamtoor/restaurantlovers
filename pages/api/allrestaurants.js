import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { FoodItem } from "@/models/FoodItem";
import { Restaurant } from "@/models/Restaurant";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === "GET") {
    const allrestaurants = await Restaurant.find();

    if (!allrestaurants) {
      return res.send({
        message: "cannot get all restaurants",
        success: false,
      });
    }

    async function fetchFoodItems(restaurant) {
      const categories = await Category.find({
        restaurant: restaurant._id,
      }).select("name _id");

      for (const category of categories) {
        restaurant.categories.push(category);

        const food = await FoodItem.find({ category: category._id }).select(
          "name price deliveryType"
        );

        food.map((item) => {
          //   console.log(item);
          restaurant.foodItems.push({
            name: item.name,
            price: item.price,
            deliveryType: item.deliveryType,
          });
        });
      }
    }

    async function fetchAllFoodItems() {
      try {
        await Promise.all(allrestaurants.map(fetchFoodItems));
        // console.log("All food items fetched and updated.");
        // Now all food items are fetched and updated in allrestaurants
        // console.log(allrestaurants);
        res.send({ success: true, allrestaurants, message: "" });
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    }

    fetchAllFoodItems();
  }
  if (method === "POST") {
    const { name, restaurant } = req.body;

    const catExists = await Category.findOne({ name });
    if (catExists) {
      return res.send({ message: "Category exists", success: false });
    }

    const categoryDoc = await Category.create({
      name,
      restaurant,
    });

    res.send({ categoryDoc, message: "Category created", success: true });
  }
  if (method === "DELETE") {
    const { _id } = req.query;
    const deleted = await Category.deleteOne({ _id });
    if (deleted) {
      res.json({ message: "Category Deleted", success: true });
    } else {
      res.json({ success: false, message: "Unable to delete category" });
    }
  }
  if (method === "PUT") {
    const { name, _id } = req.body;

    // again we will have restaurant data

    const categoryDoc = await Category.updateOne(
      { _id },
      {
        name,
      }
    );
    res.send({ categoryDoc, message: "Category updated", success: true });
  }
}
