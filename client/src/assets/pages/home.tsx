import { useEffect, useState } from 'react';
import NavBarHome from './../components/nav-bar_home';
import Footer from './../components/footer';
import plusIcon from './../images/plus.png'; // Adjust the path if needed
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';

export default function HomePage() {
    type PRODUCT ={
        id:string,
        name:string,
        description:string,
        category:string,
        contactInformation:string
        images:[{link:string}]
    }



    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('');
    const [products,setProducts]=useState<PRODUCT[]>()

    // Placeholder for number of product slots to display
    const placeholderProductCount = 20;

    const handleSearch = () => {
        console.log("Search Term:", searchTerm);
        // Implement your search logic here
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        toast.error("the website is currently under development")
        const fetchProducts = async () => {
            try {
                const res = await axios.get("https://server.sushantjarial7.workers.dev/api/v1/products", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res.data.products);
                setProducts(res.data.products)
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <NavBarHome />

            {/* Search and Filter Section */}
            <div className=" bg-gray-100 dark:bg-gray-900 p-4">
                <div className="flex flex-col items-center space-y-4">
                    {/* Search Bar and Button  for small screens */}
                    <div className="w-full flex sm:hidden items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="flex-grow p-2 rounded-lg border border-gray-300 dark:border-gray-700"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            onClick={handleSearch}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Search
                        </button>
                    </div>

                    {/* Filter Buttons */}
                     <div className="flex flex-wrap justify-center gap-2">
                        {['Stationery', 'Books', 'Furniture', 'Electronics', 'Essentials'].map((category) => (
                            <button
                                key={category}
                                className={`w-28 h-10 px-4 py-2 text-sm rounded-lg flex items-center justify-center ${
                                    filter === category
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 dark:bg-gray-700 hover:bg-blue-400'
                                }`}
                                onClick={() => setFilter((prevFilter) => (prevFilter === category ? '' : category))}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                </div>
            </div>

            {/* Product Listing Section */}
          {(!products)?
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white dark:bg-gray-800">
                {[...Array(placeholderProductCount)].map((_, index) => (
                    <div key={index} className="bg-gray-200 dark:bg-gray-900 rounded-lg shadow-md p-4 flex flex-col items-center">
                        <div className="w-full h-32 bg-gray-300 dark:bg-gray-600 rounded-md mb-4"></div>
                        <div className="h-4 bg-gray-400 dark:bg-gray-500 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-400 dark:bg-gray-500 rounded w-1/2"></div>
                    </div>
                ))}
            </div> : <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white dark:bg-gray-800">
                {products.map((product) => (filter)?
                (product.category==filter)? <div onClick={()=>{navigate("/oneProduct")}} key={product.id} className="hover:cursor-pointer bg-gray-500 dark:bg-gray-700 rounded-lg shadow-md p-4 flex flex-col items-start font-semibold">
                <div className="w-full h-32 bg-gray-300 dark:bg-gray-900 rounded-md mb-4">
                <img className='w-full h-32' src={product.images[0].link} alt={product.name} />
                </div>
                <div className=" text-2xl  rounded w-3/4 mb-2">{product.name}</div>
                <div className=" text-lg bg-gray-600 items-center  rounded px-2">{product.category}</div>
            </div>:<></>
                :(
                    
                    <div key={product.id} onClick={()=>{navigate(`/oneProduct?id=${product.id}`)}} className="hover:cursor-pointer bg-gray-500 dark:bg-gray-700 rounded-lg shadow-md p-4 flex flex-col items-start font-semibold">
                        <div className="w-full h-32 bg-gray-300 dark:bg-gray-900 rounded-md mb-4">
                        <img className='w-full h-32' src={product.images[0].link} alt={product.name} />

                        </div>
                        <div className=" text-2xl  rounded w-3/4 mb-2">{product.name}</div>
                        
                        <div className=" text-lg bg-gray-600 items-center  rounded px-2">{product.category}</div>
                    </div>
                ))}
            </div>
}
             {/* Sell Button */}
             <div className="fixed bottom-5 right-5 z-50">
                <button
            onClick={() => navigate("/sell")}
            className="flex items-center justify-center p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
                >
                    <img src={plusIcon} alt="Sell" className="w-5 h-5" />
                    <span className="ml-2">Sell</span>
                </button>
            </div>

            <Footer />
        </div>
    );
}