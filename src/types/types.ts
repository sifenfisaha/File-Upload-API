import { ObjectId, Document } from "mongoose";

export interface Iuser extends Document {
  _id: ObjectId;
  name: String;
  password: string;
  email: string;
  role: "user" | "admin";
}

export interface IFile extends Document {
  filename: string;
  originalName: string;
  url: string;
  size: number;
  mimetype: string;
  uploadedBy: ObjectId;
  uploadedAt: Date;
}
