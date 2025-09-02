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
import { validate } from "../middlewares/validate.middleware";
import { FileIdParamSchema } from "../utils/schema";

const router = Router();

router.post("/upload", isAuthenticated, upload.single("file"), uploadFile);
router.post(
  "/multiple-upload",
  isAuthenticated,
  upload.array("files", 5),
  uploadMultipleFiles
);
router.get("/me", isAuthenticated, getMyFile);
router.get(
  "/:id/download",
  validate({ params: FileIdParamSchema }),
  isAuthenticated,
  downloadFile
);
router.get(
  "/:id",
  validate({ params: FileIdParamSchema }),
  isAuthenticated,
  getFileMetadata
);
router.delete(
  "/:id",
  validate({ params: FileIdParamSchema }),
  isAuthenticated,
  deleteFile
);

export default router;
