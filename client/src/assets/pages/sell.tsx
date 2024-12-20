 import  { useState } from 'react';



export default function SellPage() {
    type formType = {
        itemName: string,
        category: string,
        price: string,
        description: string,
        images: any[]
    }
    const [formData, setFormData] = useState<formType>({
        itemName: '',
        category: '',
        price: '',
        description: '',
        images: [], // Store multiple images
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageUpload = (e: any) => {
        const files = Array.from(e.target.files);
        setFormData((prevData: formType) => ({
            ...prevData,
            images: [...prevData.images, ...files], // Append new files to the existing array
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('Item Details:', formData);

        // Example for form submission logic
        // const formDataToSend = new FormData();
        // formDataToSend.append('itemName', formData.itemName);
        // formDataToSend.append('category', formData.category);
        // formDataToSend.append('price', formData.price);
        // formDataToSend.append('description', formData.description);

        // formData.images.forEach((image, index) => {
        //     formDataToSend.append(`images[${index}]`, image);
        // });
        // Send `formDataToSend` to your backend via API request (e.g., fetch or axios)
    };

    return (
        <div
            id="bg-image"
            className="bg-cover  bg-[url('https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?q=80&w=1408&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] flex items-center justify-center"
        >
            <div
                id="front"
                className="w-full max-w-lg p-8 bg-white rounded-lg"
            >
                <h2 className="text-2xl font-semibold text-black text-center mb-6">Sell Your Item</h2>

                <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                    {/* Item Name */}
                    <div>
                        <label htmlFor="itemName" className="block text-black font-medium mb-2">Item Name</label>
                        <input
                            type="text"
                            id="itemName"
                            name="itemName"
                            value={formData.itemName}
                            onChange={handleChange}
                            placeholder="Enter item name"
                            required
                            className="w-full px-4 py-2 border border-gray-300 hover:outline-none hover:ring-2 hover:ring-blue-500
                             rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-black font-medium mb-2">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className=" w-full px-4 py-2 border border-gray-300 rounded-lg 
                            hover:outline-none hover:ring-2 hover:ring-blue-500
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Category</option>
                            <option value="Books">Stationery</option>
                            <option value="Gadgets">Electronics</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Books">Books</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    {/* Price */}
                    <div>
                        <label htmlFor="price" className="block text-black font-medium mb-2">Price (Rs)</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            min={1}
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                            required
                            className="hover:outline-none hover:ring-2 hover:ring-blue-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-black font-medium mb-2">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the item"
                            rows={5}
                            required
                            className="hover:outline-none hover:ring-2 hover:ring-blue-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label htmlFor="images" className="block text-black font-medium mb-2">Upload Images</label>
                        <input
                            type="file"
                            id="images"
                            name="images"
                            onChange={handleImageUpload}
                            accept="image/*"
                            multiple // Allow multiple file selection
                            required
                            className="w-full"
                        />
                    </div>

                    {/* Preview Images */}
                    <div className="mt-4">
                        <h3 className="text-black font-medium mb-2">Image Preview:</h3>
                        <div className="flex space-x-2">
                            {formData.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(image)}
                                    alt={`Preview ${index + 1}`}
                                    className="w-20 h-20 object-cover rounded"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

