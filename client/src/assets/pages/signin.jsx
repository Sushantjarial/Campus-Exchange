import { InputBox } from "../components/inputBox"
import { BottomWarning } from "../components/BottomWarning"
import {useState} from "react"
import { SignButton } from "../components/signButton";

export function Signin(){
    const [email, setEmail] = useState("");
    const [password,setPassword]=useState("");
    return(
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 ... h-screen flex justify-center"  >
            <div className="flex justify-center flex-col" >
        <div className="flex flex-col bg-white border-transparent border-2 hover:border-black p-2 w-72 h-max text-center rounded-lg px-4">
            <div>
                <h1 className="font-bold text-bl text-center text-3xl">Sign in</h1>
                <InputBox onChange={(e)=>{
                    setEmail(e.target.value);
                }}  label="Email" placeholder="Enter your email"/>
                <InputBox onChange={(e)=>{
                    setPassword(e.target.value);
                }}    label="Password" placeholder="Enter your password"/>
                 <SignButton text="Sign in"></SignButton>
                <BottomWarning text="Don't have an account?" buttonText="Sign up" to="/signup"/>

            
            </div>
            </div>

       

        </div>
        </div>
    )
}