import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { AuthOptions, isAdmin } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth"; 
import { Restaurant } from "@/models/Restaurant";
import bcrypt from "bcrypt";

export default async function handle(req, res) {
  const { method } = req;
  // console.log("method", method);

  await mongooseConnect();

  if (method === "GET") {
    res.json(await Category.find().populate("parent"));
  }

  if (method === "POST") {

    const { name, email, password, country, city, image } = req.body;
    // console.log(image);

    // check if user is there with the email
    const restaurantExists = await Restaurant.findOne({ email });
    if (restaurantExists) {
      return res.send({ message: "restaurant exists", success: false });
    }

    // hash the password and then save it to BD
    const saltRounds = 10;
    // let hasedPass = "";
    try {
      const hasedPass = await bcrypt.hash(password, saltRounds);
      //   console.log(hasedPass);
      const RestaurantObj = await Restaurant.create({
        name,
        email,
        password: hasedPass,
        country,
        city,
        image,
      });
      await RestaurantObj.save();

      // console.log(RestaurantObj);

      res.send({
        RestaurantObj,
        message: "Restaurant Register success",
        success: true,
      });
    } catch (error) {
      res.send({ error: error.message, success: false });
    }
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
    const { name, parentCategory, _id, properties } = req.body;

    const categoryDoc = await Category.updateOne(
      { _id },
      {
        name,
        parent: parentCategory || undefined,
        properties,
      }
    );
    res.send({ categoryDoc, message: "Category updated", success: true });
  }
}
