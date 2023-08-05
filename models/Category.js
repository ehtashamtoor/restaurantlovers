import mongoose, { model, models, Schema } from "mongoose";

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  foodItems: [
    {
      foodItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItem",
        // required: true,
      },
      quantity: {
        type: Number,
        // required: true,
      },
    },
  ],
});

export const Category = models?.Category || model("Category", CategorySchema);
