import { Hono } from "hono";
import { E } from "../src";
import z from "zod"


export const messageRouter=new Hono<E>();
messageRouter.post("/sendMessage",async(c)=>{
    const body =await c.req.json()
    const prisma=c.get("prisma")
    const userId=c.get("userId")||""         
    const messageSchema=z.object({
        recieverId:z.string(),
        content:z.string()

    })   
    const {success,error}=messageSchema.safeParse(body)
    if(!success){
     c.status(400)
     return c.json({
            error:error
     })
    }
    try{
        const message=await prisma.message.create({
            data:{
                senderId:userId,
                recieverId:body.recieverId,
                content:body.content
            }
        })
        return c.json({
            status:"success",
            message
        })
    }catch(e){
        c.status(400)
        return c.json({
            error:e
        })
    }

})
messageRouter.get("/getMessages",async(c)=>{
    const recieverId=c.req.query("recieverId")
    const prisma=c.get("prisma")
    const userId=c.get("userId")||""
     try{

     
   const message=await prisma.message.findMany({
        where:{
           senderId:userId,
           recieverId:recieverId
        },
        orderBy:{
            createdAt:"asc"
        }
    })
    return c.json({
        message
    })
}
catch(e){
    c.status(400)
    return c.json({
        error:e
    })
} 
})