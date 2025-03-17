

import axios from "axios";
import  { useState, useEffect } from "react";
import { BACKEND_URL } from "../../../config";
import NavBar from "../components/nav-bar_home";
import toast from "react-hot-toast";

const MyListings = () => {
  const [listings, setListings] = useState<listingType[]>([]);
  const [loading, setLoading] = useState(true);

  type listingType={
    id:string,
    name:string,
    description:string,
    category:string,
    images:[],
    price:string
  }

  // Fetch user listings from the backend
  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      // Replace with your backend API URL
      const token=localStorage.getItem("token")
      const response = await  axios.get(`${BACKEND_URL}/products/myListings`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      const products=response.data.products;
      setListings(products);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id:string) => {
    try {
      // Replace with your delete API endpoint
      const token=localStorage.getItem("token")
      await axios.post(`${BACKEND_URL}/products/delete?productId=${id}`,{
    
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setListings((prev) => prev.filter((listing) => listing.id !== id));
      toast.success("Listing deleted")
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  const handleEdit = (id:string) => {
    // Redirect to edit page or open a modal for editing
    console.log(`Edit listing with ID: ${id}`);
    // Example: Navigate to edit page
    window.location.href = `/edit-listing/${id}`;
  };

  if (loading) {
  
    return <div >
        <NavBar></NavBar>
        <div className=" bg-gradient-to-br min-h-screen from-gray-800 to-gray-900 ">
          <div className="max-w-4xl  mx-auto p-4">
            <h1 className="text-2xl text-white  font-bold mb-4">My Listings</h1>
          </div>
        </div>
    </div>;
  }

  return (
    <div className=" bg-gradient-to-br min-h-screen from-gray-800 to-gray-900 ">  
      <NavBar></NavBar>
       <div className="max-w-4xl  mx-auto p-4">
      
      <h1 className="text-2xl text-white  font-bold mb-4">My Listings</h1>
      {listings.length === 0 ? (
        <div className="text-center text-white">No listings found.</div>
      ) : (
        <div className="grid gap-6">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-slate-950 shadow-md rounded-lg p-4 flex justify-between items-center hover:border hover:border-white"
            >
              <div>
                <h2 className="text-lg font-semibold text-white">{(listing.name.length>100)?listing.name.slice(0,100)+"...":listing.name}</h2>
                <p className="text-sm text-gray-500">{(listing.description.length>100)?listing.description.slice(0,100)+"...":listing.description}</p>
                <p className="text-sm font-medium text-gray-600 mt-2">
                  Price: ₹{listing.price}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(listing.id)}
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default MyListings;


// const fetchListings = async () => {
//     const mockData = [
//       { id: 1, title: "Mathematics Book", description: "Used, good condition.", price: 300 },
//       { id: 2, title: "Laptop", description: "Gaming laptop, 16GB RAM.", price: 50000 },
//     ];
//     setListings(mockData);
//     setLoading(false);
//   };
  