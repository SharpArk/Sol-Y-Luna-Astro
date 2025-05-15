import jwt from "jsonwebtoken";
import { JWT_SECRET } from "astro:env/server";

export function validateToken(cookies: Request["headers"]) {
  const cookieString = cookies.get("cookies");
  const data = cookieString?.match(/acces_token=([^;]+)/);
  const token = data?.[1];

  if (!token) {
    throw new Error("No Sesion");
  }
  const user: any = jwt.verify(token, JWT_SECRET);
  return user;
}
