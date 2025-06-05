import jwt from "jsonwebtoken";
import { JWT_SECRET } from "astro:env/server";

export function isSessionActive(headers: Request["headers"]): boolean {
  const cookieString = headers.get("cookie");
  const match = cookieString?.match(/access_token=([^;]+)/);
  const token = match?.[1];

  if (!token) return false;

  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}
