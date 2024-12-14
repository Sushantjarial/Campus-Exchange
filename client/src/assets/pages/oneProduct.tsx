import { ImageSlider } from "../components/imageSlider";
import NavBarHome from "../components/nav-bar_home";
import logo from './../images/profile.png';
export function OneProduct() {
    return (
        <div>
            <NavBarHome></NavBarHome>
            <div className="grid grid-cols-6  bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900  animate-gradient-move">

                <div className="grid col-span-4 mt-4  ">
                    
                    <ImageSlider></ImageSlider>
                    <div className="bg-gray-900 p-2 text-white mt-2 rounded-xl">
                        <div className="font-bold text-3xl">Description</div>
                    <div className="text-lg opacity-70">Track suit for men cod available to place the order send me u r address phone number cloure and map location we will deliver u in 7days</div>
                </div>
                </div>
                <div className="flex flex-col space-y-10 col-span-2  pl-8 ">
                    <div className="h-fit w-3/4 mt-10  flex flex-col  bg-gray-900  pt-2 text-white px-4 rounded-xl">
                        <div className="text-4xl font-bold"> $1,000</div>
                        <p className="text-xl font-thin opacity-70 pt-1 py-2 break-words mb-3"> Shivani 2nd year mechanical </p>
                        <div className="opacity-30">5 sep</div>
                    </div>
                    <div className="h-fit w-3/4  bg-gray-70 flex flex-col  bg-gray-900 text-white space px-4 mt-6 rounded-xl ">
                        <div className="text-2xl font-bold"> Contact Information</div>
                        <p className="text-xl font-thin opacity-50 pt-1 py-2 break-words"> I want to sell my 6 months old Samsung s23ultra  </p>
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