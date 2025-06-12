import { JWT_SECRET } from "astro:env/server";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

export function validateCookie(header: Headers) {
  const cookie = header.get("cookie");
  const access_token = parse(cookie || "").access_token;

  if (!access_token) {
    return { Loged: { condition: false, name: null } };
  }

  try {
    const user: any = jwt.verify(access_token, JWT_SECRET);
    return { Loged: { condition: true, name: user.username, role: user.role } };
  } catch (error) {
    console.error("Token validation error:", error);
    return { Loged: { condition: false, name: null, role: null } };
  }
}
