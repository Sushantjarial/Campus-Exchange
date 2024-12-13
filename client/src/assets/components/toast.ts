import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const showToast = (text:string) => {
    toast(text, {
      className: "bg-white border border-purple-500 shadow-lg rounded-lg px-6 py-4 text-gray-800 font-semibold",
      bodyClassName: "text-purple-500 text-sm",
      closeButton: false,
      progressStyle: { background: "linear-gradient(to right, #6a11cb, #2575fc)" },
    }) }