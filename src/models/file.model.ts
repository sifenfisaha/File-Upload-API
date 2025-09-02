import mongoose, { Model, Schema } from "mongoose";
import { IFile } from "../types/types";

const fileSchema = new mongoose.Schema<IFile>(
  {
    filename: { type: String, required: true, trim: true },
    originalName: { type: String, required: true, trim: true },
    url: { type: String, required: true },
    size: { type: Number, required: true },
    mimetype: { type: String, required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const File: Model<IFile> = mongoose.model<IFile>("File", fileSchema);

export default File;
