import axios from "axios";
import { useState, ChangeEvent, FormEvent, useRef } from "react";
import { BACKEND_URL } from "../../../config";
import { z } from "zod";
import toast from "react-hot-toast";
import returnIcon from "../images/return.png";
import { useNavigate } from "react-router-dom";
import compress from "browser-image-compression";
import Footer from "../components/footer";

export default function SellPage() {
  const navigate = useNavigate();
  const [issubmitting, setIssubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    category: z.string().min(1, "Category is required"),
    contactInformation: z.string().min(1, "Contact information is required"),
    price: z.string().min(1, "Price is required"),
    images: z.array(z.any()).min(1, "At least one image is required"),
  });

  type FormType = z.infer<typeof productSchema>;

  const [formData, setFormData] = useState<FormType>({
    name: "",
    category: "",
    contactInformation: "",
    description: "",
    price: "",
    images: [],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    // Validate file types and sizes
    const validFiles = files.filter((file) => {
      const isValidType = file.type.startsWith("image/");
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
      images: [...prevData.images, ...validFiles].slice(0, 3),
    }));
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleDragClick = () => {
    inputRef.current?.click();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (formData.images.length > 3) {
        toast.error("You can only upload up to 3 images");
        return;
      }
      const validationResult = productSchema.safeParse(formData);
      if (!validationResult.success) {
        const errors = validationResult.error.errors;
        errors.forEach((error) => toast.error(error.message));
        return;
      }
      const compressedImages = await compressImage(formData.images);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please sign in first.");
        navigate("/signin");
        return;
      }
      setIssubmitting(true);
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
      formData.images = imageUrls;
      await axios.post(
        `${BACKEND_URL}/products`,
        {
          name: formData.name,
          category: formData.category,
          contactInformation: formData.contactInformation,
          description: formData.description,
          price: formData.price,
          images: formData.images,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIssubmitting(false);
      toast.success(
        "Product Listed Successfully , it will be visible to other users after admin approval.",
        {
          duration: 7000,
        }
      );
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "Error listing product. Please try again."
        );
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
      setIssubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
      {/* Back Button */}
      <button
        onClick={() => navigate("/home")}
        className="fixed top-6 left-6 z-20 bg-gray-800/80 shadow-lg rounded-full p-2 hover:scale-110 transition-all border border-gray-700 backdrop-blur"
        aria-label="Back to Home"
      >
        <img src={returnIcon} alt="Back" className="w-7 h-7" />
      </button>
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="w-full max-w-xl mx-auto p-8 bg-gray-900/90 shadow-2xl rounded-3xl border border-gray-800 relative">
          <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-tight drop-shadow-sm">
            Sell Your Item
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Item Name */}
            <div>
              <label
                htmlFor="itemName"
                className="block text-gray-200 font-semibold mb-2"
              >
                Item Name
              </label>
              <input
                type="text"
                id="itemName"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter item name"
                required
                className="w-full px-4 py-2 border border-gray-700 rounded-xl bg-gray-800 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-sm placeholder-gray-400"
              />
            </div>
            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-gray-200 font-semibold mb-2"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-700 rounded-xl bg-gray-800 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-sm"
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
              <label
                htmlFor="price"
                className="block text-gray-200 font-semibold mb-2"
              >
                Price (Rs)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                min={1}
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                required
                className="w-full px-4 py-2 border border-gray-700 rounded-xl bg-gray-800 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-sm placeholder-gray-400"
              />
            </div>
            {/* Contact Information */}
            <div>
              <label
                htmlFor="contactInformation"
                className="block text-gray-200 font-semibold mb-2"
              >
                Contact Information
              </label>
              <input
                type="text"
                id="contactInformation"
                name="contactInformation"
                min={1}
                value={formData.contactInformation}
                onChange={handleChange}
                placeholder="Enter contact information"
                required
                className="w-full px-4 py-2 border border-gray-700 rounded-xl bg-gray-800 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-sm placeholder-gray-400"
              />
            </div>
            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-gray-200 font-semibold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the item"
                rows={4}
                required
                className="w-full px-4 py-2 border border-gray-700 rounded-xl bg-gray-800 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-sm resize-none placeholder-gray-400"
              ></textarea>
            </div>
            {/* Image Upload - Drag and Drop */}
            <div>
              <label
                htmlFor="images"
                className="block text-gray-200 font-semibold mb-2"
              >
                Upload Images (max 3)
              </label>
              <div
                className={`w-full flex flex-col items-center justify-center border-2 border-dashed rounded-xl transition-all duration-200 cursor-pointer bg-gray-800/70 ${
                  dragActive
                    ? "border-blue-400 bg-blue-900/30"
                    : "border-gray-700"
                }`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={handleDragClick}
                style={{ minHeight: 120 }}
              >
                <input
                  type="file"
                  id="images"
                  name="images"
                  onChange={handleImageUpload}
                  accept="image/*"
                  multiple
                  ref={inputRef}
                  className="hidden"
                />
                <div className="flex flex-col items-center py-6">
                  <svg
                    width="36"
                    height="36"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="text-blue-400 mb-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4 4h-4a1 1 0 01-1-1v-1m6 2a1 1 0 001-1v-1m-6 2a1 1 0 01-1-1v-1m0 0V4m0 12h6"
                    />
                  </svg>
                  <span className="text-gray-400 text-sm">
                    Drag & drop images here, or{" "}
                    <span className="text-blue-400 underline">browse</span>
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    (Only images, max 5MB each, up to 3 images)
                  </span>
                </div>
              </div>
              {/* Preview Images */}
              {formData.images.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-xl border border-gray-700 shadow group-hover:opacity-80 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-red-600 transition-all opacity-90 group-hover:opacity-100"
                        aria-label="Remove image"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              disabled={issubmitting}
              className={`w-full py-3 px-4 rounded-xl text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${
                issubmitting
                  ? "opacity-60 cursor-not-allowed animate-pulse"
                  : ""
              }`}
            >
              {issubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

async function compressImage(images: File[]) {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 800,
    useWebWorker: true,
  };
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
    return compressedImages;
  } catch (error) {
    console.error("Image compression failed:", error);
    throw new Error("Failed to compress images. Please try again.");
  }
}
