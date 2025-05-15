import jwt from "jsonwebtoken";
import { JWT_SECRET } from "astro:env/server";

export function validateAdminToken(cookies: Request["headers"]) {
  const cookieString = cookies.get("cookie");
  const match = cookieString?.match(/access_token=([^;]+)/);
  const token = match?.[1];

  if (!token) throw new Error("No token");

  const user: any = jwt.verify(token, JWT_SECRET);

  if (user.role !== "admin") {
    throw new Error("Acces denied");
  }

  return user;
}
