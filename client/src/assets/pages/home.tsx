import { useEffect, useState } from 'react';
import NavBarHome from './../components/nav-bar_home';
import Footer from './../components/footer';
// import plusIcon from './../images/plus.png'; 
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function HomePage() {
    type PRODUCT ={
        id:string,
        name:string,
        description:string,
        category:string,
        contactInformation:string
        images:[{link:string}]
        price:string
    }

const searchProducts = ({searchTerm}:{searchTerm:string})=>{
const query=searchTerm.toLowerCase().split(/\s+/)
setSearchTerm(searchTerm)

 setProducts( products?.filter((product)=>{
    const name=product.name.toLowerCase()
    const description=product.description.toLowerCase()
    return query.some(word => name.includes(word) || description.includes(word));
 
}))
}

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('');
    const [products,setProducts]=useState<PRODUCT[]>()
    
    // Placeholder for number of product slots to display
    const placeholderProductCount = 20;

    const handleSearch = () => {
        console.log("Search Term:", searchTerm);
        searchProducts({searchTerm})
        // Implement your search logic here
    };
    console.log(searchTerm)

    useEffect(() => {
        if(!searchTerm){
        const token = localStorage.getItem("token");
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

        fetchProducts();}
    }, [searchTerm]);

    return (
        <div className=' min-h-screen bg-gray-900 '>
            <div className='sm:fixed w-screen  '>
            <NavBarHome searchProducts={searchProducts}></NavBarHome>
            </div>

            {/* Search and Filter Section */}
            <div className=" bg-gray-100 dark:bg-gray-900 sm:pt-16 p-4">
                <div className="flex flex-col items-center space-y-4">
                    {/* Search Bar and Button  for small screens */}
                    <div className="w-full flex sm:hidden items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="flex-grow p-2 rounded-lg border dark:border-gray-700"
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
                                        ? 'bg-blue-700 text-white'
                                        : 'bg-gray-200 dark:bg-gray-700 hover:bg-blue-500'
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
                (product.category==filter)? <div onClick={()=>{navigate(`/oneProduct?id=${product.id}`)}} key={product.id} className="hover:cursor-pointer  transition-all  shadow-blue-500 shadow-sm  border-green-600 hover:border-y-2 bg-gray-900 rounded-lg  p-4 flex flex-col items-start font-semibold">
                <div className="w-full h-32 bg-gray-300 dark:bg-gray-900 rounded-md mb-4">
                <img className='w-full h-32' src={product.images[0].link} alt={product.name} />
                </div>
                    <div className='flex items-center w-full mb-2 '>
                <div className=" text-2xl font-bold text-white rounded w-3/4 ">₹ {product.price}</div>
                <div className=" text-lg bg-gray-600  items-center  rounded px-2">{product.category}</div>
                </div>
                <div className='text-white opacity-50'>{(product.name.length>40)?product.name.slice(0,40)+"...":product.name}</div>
                
            </div>:<></>
                :(
                    
                    <div key={product.id} onClick={()=>{navigate(`/oneProduct?id=${product.id}`)}} className="hover:cursor-pointer  transition-all  shadow-blue-500 shadow-sm  border-green-600 hover:border-y-2 bg-gray-900 rounded-lg  p-4 flex flex-col items-start font-semibold">
                        <div className="w-full h-32 bg-gray-900 rounded-md mb-4">
                        <img className='w-full h-32 rounded-lg' src={product.images[0].link} alt={product.name} />

                        </div>
                        <div className='flex items-center w-full mb-2 '>
                <div className=" text-2xl font-bold text-white rounded w-3/4 ">₹ {product.price}</div>
                <div className=" text-lg bg-gray-600  items-center  rounded px-2">{product.category}</div>
                </div>
                        
                        <div className="   items-center  rounded px-2">
                            <div className='text-slate-500' >{(product.name.length>40)?product.name.slice(0,40)+"...":product.name}</div>
                            </div>
                    </div>
                ))}
            </div>
}
             {/* Sell Button */}
             {/* <div className="fixed bottom-5 right-5 z-50">
                <button
            onClick={() => navigate("/sell")}
            className="flex items-center justify-center p-3 sm:px-8 sm:opacity-40 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 hover:opacity-90"
                >
                    <img src={plusIcon} alt="Sell" className="w-5 h-5 " />
                    <span className=" pl-4 px-2 text-xl ">Sell</span>
                </button>
            </div> */}

            <Footer />
        </div>
    );
}