import mongoose, { model, models, Schema } from "mongoose";

const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  orders: [
    {
      restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        // required: true,
      },
      items: [
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
      status: {
        type: String,
        enum: ["pending", "accepted", "delivered"],
        default: "pending",
      },
      orderDate: {
        type: Date,
        default: () => Date.now(),
      },
    },
  ],
  role: {
    type: String,
    default: "Customer",
  },
});

export const Customer = models.Customer || model("Customer", CustomerSchema);
