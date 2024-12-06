import { Hono } from "hono";
import { E } from "../src";
import errorMap from "zod/locales/en.js";

export const productRouter=new Hono<E>();

productRouter.get("/",async(c)=>{
    const prisma=c.get("prisma");
    const category=c.req.query("category")
    const categories=c.get("categories")
    if(category&&!categories.includes("category")){
        c.status(400)
        return c.json({
            error: "invalid categories provided"
        })
    }
    try{
        
        const products=prisma.product.findMany({
            select:{
            
            },
            where: category ? { category } : {}
        })
    }
    catch(e){
        c.status(500)
        return c.json({
            error:"error while fetching products"
        })
    }
})
