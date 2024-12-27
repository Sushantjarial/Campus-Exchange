import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import logo from "./../images/logo2.png"; // Adjust the path if needed
import plusIcon from "./../images/plus.png"; // Adjust the path if needed
import profileIcon from "./../images/profile.png"; // Importing a custom profile icon image
export default function NavBarHome({
  searchProducts,
}: {
  searchProducts?: ({ searchTerm }: { searchTerm: string }) => any;
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
      <div className="flex justify-between  items-center bg-gray-800 p-3 shadow-lg border-b border-gray-400 dark:border-gray-700">
        {/* Logo and Title */}
        <Link
          to="/home"
          className="flex items-center space-x-3 hover:cursor-pointer"
        >
          <img src={logo} className="w-8 h-8 sm:w-10 sm:h-10 mx-2" alt="Logo" />
          <div className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 ">
            Campus Exchange
          </div>
        </Link>

        {/* Search Bar Centered - Visible on Medium Screens and Up */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex-grow md:flex justify-streatch items-center ml-16"
        >
          <div className="flex space-x-4 max-w-2xl w-full ">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow text-base   px-3 py-1 rounded-lg border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
            />
            <button
              type="submit"
              className="px-3  py-1 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </form>
        <button
          onClick={() =>{
            if(!token){
              navigate("/signup")
              return
            }
             navigate("/sell")}}
          className="hidden sm:flex items-center justify-center p-2 mr-8 opacity-80 rounded-full bg-green-500 hover:bg-green-600"
        >
          <img src={plusIcon} alt="Sell" className={`w-5 h-5 ${token?"":"hidden"}`} />
          <span className=" pl-4 px-2 text-xl ">{token?"Sell":"Sign up"}</span>
        </button>

        {/* Profile Icon and Dropdown */}
        <div
          className="relative text-gray-800 dark:text-gray-200 ml-4"
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
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10">
              <button
                onClick={() => {
                  setProfileMenuOpen(false);
                  navigate("/mylistings");
                }}
                className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-blue-600"
              >
                My Listings
              </button>
              <button
                onClick={() => {
                  setProfileMenuOpen(false);
                  navigate("/updateProfile");
                }}
                className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-blue-600"
              >
                Update Profile
              </button>
              {/* <button
                onClick={() => {
                  setProfileMenuOpen(false);
                  navigate("/settings");
                }}
                className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-blue-600"
              >
                Settings
              </button> */}
              <button
                onClick={() => {
                  setProfileMenuOpen(false);
                  localStorage.setItem("token","");
                  navigate("/");
                }}
                className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-blue-600"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Profile Button - Visible Only on Small Screens */}
    </>
  );
}
