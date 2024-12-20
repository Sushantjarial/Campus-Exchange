
export   function SignButton({text, onClick}:{text:string,onClick:(e:any)=>any}){
    return(
        <button onClick={onClick} className="bg-blue-500 rounded-lg mt-4 p-1 w-full  hover:bg-blue-400">{text}</button>
    )
}