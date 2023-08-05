import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { FoodItem } from "@/models/FoodItem";
import { Restaurant } from "@/models/Restaurant";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === "GET") {
    const { id } = req.query;
    // console.log("id", id);

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.send({
        message: "cannot get restaurant",
        success: false,
      });
    }

    async function fetchFoodItems(restaurant) {
      const categories = await Category.find({
        restaurant: restaurant._id,
      }).select("name _id");

      //   console.log(categories);

      for (const category of categories) {
        restaurant.categories.push(category);

        const food = await FoodItem.find({ category: category._id }).select(
          "name price deliveryType images _id"
        );
        // console.log(food);
        food.map((item) => {
          //   console.log(food.category);
          restaurant.foodItems.push({
            name: item.name,
            price: item.price,
            deliveryType: item.deliveryType,
            images: item.images,
            category: category._id,
            _id: item._id,
          });
        });
      }
    }

    async function fetchRestaurantItems() {
      try {
        await fetchFoodItems(restaurant);
        console.log("All food items fetched and updated.");
        // Now all food items are fetched and updated in allrestaurants
        console.log(restaurant);
        res.send({ success: true, restaurant, message: "" });
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    }

    fetchRestaurantItems();
  }
}
