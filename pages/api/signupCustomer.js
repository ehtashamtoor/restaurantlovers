import { mongooseConnect } from "@/lib/mongoose";
import { Customer } from "@/models/Customer";
import bcrypt from "bcrypt";

export default async function handle(req, res) {
  const { method } = req;
  console.log("method", method);

  await mongooseConnect();

  if (method === "GET") {
    res.json(await Category.find().populate("parent"));
  }

  if (method === "POST") {
    const { name, email, password, country, city, phone } = req.body;
    // console.log(req.body);

    // check if user is there with the email
    const CustomerHa = await Customer.findOne({ email });
    if (CustomerHa) {
      return res.send({ message: "Customer exists", success: false });
    }

    // hash the password and then save it to BD
    const saltRounds = 10;
    try {
      const hasedPass = await bcrypt.hash(password, saltRounds);
      //   console.log(hasedPass);
      const CustomerObj = await Customer.create({
        name,
        email,
        password: hasedPass,
        country,
        city,
        phone,
      });
      
      await CustomerObj.save();

      res.send({
        CustomerObj,
        message: "Cusomter Register success",
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
