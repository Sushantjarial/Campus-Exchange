import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createMiddleware } from "hono/factory";
import { Bindings } from "../src/index";
import { Variables } from "../src/index";
 export const prismaMiddleware = createMiddleware<{Bindings:Bindings,Variables:Variables}>( async (c, next) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    c.set('prisma', prisma);
    await next();
   
})