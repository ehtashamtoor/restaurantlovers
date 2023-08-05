import { mongooseConnect } from "@/lib/mongoose";
import { FoodItem } from "@/models/FoodItem";
import { Order } from "@/models/Order";
import { getSession } from "next-auth/react";

export default async function handle(req, res) {
  const { method } = req;
  //   console.log(method);

  await mongooseConnect();
  const session = await getSession({ req });
  // console.log(session);

  if (method === "GET") {
    const { status } = req.query;
    // console.log(status);
    let orders = [];
    if (status) {
      orders = await Order.find({
        restaurant: session?.user?.id,
        status,
      }).populate("foodItems.foodItem");
    } else {
      orders = await Order.find({
        restaurant: session?.user?.id,
      }).populate("foodItems.foodItem");
    }

    if (!orders) res.send({ message: "cannot get all orders", success: false });

    res.send({ orders, message: "", success: true });
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
  if (method === "PATCH") {
    const { _id, status } = req.body;

    // again we will have restaurant data

    const updatedOrderDoc = await Order.findByIdAndUpdate(
      { _id },
      { status },
      { new: true }
    );

    if (!updatedOrderDoc) {
      return res.send({ message: "Order not found", success: false });
    }
    res.send({ updatedOrderDoc, message: "Order updated", success: true });
  }
}
