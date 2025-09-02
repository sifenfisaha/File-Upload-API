import { Router } from "express";
import { loign, register } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../utils/schema";

const router = Router();

router.post("/register", validate({ body: registerSchema }), register);
router.post("/login", validate({ body: loginSchema }), loign);

export default router;
