import jwt from "jsonwebtoken";
import { env } from "../config/env";

interface TokenPayload {
  userId: string;
  userRole: "admin" | "user";
}

export class TokenService {
  static generateToken({ userId, userRole }: TokenPayload) {
    return jwt.sign({ userId, userRole }, env.JWT_SECRET, { expiresIn: "1h" });
  }
  static verifyToken<T extends Object = TokenPayload>(token: string): T | null {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    return decoded as T;
  }
}
