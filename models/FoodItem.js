import mongoose, { model, Schema, models } from "mongoose";

const FoodItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  deliveryType: {
    type: String,
    default: "free",
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    // required: true,
  },
});

export const FoodItem = models.FoodItem || model("FoodItem", FoodItemSchema);
