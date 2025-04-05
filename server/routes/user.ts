import { Hono } from "hono";
import { E } from "../src";
import { signinInput, signupInput } from "@sushantjarial/blog-common";
import { sign } from "hono/jwt";
import { use } from "hono/jsx";
export const userRouter=new Hono<E>();

userRouter.post("/signup",async(c)=>{
    const body=await c.req.json();
    const prisma=c.get("prisma")
    
    const {success,error}=signupInput.safeParse(body);
    if(!success){
       c.status(401)
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
    const token = await sign({
        id
    },c.env.SECRET)
    return c.json({
        token
    })


    }
    catch(e){
        c.status(403)
        return c.json({
            error:e
        })
    }


})

userRouter.post("/signin",async(c)=>{
    const body=await c.req.json()
    const prisma=c.get("prisma")
    const {success,error}=signinInput.safeParse(body)
    if(!success){
        c.status(403)
        return c.json({
            error:error
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
    const token=await sign({
        id:user.id
    },c.env.SECRET)

    return c.json({
        token
    })

    }
    catch(e){
        return c.json({
            error: e
        })
    }
})

userRouter.get("/home",async(c)=>{
    
   
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
        
        const products=await prisma.product.findMany({
            select:
            {
                id: true,
                name: true,
                description: true,
                category: true,
                contactInformation: true,
                price:true,
                images: true,
            },
            where: category ? { category, hidden: false } : { hidden: false },
        })
        return c.json({
            products
        })
    }
    catch(e){
        c.status(500)
        console.log(e)
        return c.json({
            error:"error while fetching products"
            
        })
    }
})

userRouter.get('/userInformation',async(c)=>{
    const userId=c.get("userId")
    const prisma=c.get("prisma")
    

    try{
        const user= await prisma.user.findUnique({
 select: {
    firstName: true,
    lastName: true,
    email: true,
    password:true
 },
 where: {
                id:userId
            }
        })

        return c.json({
            user
        
        })
    }
    catch(e){
        return c.json({
            error:e
        })
    }
})

userRouter.put("/updateUserInformation",async(c)=>{

    const prisma=c.get("prisma")
    const userId=c.get("userId")
    const body= await c.req.json()

    try{

        const {success,error}=signupInput.safeParse(body);
        
        if(!success){
            c.status(403)
            return c.json({
                error:error.issues
            })
        }

        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data:body
        })

        if (!user) {
            c.status(404)
            return c.json({
                error: "User not found"
            })
        }
        
        return c.json({
            message:"updated user information"
        })

    }
    catch(e){
        c.status(400)
        return c.json({
            error:e
        })
    }
})