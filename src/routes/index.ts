import authRoutes from "./auth.route";
import fileRoutes from "./file.route";
import { Router } from "express";

const router = Router();

router.use("/auth", authRoutes);
router.use("/file", fileRoutes);

export default router;
