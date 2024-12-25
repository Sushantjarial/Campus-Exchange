import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";
import { E } from "../src";
export const authMiddleware = createMiddleware<E>(async (c, next) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(400);
    return c.json({
      error: "unauthorized",
    });
  }
  const token = jwt.split(" ")[1];
  try {
    const user = await verify(token, c.env.SECRET);
    const userId = String(user.id);
    c.set("userId", userId);
    c.set("categories",["Stationery","Electronics","Furniture","Others","Books"])
    await next();
  } catch (error) {
    
    c.status(401);
    return c.json({ error: "invalid token" });
  }
});