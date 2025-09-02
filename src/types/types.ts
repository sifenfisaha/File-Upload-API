import { Document, Types } from "mongoose";

export interface Iuser extends Document {
  _id: Types.ObjectId;
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
  uploadedBy: Types.ObjectId;
  uploadedAt: Date;
}
