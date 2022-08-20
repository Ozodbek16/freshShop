import { Schema, model } from "mongoose";

export default model(
  "admin",
  new Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  })
);
