import { useState} from "react"
import {InputBox} from "../components/inputBox.jsx"
import { BottomWarning } from "../components/BottomWarning.jsx"
import { useNavigate } from "react-router-dom";
import { SignButton } from "../components/signButton.jsx";

export  function Signup(){
    const navigate=useNavigate();
    const [firstname,setFirstname]=useState("");
    const [lastname,setLastname]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");


    return(
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 ...   h-screen flex justify-center">
               <div className="flex  flex-col justify-center   ">
                 <div className="rounded-lg bg-white w-80 text-center p-2  px-4 border-2 border-transparent hover:border-black flex flex-col gap-2  ">
                    <h1 className="font-bold text-3xl  ">Sign up </h1>
                        
                        <InputBox onChange ={(e)=>setFirstname(e.target.value)} label={"First Name"} placeholder="jagdeesh" />
                        <InputBox onChange ={(e)=>setLastname(e.target.value)}  label={"Last Name"} placeholder="badmosh" />
                        <InputBox onChange ={(e)=>setEmail(e.target.value)}  label={"Email"} placeholder="omjaijagdeesh123@gmail.com"/>
                     <InputBox onChange ={(e)=>setPassword(e.target.value)}  label={"Password"} placeholder="password >8 characters"/>
                       <SignButton text="Sign up"></SignButton>
                        <BottomWarning text="Already have an account?" buttonText="Sign in" to="/signin"></BottomWarning>                     
                        
                    
                    
                        
                    </div>  
                    
                </div>         
                
        </div>
    )
}









