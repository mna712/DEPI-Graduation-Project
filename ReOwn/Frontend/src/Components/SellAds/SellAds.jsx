import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function SellAd() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [condition, setCondition] = useState("new");
  const [contactMethod, setContactMethod] = useState("both");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    location: "",
    description: "",
    sellerPhone: "",
    price: ""
  });


  const validateForm = () => {
    const newErrors = {};
    
    // Title validation
    if (!formData.title || !formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }
    
    // Category is optional - no validation needed
    
    // Price validation
    if (!formData.price || !formData.price.toString().trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }
    
    // Location validation
    if (!formData.location || !formData.location.trim()) {
      newErrors.location = "Location is required";
    } else if (formData.location.trim().length < 2) {
      newErrors.location = "Location must be at least 2 characters";
    }
    
    // Description validation
    if (!formData.description || !formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 5) {
      newErrors.description = "Description must be at least 5 characters";
    }
    
    // Phone validation
    if (!formData.sellerPhone || !formData.sellerPhone.trim()) {
      newErrors.sellerPhone = "Phone number is required";
    }
    
    // Images validation
    if (images.length === 0) {
      newErrors.images = "At least one image is required";
    }
    if (images.length > 6) {
      newErrors.images = "Maximum 6 images allowed";
    }
    
    return newErrors;
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 6) {
      toast.error("Maximum 6 images allowed");
      return;
    }
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      // Create FormData
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('categoryId', formData.categoryId);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('condition', condition);
      formDataToSend.append('sellerPhone', formData.sellerPhone);
      formDataToSend.append('contactMethod', contactMethod);

      // Append images
      images.forEach((image) => {
        formDataToSend.append('images', image);
      });

      const response = await axios.post(
        'http://localhost:3000/api/product',
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`
            // Don't set Content-Type - let axios set it automatically for FormData
          },
          timeout: 30000, // 30 seconds timeout
          maxContentLength: Infinity,
          maxBodyLength: Infinity
        }
      );

      if (response.status === 201 || response.status === 200) {
        const productData = response.data?.data;
        const productId = productData?._id || productData?.id;
        
        console.log("Product created:", productData);
        console.log("Product ID:", productId);
        
        toast.success("Ad posted successfully! Waiting for admin approval.");
        
        // Navigate to product page with the new product ID
        if (productId) {
          navigate(`/product/${productId}`);
        } else {
          // Fallback: navigate to products list if ID not available
          navigate("/product");
        }
      }
    } catch (error) {
      console.error("Error posting ad:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      console.error("Error code:", error.code);
      
      // Handle network errors
      if (error.code === 'ECONNABORTED' || error.message === 'Network Error' || !error.response) {
        toast.error("Cannot connect to server. Please make sure the backend is running on http://localhost:3000");
        console.error("Backend connection failed. Is the server running?");
        return;
      }
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else if (error.message) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("Failed to post ad. Please check console for details.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white px-6 py-4 border-b">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-900"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Sell your Ad</h1>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
            {/* Ad Title */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label className="text-gray-700 font-medium">Ad title</label>
              <div className="md:col-span-3">
                <input
                  type="text"
                  placeholder="Enter title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>
            </div>

            {/* Category */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label className="text-gray-700 font-medium">Category</label>
              <div className="md:col-span-3">
                <input
                  type="text"
                  placeholder="Enter category name"
                  value={formData.categoryId}
                  onChange={(e) => {
                    setFormData({...formData, categoryId: e.target.value});
                    // Clear error when category is entered
                    if (errors.categoryId) {
                      setErrors({...errors, categoryId: ""});
                    }
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none ${
                    errors.categoryId ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}
              </div>
            </div>

            {/* Price */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label className="text-gray-700 font-medium">Price (EGP)</label>
              <div className="md:col-span-3">
                <input
                  type="number"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  min="0"
                  step="0.01"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label className="text-gray-700 font-medium">Location</label>
              <div className="md:col-span-3 relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Enter location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>
            </div>

            {/* Condition */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label className="text-gray-700 font-medium">Condition</label>
              <div className="md:col-span-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setCondition("new")}
                  className={`px-6 py-2.5 rounded-lg border-2 font-medium transition-colors ${
                    condition === "new"
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  New
                </button>
                <button
                  type="button"
                  onClick={() => setCondition("used")}
                  className={`px-6 py-2.5 rounded-lg border-2 font-medium transition-colors ${
                    condition === "used"
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  Used
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="text-gray-700 font-medium">Description</label>
              <div className="md:col-span-3">
                <textarea
                  placeholder="Describe the item you're selling (minimum 5 characters)"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="5"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none resize-none ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>
            </div>

            {/* Image Upload */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="text-gray-700 font-medium">Images (Max 6)</label>
              <div className="md:col-span-3">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="mb-4"
                />
                {errors.images && <p className="text-red-500 text-sm mb-2">{errors.images}</p>}
                
                {/* Image Preview Grid */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Empty slots indicator */}
                {images.length < 6 && (
                  <p className="text-sm text-gray-500">
                    {images.length} / 6 images selected
                  </p>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Phone Number */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label className="text-gray-700 font-medium">Phone number</label>
              <div className="md:col-span-3">
                <input
                  type="tel"
                  placeholder="+20 1234567890"
                  value={formData.sellerPhone}
                  onChange={(e) => setFormData({...formData, sellerPhone: e.target.value})}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none ${
                    errors.sellerPhone ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.sellerPhone && <p className="text-red-500 text-sm mt-1">{errors.sellerPhone}</p>}
              </div>
            </div>

            {/* Contact Method */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label className="text-gray-700 font-medium">Contact Method</label>
              <div className="md:col-span-3 flex gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => setContactMethod("phone")}
                  className={`px-6 py-2.5 rounded-lg border-2 font-medium transition-colors ${
                    contactMethod === "phone"
                      ? "border-teal-600 bg-teal-600 text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  Phone number
                </button>
                <button
                  type="button"
                  onClick={() => setContactMethod("chat")}
                  className={`px-6 py-2.5 rounded-lg border-2 font-medium transition-colors ${
                    contactMethod === "chat"
                      ? "border-teal-600 bg-teal-600 text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  ReOwn Chat
                </button>
                <button
                  type="button"
                  onClick={() => setContactMethod("both")}
                  className={`px-6 py-2.5 rounded-lg border-2 font-medium transition-colors ${
                    contactMethod === "both"
                      ? "border-teal-600 bg-teal-600 text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  Both
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Posting..." : "Post now"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
