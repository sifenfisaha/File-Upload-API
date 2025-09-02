import mongoose, { Model } from "mongoose";
import { Iuser } from "../types/types";

const userSchema = new mongoose.Schema<Iuser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      emum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User: Model<Iuser> = mongoose.model<Iuser>("User", userSchema);

export default User;
