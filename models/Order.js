import mongoose, { model, models, Schema } from "mongoose";

const OrderSchema = new Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  foodItems: [
    {
      foodItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItem",
      },
      quantity: {
        type: Number,
      },
    },
  ],
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Delivered"],
    default: "Pending",
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  totalPrice: {
    type: String,
    required: true,
  },
});

export const Order = models?.Order || model("Order", OrderSchema);
