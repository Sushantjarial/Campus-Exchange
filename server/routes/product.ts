import { Hono } from "hono";
import { E } from "../src";
import z, {  string } from "zod"

export const productRouter=new Hono<E>();



productRouter.post("/",async(c)=>{
 

    const productSchema = z.object({
        name: string(),
        description: string(),
        category: string(),
        contactInformation: string(),
        price:string(),
        images:z.array(z.string())
        
    })
    const prisma=c.get("prisma")
    const userId=c.get("userId")||""
    const body=await c.req.json();
    const {success,error}=productSchema.safeParse(body)
    if(!success){
        c.status(400)
        return  c.json({
            error:error
        })
    }
 try{
 
    const product= await prisma.product.create({
        data: {
            userId,
            ...body,
            images: {
                create: body.images.map((link: string) => ({
                    link,  // Ensure that the image URLs are passed here
                }))
            }
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

productRouter.get("/myListings", async(c)=>{
    const prisma=c.get("prisma")
    const userId=c.get("userId")
    try{
    const products=await prisma.product.findMany({
      include:{images:true},
        where:{
            userId

        }
    })
    return c.json({
        products
    })
    }
    catch(e){
            c.status(400)
            return c.json({
                error:e
            })
    }
})

productRouter.post("/delete",async(c)=>{
    const prisma=c.get("prisma")
    const userId=c.get("userId")
    const productId=c.req.query("productId")
    try{
   await prisma.product.delete({
        where:{
            id:productId,
            userId
        }
    })
    
    return c.json({
        message:"listing successfully deleted"
    })

}
catch(e){
    return c.json({
        error:e
    })
}
})

productRouter.get("/oneProduct",async(c)=>{
    const id=c.req.query("productId")
    const prisma=c.get("prisma")
    try{
        const product=await prisma.product.findUnique({
            include:{images:true,user:true},
            where:{
                id
            }
        })
        c.status(200)
        return c.json({
            product
        })
    }
    catch{
        c.status(400)
        return c.json({
            error:"cannot connect to the database"
        })
    }
})


