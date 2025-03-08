import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import logo from "./../images/logo2.png"; // Adjust the path if needed
import plusIcon from "./../images/plus.png"; // Adjust the path if needed
import profileIcon from "./../images/profile.png"; // Importing a custom profile icon image
export default function NavBarHome({
  searchProducts,
  oneProduct
}: {
  searchProducts?: ({ searchTerm }: { searchTerm: string }) => any;
  oneProduct?: boolean
}) {
    const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false); // For profile dropdown menu
  const [searchTerm, setSearchTerm] = useState("");
  const profileMenuRef = useRef<HTMLDivElement>(null); // Create a ref for the profile menu

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Search query:", searchTerm);
    if (searchProducts) {
      searchProducts({ searchTerm });
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileMenuOpen(false);
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex justify-between items-center w-full bg-gray-800/95 backdrop-blur-sm p-3 shadow-lg border-b border-gray-600">
        {/* Logo and Title */}
        <Link
          to="/home"
          className="flex items-center space-x-3 hover:cursor-pointer min-w-[120px] transition-transform hover:scale-105"
        >
          <img src={logo} className="w-8 h-8 sm:w-10 sm:h-10 mx-2" alt="Logo" />
          <div className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-white  text-transparent bg-clip-text">
            Campus Exchange
          </div>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className={`hidden md:flex flex-1 justify-center items-center max-w-3xl mx-auto px-4`}
        >
          <div className={`flex space-x-4 w-full ${oneProduct?"hidden":"block"}`}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow text-base px-4 py-2 rounded-xl border border-gray-600 bg-gray-700/50 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-400"
              placeholder="Search products..."
            />
            <button
              type="submit"
              className="px-6 py-2 text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Search
            </button>
          </div>
        </form>

        {/* Right side buttons */}
        <div className="flex items-center min-w-[200px] justify-end">
          <button
            onClick={() => {
              if(!token){
                navigate("/signup")
                return
              }
              navigate("/sell")
            }}
            className="hidden sm:flex items-center justify-center p-2 mr-6 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 text-white shadow-lg hover:shadow-green-500/30"
          >
            <img src={plusIcon} alt="Sell" className={`w-5 h-5 ${token?"":"hidden"}`} />
            <span className="pl-2 px-2 font-medium">{token?"Sell":"Sign up"}</span>
          </button>

          {/* Profile Icon and Dropdown */}
          <div
            className="relative text-gray-800 dark:text-gray-200 mr-2 "
            ref={profileMenuRef}
          >
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="focus:outline-none"
            >
              <img
                src={profileIcon}
                alt="Profile"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
              />
            </button>

            {/* Dropdown Menu */}
            {profileMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-lg z-50 transform transition-all duration-200 ease-in-out origin-top-right animate-fade-in"
                style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                }}
              >
                <div className="py-1">
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      navigate("/mylistings");
                    }}
                    className="block w-full text-left px-4 py-2.5 text-gray-200 hover:bg-gray-700/50 hover:text-white transition-all duration-150 ease-in-out"
                  >
                    My Listings
                  </button>
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      navigate("/updateProfile");
                    }}
                    className="block w-full text-left px-4 py-2.5 text-gray-200 hover:bg-gray-700/50 hover:text-white transition-all duration-150 ease-in-out"
                  >
                    Update Profile
                  </button>
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      localStorage.setItem("token","");
                      navigate("/");
                    }}
                    className="block w-full text-left px-4 py-2.5 text-gray-200 hover:bg-gray-700/50 hover:text-white transition-all duration-150 ease-in-out"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Profile Button - Visible Only on Small Screens */}
    </>
  );
}
