import { ObjectId, Document } from "mongoose";

export interface Iuser extends Document {
  _id: ObjectId;
  name: String;
  password: string;
  email: string;
  role: "user" | "admin";
}
