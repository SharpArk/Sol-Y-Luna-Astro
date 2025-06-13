import jwt from "jsonwebtoken";
import { JWT_SECRET } from "astro:env/server";

interface JwtPayload {
  username?: string;
  [key: string]: any;
}

export function getSessionName(headers: Request["headers"]): string | null {
  const cookieString = headers.get("cookie");
  const match = cookieString?.match(/access_token=([^;]+)/);
  const token = match?.[1];

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded.name ?? null;
  } catch {
    return null;
  }
}
