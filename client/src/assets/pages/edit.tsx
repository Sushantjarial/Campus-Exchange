import { useState, useEffect } from "react";

interface EditFormData {
  name: string;
  category: string;
  price: string;
  contact: string;
  description: string;
  image: File | null;
}

export default function Edit() {
  const [formData, setFormData] = useState<EditFormData>({
    name: "",
    category: "",
    price: "",
    contact: "",
    description: "",
    image: null,
  });

  // Simulating fetching user data from backend
  useEffect(() => {
    // Fetch data from API and update the state
    const fetchData = async () => {
      const response = await fetch("/api/get-item"); // Replace with actual API
      const data = await response.json();
      setFormData({
        name: data.name || "",
        category: data.category || "",
        price: data.price || "",
        contact: data.contact || "",
        description: data.description || "",
        image: null,
      });
    };

    fetchData();
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Form: ", formData);
    // Send formData to backend (API)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Edit Item
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 font-medium">
              Item Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>


          <div className="flex flex-col">
            <label htmlFor="category" className="text-gray-700 font-medium">
              Category
            </label>
            <input
              type="text"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>


          <div className="flex flex-col">
            <label htmlFor="price" className="text-gray-700 font-medium">
              Price
            </label>
            <input
              type="text"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>


          <div className="flex flex-col">
            <label htmlFor="contact" className="text-gray-700 font-medium">
              Contact
            </label>
            <input
              type="text"
              id="contact"
              value={formData.contact}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>


          <div className="flex flex-col">
            <label htmlFor="description" className="text-gray-700 font-medium">
              Description
            </label>
            <input
              type="text"
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>


          <div className="flex flex-col">
            <label htmlFor="image" className="text-gray-700 font-medium">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              onChange={handleFileChange}
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>


          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
          >
            Update Item
          </button>
        </form>
      </div>
    </div>
  );
}
