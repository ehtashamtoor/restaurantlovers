import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  const session = await getSession({ req });
  // console.log(session);

  if (method === "GET") {
    res.json(await Category.find({ restaurant: session?.user?.id }));
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
    if (!categoryDoc) {
      return res.send({ message: "Error updating", success: false });
    }
    res.send({ categoryDoc, message: "Category updated", success: true });
  }
}
