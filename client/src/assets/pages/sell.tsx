import axios from 'axios';
import { useState, ChangeEvent, FormEvent } from 'react';
import { BACKEND_URL } from '../../../config';
import {  z } from 'zod';
import toast from 'react-hot-toast'
import returnIcon from '../images/return.png'
import { useNavigate } from 'react-router-dom';
import compress from 'browser-image-compression'


export default function SellPage() {
    const navigate = useNavigate()
    const [issubmitting, setIssubmitting] = useState(false)
    
    const productSchema = z.object({
        name: z.string().min(1, "Name is required"),
        description: z.string().min(1, "Description is required"),
        category: z.string().min(1, "Category is required"),
        contactInformation: z.string().min(1, "Contact information is required"),
        price: z.string().min(1, "Price is required"),
        images: z.array(z.any()).min(1, "At least one image is required")
    })

    type FormType = z.infer<typeof productSchema>;

    const [formData, setFormData] = useState<FormType>({
        name: '',
        category: '',
        contactInformation: '',
        description: '',
        price: '',
        images: [],
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        
        const files = Array.from(e.target.files);
        
        // Validate file types and sizes
        const validFiles = files.filter(file => {
            const isValidType = file.type.startsWith('image/');
            const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
            
            if (!isValidType) {
                toast.error(`${file.name} is not a valid image file`);
            }
            if (!isValidSize) {
                toast.error(`${file.name} exceeds 5MB size limit`);
            }
            
            return isValidType && isValidSize;
        });

        setFormData((prevData) => ({
            ...prevData,
            images: [...prevData.images, ...validFiles],
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            // Validate form data
            if(formData.images.length>3){
                toast.error("You can only upload up to 3 images");
                return;
            }
            const validationResult = productSchema.safeParse(formData);
            if (!validationResult.success) {
                const errors = validationResult.error.errors;
                errors.forEach(error => toast.error(error.message));
                return;
            }

            // Compress images
            const compressedImages = await compressImage(formData.images);
            
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Please sign in first.");
                navigate("/signin");
                return;
            }
            setIssubmitting(true)
            // Upload images to Cloudinary
            const imageUrls = await Promise.all(
                compressedImages.map(async (img) => {
                    const formImage = new FormData();
                    formImage.append("file", img);
                    formImage.append("upload_preset", "campus-exchange");
                    formImage.append("cloud_name", "dnkohht9o");
                    
                    const response = await axios.post(
                        "https://api.cloudinary.com/v1_1/dnkohht9o/image/upload",
                        formImage
                    );
                    return response.data.url;
                })
            );
            console.log("imageUrls" + imageUrls)
            formData.images = imageUrls
            // Send product data to backend
            await axios.post(
                `${BACKEND_URL}/products`,
                { name:formData.name,
                    category:formData.category,
                    contactInformation:formData.contactInformation,
                    description:formData.description,
                    price:formData.price,
                    images:formData.images
                 },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                       
                    },
                }
            );
            setIssubmitting(false)
            toast.success("Product Listed Successfully , it will be visible to other users after admin approval.",{
                duration: 7000,
            });
            navigate("/home"); // Redirect after successful submission
            
        } catch (error) {
            console.error('Error:', error);
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Error listing product. Please try again.");
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <div
            id="bg-image"
            className="bg-cover  bg-[url('https://images.pexels.com/photos/333850/pexels-photo-333850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] flex items-center justify-center"
        >
            <div
                id="front"
                className="w-full max-w-lg p-8  bg-slate-300 rounded-lg"
            >
                <img src={returnIcon}  onClick={()=>navigate("/home")} className='w-10 h-10 hover:scale-105 transition-all hover:cursor-pointer '></img>
                <h2 className="text-2xl font-semibold text-black text-center mb-6">Sell Your Item</h2>

                <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                    {/* Item Name */}
                    <div>
                        <label htmlFor="itemName" className="block text-black font-medium mb-2">Item Name</label>
                        <input
                            type="text"
                            id="itemName"
                            name="name"
                            value={formData.name}
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
                            <option value="Stationery">Stationery</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Books">Books</option>
                            <option value="Essentials">Others</option>
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





                    <div>
                        <label htmlFor="contactInformation" className="block text-black font-medium mb-2">Contact Information </label>
                        <input
                            type="text"
                            id="contactInformation"
                            name="contactInformation"
                            min={1}
                            value={formData.contactInformation}
                            onChange={handleChange}
                            placeholder="Enter contact information "
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
                    <button type="submit" disabled={issubmitting} className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700  focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {issubmitting ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}

async function compressImage(images: File[]) {
    const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
    };
    console.log(images)

    try {
        const compressedImages = await Promise.all(
            images.map(async (img) => {
                try {
                    return await compress(img, options);
                } catch (error) {
                    console.error(`Error compressing image ${img.name}:`, error);
                    throw new Error(`Failed to compress image ${img.name}`);
                }
            })
        );
        console.log(compressedImages)
        return compressedImages;
    } catch (error) {
        console.error('Image compression failed:', error);
        throw new Error('Failed to compress images. Please try again.');
    }
}
