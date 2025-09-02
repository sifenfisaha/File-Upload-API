import { Response, Request } from "express";
import { FileService } from "../services/file.service";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";

export const uploadFile = async (req: Request, res: Response) => {
  if (!req.file)
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  const url = `/upload/${req.file.filename}`;

  const file = await FileService.saveFile({
    filename: req.file.filename,
    originalName: req.file.originalname,
    url,
    size: req.file.size,
    mimetype: req.file.mimetype,
    uploadedBy: new mongoose.Types.ObjectId(req.userId!),
    uploadedAt: new Date(Date.now()),
  });
  res
    .status(201)
    .json({ success: true, file, message: "File uploded successfully" });
};

export const getMyFile = async (req: Request, res: Response) => {
  try {
    const files = await FileService.getMyFile(req.userId!);
    res.status(200).json({
      success: true,
      files,
    });
  } catch (error) {}
};

export const uploadMultipleFiles = async (req: Request, res: Response) => {
  if (!req.files || !(req.files instanceof Array)) {
    return res
      .status(400)
      .json({ success: false, message: "No files uploaded" });
  }
  try {
    const files = await Promise.all(
      req.files.map((f: Express.Multer.File) => {
        return FileService.saveFile({
          filename: f.filename,
          originalName: f.originalname,
          url: `/upload/${f.filename}`,
          size: f.size,
          mimetype: f.mimetype,
          uploadedBy: new mongoose.Types.ObjectId(req.userId!),
          uploadedAt: new Date(Date.now()),
        });
      })
    );

    res
      .status(201)
      .json({ success: true, files, message: "Files uploded successfully" });
  } catch (error) {
    console.error("File upload error:", error);
    res.status(500).json({ success: false, message: "File upload failed" });
  }
};

export const getFileMetadata = async (req: Request, res: Response) => {
  const file = await FileService.getFile(req.params.id, req.userId!);
  if (!file)
    return res.status(404).json({ success: false, message: "File not found" });
  res.status(200).json({ success: true, file });
};

export const downloadFile = async (req: Request, res: Response) => {
  const file = await FileService.getFile(req.params.id, req.userId!);
  if (!file)
    return res.status(404).json({ success: false, message: "File not found" });
  const filePath = path.join(process.cwd(), file.url);
  res.download(filePath, file.filename);
};

export const deleteFile = async (req: Request, res: Response) => {
  try {
    const file = await FileService.deleteFile(req.params.id, req.userId);

    if (!file) {
      return res
        .status(404)
        .json({ success: false, message: "File not found or not yours" });
    }

    if (file.url) {
      const filePath = path.join(process.cwd(), file.url);
      try {
        if (fs.existsSync(filePath)) {
          await fs.promises.unlink(filePath);
        }
      } catch (fsError) {
        console.error("Failed to delete file from storage:", fsError);
      }
    }

    res.json({
      success: true,
      message: "File deleted successfully",
      data: { id: file._id, filename: file.filename },
    });
  } catch (err) {
    console.error("Error deleting file:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
