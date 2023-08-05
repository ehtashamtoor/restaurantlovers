import mongoose, { model, models, Schema } from "mongoose";

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
  },
  city: {
    type: String,
  },
  image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  foodItems: [
    {
      name: {
        type: String,
      },
      price: {
        type: String,
      },
      deliveryType: {
        type: String,
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
      category: {
        type: String,
      },
    },
  ],
  categories: {
    type: [
      {
        name: String,
      },
    ],
  },
  role: {
    type: String,
    default: "restaurant",
  },
});

export const Restaurant =
  models.Restaurant || model("Restaurant", restaurantSchema);
