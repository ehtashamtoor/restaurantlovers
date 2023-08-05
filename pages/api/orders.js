import { mongooseConnect } from "@/lib/mongoose";
import { FoodItem } from "@/models/FoodItem";
import { Order } from "@/models/Order";
import { getSession } from "next-auth/react";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();
  const session = await getSession({ req });
  // console.log(session);

  if (method === "GET") {
    const orders = await Order.find({ customerId: session?.user?.id }).populate(
      "foodItems.foodItem"
    );

    if (!orders) return res.send({ message: "cannot get all orders", success: false });

    return res.send({ orders, message: "", success: true });
  }

  if (method === "POST") {
    const { customerId, foodItems, totalPrice } = req.body;

    try {
      // let existingOrder = await Order.findOne({ customerId });

      if (false) {
        // If an order with the customerId exists, append the new food items
        // existingOrder.foodItems.push(...foodItems);
        // existingOrder.totalPrice += totalPrice;
        // await existingOrder.save();
        // return res.send({
        //   order: existingOrder,
        //   message: "Order updated",
        //   success: true,
        // });
      } else {
        // If no order exists, create a new order
        const newOrder = await Order.create(req.body);
        await newOrder.save();
        return res.send({
          order: newOrder,
          message: "Order created",
          success: true,
        });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ message: "Server Error", success: false });
    }
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    const deleted = await FoodItem.deleteOne({ _id });
    if (deleted) {
      res.json({ message: "FoodItem Deleted", success: true });
    } else {
      res.json({ success: false, message: "Unable to delete Fooditem" });
    }
  }
  if (method === "PUT") {
    const { name, _id, price, category, images, deliveryType } = req.body;

    // again we will have restaurant data

    const FoodDoc = await FoodItem.updateOne(
      { _id },
      {
        name,
        price,
        category,
        images,
        deliveryType,
      }
    );
    res.send({ FoodDoc, message: "Fooditem updated", success: true });
  }
}
