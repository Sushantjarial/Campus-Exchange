// import React from 'react';

// export default function MyListings() {
//     return (
//         <div className="max-w-4xl mx-auto p-4 bg-gray-100 min-h-screen">
//             <header className="bg-green-500 text-white p-4 rounded mb-6">
//                 <h1 className="text-2xl font-bold text-center">My Listings</h1>
//             </header>
//             <div className="flex flex-col gap-4">
//                 {/* Placeholder for loading state */}
//                 <div className="text-center text-gray-600">Loading your listings...</div>

//                 {/* Placeholder for no listings state */}
//                 <div className="text-center text-gray-600">You have no listings yet. Start adding items to sell or exchange!</div>

//                 {/* Placeholder for listing items */}
//                 <div className="flex items-center justify-between bg-white shadow-md rounded p-4">
//                     <div className="w-20 h-20 bg-gray-300 rounded"></div>
//                     <div className="flex-1 ml-4">
//                         <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
//                         <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
//                         <div className="h-5 bg-gray-300 rounded w-1/4"></div>
//                     </div>
//                     <div className="flex gap-2">
//                         <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded">Edit</button>
//                         <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">Delete</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import axios from "axios";
import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../../../config";
import NavBar from "../components/nav-bar_home";

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
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      setListings((prev) => prev.filter((listing) => listing.id !== id));
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
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div>  
      <NavBar></NavBar>
       <div className="max-w-4xl mx-auto p-4">
      
      <h1 className="text-2xl font-bold mb-4">My Listings</h1>
      {listings.length === 0 ? (
        <div className="text-center text-gray-500">No listings found.</div>
      ) : (
        <div className="grid gap-6">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{listing.name}</h2>
                <p className="text-sm text-gray-600">{listing.description}</p>
                <p className="text-sm font-medium text-gray-800 mt-2">
                  Price: ₹{listing.price}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(listing.id)}
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>
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
  