import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../config";
import axios from "axios";
import { div } from "framer-motion/client";
import NavBarHome from "../components/nav-bar_home";

export default function MessageSeller() {
    const parms = new URLSearchParams(window.location.search);
    const recieverId = parms.get("recieverId");
    type Message = {
        recieverId: string;
        content: string;
        id: number;
        senderId: string;
        createdAt: Date;
    };
    const bottomRef = useRef<HTMLDivElement>(null);
    const scrollIntoView=()=>{ bottomRef.current?.scrollIntoView({
        behavior:"smooth"
    })

}


    const navigate = useNavigate();
    const [messages, setMessages] = useState<Message[]>([]);
    const contentref = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        if(messages.length>0){
    setTimeout(scrollIntoView,100)
        }
    },[messages])

    const sendMessage = async () => {
        const token = localStorage.getItem("token");
        if (!contentref.current) {
            toast.error("Please type a message");
            return;
        }
        const content = contentref.current.value;
        if (!token) {
            toast.error("Please sign in to message the seller");
            navigate("/signin");
        }
        try {
            const res = await axios.post(
                `${BACKEND_URL}/message/sendMessage`,
                {
                    recieverId,
                    content,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessages((prev) => [...prev, res.data.message]);
            contentref.current.value = ""; // Clear the input field after sending
        } catch (e) {
            console.log(e);
            toast.error("Failed to send message");
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please sign in to message the seller");
            navigate("/signin");
        }
        const fetchMessages = async () => {
            try {
                const res = await axios.get(
                    `${BACKEND_URL}/message/getMessages?recieverId=${recieverId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setMessages(res.data.message);
               


            } catch (e) {
                console.log(e);
            }
        };
        fetchMessages();
    }, []);

    return (
        <div className="bg-slate-900 h-screen ">
       <NavBarHome messageSeller={true}></NavBarHome>
        <div className="flex flex-col bg-slate-900 min-h-[90vh]">
            <div className="flex-1  p-4">
                <div className="space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${
                                message.senderId === recieverId
                                    ? "justify-start"
                                    : "justify-end"
                            }`}
                        >
                            <div
                                className={`p-3 rounded-2xl max-w-xs shadow-md ${
                                    message.senderId === recieverId
                                        ? "bg-gray-300 text-black rounded-bl-none"
                                        : "bg-blue-500 text-white rounded-br-none"
                                }`}
                            >
                                <p className="text-sm">{message.content}</p>
                                <span className="text-xs text-gray-500 block mt-1">
                                    {new Date(message.createdAt).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
           
            <div className="p-4 bg-slate-900  flex items-center justify-center gap-3">
                <input
                onKeyDown={(e)=>{

                    if(e.key==='Enter')
                    {
                        sendMessage()
                    }
                }}
                    ref={contentref}
                    type="text"
                    placeholder="Type your message here"
                    className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
                />
                <button
                    onClick={sendMessage}
                    className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                    Send
                </button>
            </div>
            <div  ref={bottomRef} ></div>

 
        </div>
 </div>
    );
}