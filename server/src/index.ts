
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from "hono";
import { cors } from "hono/cors";
import { prismaMiddleware } from "../middlewares/prismaMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";
import { userRouter } from "../routes/user";
import { productRouter } from "../routes/product";

const prismaExtended = new PrismaClient().$extends(withAccelerate());
type ExtendedPrismaClient = typeof prismaExtended;


interface Bindings{
    DATABASE_URL:string,
    SECRET:string,
    
}
interface Variables{
  prisma:ExtendedPrismaClient,
  userId:string
 categories :string[]
}
export interface E {
    Bindings:Bindings
    Variables:Variables
    
}

 const app=new Hono<E>();

app.use("/*",cors());
app.use("/*",prismaMiddleware)
app.use("/api/v1/products/*",authMiddleware)

app.route("api/v1/user",userRouter)
app.route("api/v1/products",productRouter)


export default app;
