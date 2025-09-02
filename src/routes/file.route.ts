import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";
import {
  deleteFile,
  downloadFile,
  getFileMetadata,
  getMyFile,
  uploadFile,
  uploadMultipleFiles,
} from "../controllers/file.controller";

const router = Router();

router.post("/upload", isAuthenticated, upload.single("file"), uploadFile);
router.post(
  "/multiple-upload",
  isAuthenticated,
  upload.array("files", 5),
  uploadMultipleFiles
);
router.get("/me", isAuthenticated, getMyFile);
router.get("/:id/download", isAuthenticated, downloadFile);
router.get("/:id", isAuthenticated, getFileMetadata);
router.delete("/:id", isAuthenticated, deleteFile);

export default router;
