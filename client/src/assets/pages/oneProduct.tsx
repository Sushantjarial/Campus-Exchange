import { useNavigate, useSearchParams } from "react-router-dom";
import { ImageSlider } from "../components/imageSlider";
import NavBarHome from "../components/nav-bar_home";
import logo from './../images/profile.png';
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../config";

export function OneProduct() {
    const navigate=useNavigate()
    const [searchParms] = useSearchParams();
    const id = searchParms.get("id");
    const [product, setProduct] = useState<productType>()
    console.log(product)
    type productType = {
        id: string,
        name: string,
        description: string,
        category: string,
        images: any[],
        price: string
        contactInformation: string,
        user: {
            id: string,
            firstName: string,
            lastName: string
        }
    }
    useEffect(() => {
        const token = localStorage.getItem("token")
        try {
            const fetchReq = async () => {
                const res = await axios.get(`${BACKEND_URL}/products/oneProduct?productId=${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setProduct(res.data.product)
            }
            fetchReq()
        }
        catch (e) {
            console.log(e)
        }
    }, [])
    const [showContactInfo, setShowContactInfo] = useState(false)

    return (
        <div className="min-h-screen  bg-gradient-to-br from-gray-800 to-gray-900">
            <NavBarHome sellerId={product?.user.id} oneProduct={true}></NavBarHome>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 max-w-7xl mx-auto px-4 py-6">
                <div className="grid col-span-1 md:col-span-4">
                    <ImageSlider images={(product) ? product.images : []}></ImageSlider>
                    <div className="hidden sm:block bg-gray-900 p-6 text-white mt-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                        <div className="font-bold text-3xl mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent flex items-center">
                            <svg className="w-8 h-8 mr-2 text-gray-300 group-hover:rotate-6 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Description
                        </div>
                        <div className="text-lg text-gray-300 leading-relaxed">{product?.description}</div>
                    </div>
                </div>

                <div className="flex flex-col space-y-6 col-span-1 md:col-span-2">
                    <div className="bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300  hover:-translate-y-1 group">
                        <div className="text-4xl font-bold text-white mb-2 flex items-center">
                            <span className="group-hover:text-green-400 transition-colors">₹</span>
                            <span className="ml-2">{product?.price}</span>
                        </div>
                        <p className="text-xl text-gray-300 break-words group-hover:text-gray-100 transition-colors">{product?.name}</p>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <div 
                            className="text-2xl font-bold text-white mb-4 flex items-center justify-between cursor-pointer"
                            onClick={() => setShowContactInfo(!showContactInfo)}
                        >
                            <div className="flex items-center">
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Contact Information
                            </div>
                            <svg className={`w-5 h-5 transition-transform duration-300 ${showContactInfo ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        <div className={`overflow-hidden transition-all duration-300 ${showContactInfo ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <p className="text-lg text-gray-300 break-words">{product?.contactInformation}</p>
                            <button onClick={()=>{navigate(`/messageSeller?recieverId=${product?.user.id}`)}} className=" mt-2 sm:flex items-center  justify-center p-2 mr-8 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 text-white shadow-lg hover:shadow-green-500/30">
            <span className="pl-2 px-2 font-medium">{"Message Seller"}</span>
          </button>
                        </div>
                    </div>

                    <div className="block sm:hidden bg-gray-900 p-6 text-white rounded-xl shadow-lg">
                        <div className="font-bold text-3xl mb-4">Description</div>
                        <div className="text-lg text-gray-300 leading-relaxed">{product?.description}</div>
                    </div>

                    <div className="bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group">
                        <div className="flex items-center space-x-4">
                            <div className="relative transform group-hover:scale-105 transition-transform">
                                <div className="absolute inset-0 bg-blue-400 rounded-full animate-pulse group-hover:animate-none transition-all opacity-50"></div>
                                <img src={logo} className="w-12 h-12 rounded-full ring-2 ring-blue-400 relative z-10" alt="User Profile" />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 z-20"></div>
                            </div>
                            <div>
                                <div className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">Seller</div>
                                <div className="text-blue-400 hover:text-blue-300 transition-colors duration-200 cursor-pointer">
                                    {product?.user.firstName} {product?.user.lastName}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
