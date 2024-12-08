import { Hono } from "hono";
import { E } from "../src";
import z, { string } from "zod"

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
        return c.json({
            products
        })
    }
    catch(e){
        c.status(500)
        return c.json({
            error:"error while fetching products"
        })
    }
})

productRouter.post("/",async(c)=>{

    const productSchema=z.object({
        name : string().min(1,"name of the product is required").max(100,"name too long"),
        description:string().max(1000,"description too long"),
        category:string().max(100),
        contactInformation:string().max(2000,"contact information too long"),
        images: z
        .array(z.string())
        .optional(),

    })
    const prisma=c.get("prisma")
    const userId=c.get("userId")||""
    const body=await c.req.json();
    const {success,error}=productSchema.safeParse(body)
    if(!success){
        c.status(400)
        return  c.json({
            error:error.issues
        })
    }
 try{
    console.log(userId)
    console.log(body)
    const product= await prisma.product.create({
        data:{
            userId,
            ...body,
            images: body.images ? {
               create: body.images.map((link:string)=>({link}))
            } : undefined
        },


        include: { images: true },
    })
    return c.json({
        product
    })

 }
 catch(e){
    c.status(400)
    return c.json({
        error: e
    })
 }


})


