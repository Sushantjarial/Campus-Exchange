import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import userRouter from "../routes/user";
import blogRouter from '../routes/product';
import { prismaMiddleware } from '../middlewares/prismaClient';
import { authMiddleware } from '../middlewares/auth';
import { cors } from 'hono/cors';

const prismaExtended = new PrismaClient().$extends(withAccelerate());
type ExtendedPrismaClient = typeof prismaExtended;
export type Bindings={
	DATABASE_URL: string,
	SECRET:string
}

export type Variables={
	prisma:ExtendedPrismaClient;
	userId:string,
}

const app = new Hono<{
	Bindings: Bindings,
	Variables: Variables
}>();
app.use("/*",cors());
app.use("*",prismaMiddleware);
app.use("api/v1/blog/*",authMiddleware);


app.route('/api/v1/user',userRouter);
app.route('/api/v1/blog',blogRouter);

export default app;