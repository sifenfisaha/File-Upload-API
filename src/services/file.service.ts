import File from "../models/file.model";
import { IFile } from "../types/types";

export class FileService {
  static async saveFile(data: Partial<IFile>) {
    const file = new File(data);
    return await file.save();
  }

  static async getFile(id: string, userId: string) {
    return await File.findOne({ _id: id, uploadedBy: userId });
  }

  static async getMyFile(userId: string) {
    return await File.find({ uploadedBy: userId });
  }

  static async deleteFile(id: string, userId?: string) {
    return await File.findOneAndDelete({ _id: id, uploadedBy: userId });
  }

  static async listUserFiles(userId: string) {
    return await File.find({ uploadedBy: userId });
  }
}
