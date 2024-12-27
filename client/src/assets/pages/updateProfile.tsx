import  { useState, useEffect } from "react";
import NavBarHome from "../components/nav-bar_home";
import { BACKEND_URL } from "../../../config";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName:"",
    email: "",
    password: "",
    // profilePicture: null,
  });
  // const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch current user profile data
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token=localStorage.getItem("token")
      // Replace with your backend API URL
    const response=axios.get(`${BACKEND_URL}/user/userInformation`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
      const {data} = await response
      setUserData({
        firstName: data.user.firstName,
        lastName:data.user.lastName,
        email: data.user.email,
        password: data.user.password,
        // profilePicture: null,
      });
      // setPreviewImage(data.profilePicture);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setUserData({ ...userData, profilePicture: file });

  //   // Preview selected image
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setPreviewImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setMessage("");

    
    const token=localStorage.getItem("token")
    // if (userData.profilePicture) {
    //   formData.append("profilePicture", userData.profilePicture);
    // }

    try {
      // Replace with your update API endpoint
       await axios.put(`${BACKEND_URL}/user/updateUserInformation`,{
        firstName:userData.firstName,
        lastName:userData.lastName,
        email:userData.email,
        password:userData.password
       },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      toast.success("Profile updated successfully")
  
    } catch (error) {
      console.error("Error updating profile:", error);
     toast.error("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div  className="bg-gradient-to-br min-h-screen from-gray-800 to-gray-900 ">
      <NavBarHome></NavBarHome>
    <div className="max-w-2xl mx-auto h-auto p-6   bg-gradient-to-br min-h-screen sm:min-h-max from-slate-900 to-slate-950 shadow-md rounded-lg mt-6 pb-6 ">
      <h1 className="text-2xl font-bold mb-6 text-white">Update Profile</h1>
      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.includes("successfully")
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6 h-auto m-2   rounded-2xl">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={userData.firstName}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2  focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={userData.lastName}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="Password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 mb-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* <div>
          <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
            Profile Picture
          </label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {previewImage && (
            <div className="mt-3">
              <p className="text-sm text-gray-600">Preview:</p>
              <img
                src={previewImage}
                alt="Preview"
                className="h-20 w-20 rounded-full object-cover border mt-2"
              />
            </div>
          )}
        </div> */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 mt-8 px-4 rounded-md hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
    </div>
    </div>
  );
};

export default UpdateProfile;
