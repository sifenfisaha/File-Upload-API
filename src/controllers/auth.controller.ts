import e, { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    await AuthService.register(name, email, password);
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const loign = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const data = await AuthService.login(email, password);
    res.json({
      success: true,
      data,
      message: "successfully logged in",
    });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
