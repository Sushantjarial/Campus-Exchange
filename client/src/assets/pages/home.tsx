import { useEffect, useState, useCallback, useMemo } from 'react';
import NavBarHome from './../components/nav-bar_home';
import Footer from './../components/footer';
import plusIcon from './../images/plus.png'; 
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

// Replace the debounce utility to avoid NodeJS type error


// Add these constants at the top of the file
const ITEMS_PER_PAGE = 12;

// Add at the top of the file, after imports
type PRODUCT = {
    id: string,
    name: string,
    description: string,
    category: string,
    contactInformation: string,
    images: [{link: string}],
    price: string
}

// Update the scrollToTop utility function
const scrollToTop = () => {
    const productGrid = document.getElementById('product-grid');
    if (productGrid) {
        productGrid.scrollIntoView({
            behavior: 'auto',
            block: 'start'
        });
    } else {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

export default function HomePage() {
    const [state, setState] = useState({
        searchTerm: '',
        filter: '',
        products: [] as PRODUCT[],
        loading: true,
        currentPage: 1
    });

    // Memoize token and navigate to prevent re-renders
    const token = useMemo(() => localStorage.getItem("token"), []);
    const navigate = useNavigate();

    // Optimize search with useCallback
    const searchProducts = useCallback(({searchTerm}: {searchTerm: string}) => {
        setState(prev => ({ ...prev, searchTerm }));
    }, []);

    // Memoize filter handler
    const handleFilter = useCallback((category: string) => {
        setState(prev => ({ ...prev, filter: category === 'All' ? '' : category }));
    }, []);

    // Fetch products only once
    useEffect(() => {
        let mounted = true;

        const fetchProducts = async () => {
            try {
                const res = await axios.get("https://server.sushantjarial7.workers.dev/api/v1/user/home", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (mounted) {
                    setState(prev => ({ 
                        ...prev, 
                        products: res.data.products,
                        loading: false 
                    }));
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                toast.error("Failed to load products");
                if (mounted) {
                    setState(prev => ({ ...prev, loading: false }));
                }
            }
        };

        fetchProducts();
        return () => { mounted = false };
    }, [token]);

    // Update the currentProducts memo to include pagination
    const currentProducts = useMemo(() => {
        const { products, searchTerm, filter, loading } = state;
        if (loading || !products.length) return {
            items: [],
            totalItems: 0,
            totalPages: 0
        };
        
        const filtered = products.filter(product => {
            if (filter && product.category !== filter) return false;
            if (searchTerm) {
                const query = searchTerm.toLowerCase();
                return product.name.toLowerCase().includes(query) ||
                       product.description.toLowerCase().includes(query);
            }
            return true;
        });

        // Calculate pagination
        const startIndex = (state.currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        
        return {
            items: filtered.slice(startIndex, endIndex),
            totalItems: filtered.length,
            totalPages: Math.ceil(filtered.length / ITEMS_PER_PAGE)
        };
    }, [state]);

    // Update pagination handler
    const handlePageChange = useCallback((page: number) => {
        scrollToTop();
        setState(prev => ({ ...prev, currentPage: page }));
    }, []);

    // Memoize category buttons to prevent re-renders
    const CategoryButtons = useMemo(() => {
        const categories = ['All', 'Stationery', 'Books', 'Furniture', 'Electronics', 'Essentials'];
        return categories.map((category) => (
            <button
                key={category}
                className={`px-4 py-2 text-sm rounded-xl font-medium whitespace-nowrap ${
                    (category === 'All' ? !state.filter : state.filter === category)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-300'
                }`}
                onClick={() => handleFilter(category)}
            >
                {category}
            </button>
        ));
    }, [state.filter, handleFilter]);

    // Memoize search input to prevent re-renders
    const SearchInput = useMemo(() => (
        <input
            type="text"
            placeholder="Search products..."
            className="w-full p-3 mt-4 rounded-xl border border-gray-600 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={state.searchTerm}
            onChange={(e) => searchProducts({searchTerm: e.target.value})}
        />
    ), [state.searchTerm, searchProducts]);

    return (
        <div className='min-h-screen bg-gray-900'>
            <div className='fixed top-0 left-0 right-0 z-20 bg-gray-900 border-b border-gray-800'>
                <NavBarHome 
                 searchProducts={searchProducts} />
            </div>

            <div className="pt-16 min-h-screen">
                <div className="sticky top-16 z-10 bg-gray-900 border-b border-gray-800">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="w-full flex sm:hidden flex-col gap-4 py-4">
                            {SearchInput}
                            <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
                                <div className="flex gap-2 pb-1">
                                    {CategoryButtons}
                                </div>
                            </div>
                        </div>

                        <div className="hidden sm:flex flex-wrap justify-center gap-3 py-4">
                            {CategoryButtons}
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-2 sm:px-4 pb-20">
                    <div id="product-grid" className="scroll-mt-32">
                        <ProductGrid
                            loading={state.loading}
                            products={currentProducts.items}
                            token={token}
                            navigate={navigate}
                        />
                        
                        {!state.loading && currentProducts.totalItems > 0 && (
                            <Pagination
                                currentPage={state.currentPage}
                                totalPages={currentProducts.totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </div>
                </div>
            </div>

            <FloatingButton token={token} navigate={navigate} />
            <Footer />
        </div>
    );
}

// Update ProductGrid component to use CSS containment
const ProductGrid = React.memo(({ loading, products, token, navigate }: {
    loading: boolean;
    products: PRODUCT[];
    token: string | null;
    navigate: (path: string) => void;
}) => {
    if (loading) return <LoadingGrid count={ITEMS_PER_PAGE} />;
    if (products.length === 0) {
        return <div className="text-center py-12 text-gray-400">No products found</div>;
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 py-6 content-visibility-auto">
            {products.map((product) => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                    token={token} 
                    navigate={navigate} 
                />
            ))}
        </div>
    );
});

// Separate FloatingButton component
const FloatingButton = React.memo(({ token, navigate }: { 
    token: string | null; 
    navigate: (path: string) => void; 
}) => (
    <button
        onClick={() => navigate(token ? "/sell" : "/signup")}
        className="fixed bottom-5 right-4 z-50 sm:hidden flex items-center justify-center p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-lg"
    >
        <img src={plusIcon} alt="Sell" className="w-5 h-5" />
        <span className="pl-2 font-medium">{token ? "Sell" : "Sign up"}</span>
    </button>
));

// Memoize ProductCard to prevent unnecessary re-renders
const ProductCard = React.memo(({ product, token, navigate }: ProductCardProps) => {
    const handleClick = () => {
        if(!token) {
            toast.error("Login required")
            return
        }
        navigate(`/oneProduct?id=${product.id}`)
    };

    return (
        <div 
            onClick={handleClick}
            className="bg-gray-800 rounded-xl p-2 sm:p-3 cursor-pointer hover:shadow-lg transition-shadow"
        >
            <div className="aspect-square overflow-hidden rounded-lg mb-2 sm:mb-3 bg-gray-700">
                <img 
                    className='w-full h-full object-cover' 
                    src={product.images[0].link} 
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                />
            </div>
            <div className='flex items-start justify-between gap-2 mb-1 sm:mb-2'>
                <div className="text-base sm:text-xl font-bold text-white">₹{product.price}</div>
                <div className="text-xs bg-gray-700 rounded-lg px-2 py-1 text-gray-300 truncate">
                    {product.category}
                </div>
            </div>
            <div className='text-xs sm:text-sm text-gray-400 font-medium line-clamp-2'>
                {product.name}
            </div>
        </div>
    );
});

// Update LoadingGrid for consistent spacing
function LoadingGrid({ count }: { count: number }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 py-6">
            {[...Array(count)].map((_, index) => (
                <div key={index} className="bg-gray-800/50 rounded-xl p-2 sm:p-3 animate-pulse">
                    <div className="aspect-square bg-gray-700 rounded-lg mb-2 sm:mb-3"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                </div>
            ))}
        </div>
    );
}

// Type the ProductCard props
interface ProductCardProps {
    product: {
        id: string;
        name: string;
        images: [{link: string}];
        price: string;
        category: string;
    };
    token: string | null;
    navigate: (path: string) => void;
}

// Update the Pagination component to add a small delay for smooth scrolling
const Pagination = React.memo(({ 
    currentPage, 
    totalPages, 
    onPageChange 
}: { 
    currentPage: number; 
    totalPages: number; 
    onPageChange: (page: number) => void; 
}) => {
    const handlePageChange = (page: number) => {
        // Only change page if it's different from current
        if (page !== currentPage) {
            scrollToTop();
            // Small delay to ensure smooth scroll starts before page content changes
            setTimeout(() => onPageChange(page), 100);
        }
    };

    const pages = useMemo(() => {
        const items = [];
        const maxVisiblePages = 5;
        
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            items.push(i);
        }
        
        return items;
    }, [currentPage, totalPages]);

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-2 py-4 px-2">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg ${
                    currentPage === 1 
                        ? 'text-gray-500 cursor-not-allowed' 
                        : 'text-white hover:bg-gray-800'
                }`}
            >
                <ChevronLeftIcon className="w-5 h-5" />
            </button>

            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                        currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-400 hover:bg-gray-800'
                    }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg ${
                    currentPage === totalPages 
                        ? 'text-gray-500 cursor-not-allowed' 
                        : 'text-white hover:bg-gray-800'
                }`}
            >
                <ChevronRightIcon className="w-5 h-5" />
            </button>
        </div>
    );
});