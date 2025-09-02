import { Router } from "express";
import { loign, register } from "../controllers/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/login", loign);

export default router;
