import { useSearchParams } from "react-router-dom";
import { ImageSlider } from "../components/imageSlider";
import NavBarHome from "../components/nav-bar_home";
import logo from './../images/profile.png';
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../config";

export function OneProduct() {
    const [searchParms]=useSearchParams();
    const id=searchParms.get("id");
    const [product,setProduct]=useState<productType>()
    console.log(product)
    type productType={
        id:string,
        name:string,
        description:string,
        category:string,
        images:any[],
        price:string
        contactInformation:string
      }
    useEffect(()=>{
        const token=localStorage.getItem("token")
        try{
            const fetchReq=async()=>{
          const res=await  axios.get(`${BACKEND_URL}/products/oneProduct?productId=${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
        setProduct(res.data.product)
        }
        fetchReq()
        }
        catch(e){
            console.log(e)
        }
    },[])
    return (
        <div>
            <NavBarHome></NavBarHome>
            <div className="grid grid-cols-6  bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900  animate-gradient-move">

                <div className="grid col-span-4 mt-4  ">
                    
                    <ImageSlider images={(product)?product.images:[]} ></ImageSlider>
                    <div className="bg-gray-900 p-2 text-white mt-2 rounded-xl">
                        <div className="font-bold text-3xl">Description</div>
                    <div className="text-lg opacity-70">{product?.description}</div>
                </div>
                </div>
                <div className="flex flex-col space-y-10 col-span-2  pl-8 ">
                    <div className="h-fit w-3/4 mt-10  flex flex-col  bg-gray-900  pt-2 text-white px-4 rounded-xl">
                        <div className="text-4xl font-bold"> $1,000</div>
                        <p className="text-xl font-thin opacity-70 pt-1 py-2 break-words mb-3"> {product?.name} </p>
                        <div className="opacity-30">5 sep</div>
                    </div>
                    <div className="h-fit w-3/4  bg-gray-70 flex flex-col  bg-gray-900 text-white space px-4 mt-6 rounded-xl ">
                        <div className="text-2xl font-bold"> Contact Information</div>
                        <p className="text-xl font-thin opacity-50 pt-1 py-2 break-words">{product?.contactInformation} </p>
                    </div>
                    <div className="h-fit w-3/4  bg-gray-70 flex  bg-gray-900 rounded-xl p-4 items-center font-bold text-xl" >
                    <img src={logo} className="w-8 h-8 sm:w-14 sm:h-14 mx-2 " alt="Logo" />
                    <div className="bg-slate-900"> 
                    <div
                    className="text-blue-400 pl-2">Sushant Jarial
                    </div>
                    </div>
                    </div>
                </div>
            



            </div>
        </div>
    )
}