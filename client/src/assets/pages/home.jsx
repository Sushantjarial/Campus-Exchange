import { useState } from 'react';
import NavBar from './../components/nav-bar';
import Footer from './../components/footer';

export default function HomePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');

    // Placeholder for number of product slots to display
    const placeholderProductCount = 8;

    return (
        <>
            <NavBar />

{/* Search and Filter Section */}
<div className="bg-gray-100 dark:bg-gray-900 p-4 text-center">
    {/* Search Bar */}
    <input
        type="text"
        placeholder="Search products..."
        className="w-full sm:w-1/2 p-2 rounded-lg border border-gray-300 dark:border-gray-700"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
    />
    
    {/* Filter Options */}
    <div className="mt-4 flex justify-center space-x-4">
        <button
            className={`px-4 py-2 rounded-lg ${
                filter === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
            }`}
            onClick={() => setFilter('All')}
        >
            All
        </button>
        <button
            className={`px-4 py-2 rounded-lg ${
                filter === 'Books' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
            }`}
            onClick={() => setFilter('Books')}
        >
            Books
        </button>
        <button
            className={`px-4 py-2 rounded-lg ${
                filter === 'Gadgets' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
            }`}
            onClick={() => setFilter('Gadgets')}
        >
            Gadgets
        </button>
        <button
            className={`px-4 py-2 rounded-lg ${
                filter === 'Essentials' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
            }`}
            onClick={() => setFilter('Essentials')}
        >
            Essentials
        </button>
    </div>
</div>

{/* Product Listing Section with Placeholders */}
<div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white dark:bg-gray-800">
    {[...Array(placeholderProductCount)].map((_, index) => (
        <div key={index} className="bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md p-4 h-64">
            <div className="w-full h-32 bg-gray-300 dark:bg-gray-600 rounded-md mb-4"></div>
            <div className="h-4 bg-gray-400 dark:bg-gray-500 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-400 dark:bg-gray-500 rounded w-1/2"></div>
        </div>
    ))}
</div>

<Footer />
        </>
    );
}
