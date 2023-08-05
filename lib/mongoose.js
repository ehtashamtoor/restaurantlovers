import mongoose from "mongoose";

export function mongooseConnect() {
  // 1 means connected
  if (mongoose.connection.readyState === 1) {
    // console.log("Mongoose already connected");
    return mongoose.connection.asPromise();
  } else {
    const uri = process.env.MONGODB_URI;
    // console.log("Mongoose connected");
    return mongoose.connect(uri);
  }
}
