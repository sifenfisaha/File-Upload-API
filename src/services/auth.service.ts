import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { TokenService } from "./token.service";

export class AuthService {
  static async register(name: string, email: string, password: string) {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exsist");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword, name });

    await user.save();
  }
  static async login(email: string, password: string) {
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid cridentials");

    const token = TokenService.generateToken({
      userId: user._id.toString(),
      userRole: user.role,
    });

    const safeUser = {
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return { token, user: safeUser };
  }
}
