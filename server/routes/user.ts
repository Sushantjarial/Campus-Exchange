import { Hono } from "hono";
import { E } from "../src";
import { signinInput, signupInput } from "@sushantjarial/blog-common";
import { sign } from "hono/jwt";
export const userRouter=new Hono<E>();

userRouter.post("/signup",async(c)=>{
    const body=await c.req.json();
    const prisma=c.get("prisma")
    
    const {success,error}=signupInput.safeParse(body);
    if(!success){
        return c.json({
            error:error.issues
        })
    }

    try{
    const user= await prisma.user.create( {
        data:{
            firstName:body.firstName,
            lastName:body.lastName,
            email:body.email,
            password:body.password
        }
    })
    const id=user.id
    const token = sign({
        id
    },c.env.SECRET)
    return c.json({
        token
    })


    }
    catch(e){
        c.status(403)
        return c.json({
            error:"error while signing up"
        })
    }


})

userRouter.post("/signin",async(c)=>{
    const body=await c.req.json()
    const prisma=c.get("prisma")
    const {success,error}=signinInput.safeParse("body")
    if(!success){
        c.status(403)
        return c.json({
            error:error.issues
        })
    }
    try{
    const user=await prisma.user.findUnique({
        where:{
            email:body.email,
            password:body.password
        }
    })
    if(!user){
         c.status(403)
        return c.json({
            error:"incorrect login credentials"
        })
    }
    const token=sign({
        id:user.id
    },c.env.SECRET)

    return c.json({
        token
    })

    }
    catch(e){
        return c.json({
            error:"error while signing up"
        })
    }
})