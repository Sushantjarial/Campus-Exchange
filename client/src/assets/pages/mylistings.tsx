// import React, { useState } from 'react';

// export default function MyListings() {
//     // Sample Data (replace with backend-fetch data or props)
//     const [listings, setListings] = useState([
//         {
//             id: 1,
//             title: "Introduction to Algorithms",
//             description: "3rd Edition, hardcover, lightly used.",
//             price: "$40",
//             image: "localstoragepath/algorithms.png",
//         },
//         {
//             id: 2,
//             title: "Laptop: Dell Inspiron",
//             description: "Core i5, 8GB RAM, 256GB SSD. In great condition.",
//             price: "$450",
//             image: "localstoragepath/laptop.png",
//         }
//     ]);

//     const editListing = (id) => {
//         alert(`Edit feature not yet implemented for item with ID: ${id}`);
//     };

//     const deleteListing = (id) => {
//         setListings(listings.filter((listing) => listing.id !== id));
//     };

//     return (
//         <div className="max-w-4xl mx-auto p-4 bg-gray-100 min-h-screen">
//             <header className="bg-green-500 text-white p-4 rounded mb-6">
//                 <h1 className="text-2xl font-bold text-center">My Listings</h1>
//             </header>
//             {listings.length === 0 ? (
//                 <p className="text-center text-gray-600">You have no listings yet. Start adding items to sell or exchange!</p>
//             ) : (
//                 listings.map((listing) => (
//                     <div
//                         className="flex items-center justify-between bg-white shadow-md rounded p-4 mb-4"
//                         key={listing.id}
//                     >
//                         <img
//                             src={listing.image}
//                             alt={listing.title}
//                             className="w-20 h-20 object-cover rounded"
//                         />
//                         <div className="flex-1 ml-4">
//                             <h3 className="text-lg font-semibold text-gray-800">{listing.title}</h3>
//                             <p className="text-gray-600 text-sm">{listing.description}</p>
//                             <p className="text-green-500 font-bold">{listing.price}</p>
//                         </div>
//                         <div className="flex gap-2">
//                             <button
//                                 className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
//                                 onClick={() => editListing(listing.id)}
//                             >
//                                 Edit
//                             </button>
//                             <button
//                                 className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
//                                 onClick={() => deleteListing(listing.id)}
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// }


export default function MyListings() {
    return (
        <div className="max-w-4xl mx-auto p-4 bg-gray-100 min-h-screen">
            <header className="bg-green-500 text-white p-4 rounded mb-6">
                <h1 className="text-2xl font-bold text-center">My Listings</h1>
            </header>
            <div className="flex flex-col gap-4">
                {/* Placeholder for loading state */}
                <div className="text-center text-gray-600">Loading your listings...</div>

                {/* Placeholder for no listings state */}
                <div className="text-center text-gray-600">You have no listings yet. Start adding items to sell or exchange!</div>

                {/* Placeholder for listing items */}
                <div className="flex items-center justify-between bg-white shadow-md rounded p-4">
                    <div className="w-20 h-20 bg-gray-300 rounded"></div>
                    <div className="flex-1 ml-4">
                        <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="h-5 bg-gray-300 rounded w-1/4"></div>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded">Edit</button>
                        <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
