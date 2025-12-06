import { useState } from "react";
import { useProducts } from "../../Context/ProductsContext";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SellAd() {
  const { addProduct } = useProducts();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [condition, setCondition] = useState("new");
  const [contactMethod, setContactMethod] = useState("both");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
    name: "",
    phone: "+20 ",
    price: ""
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.price.trim()) newErrors.price = "Price is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim() || formData.phone === "+20 ") newErrors.phone = "Phone number is required";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const newProduct = {
      name: formData.title,
      price: formData.price + " EGP",
      image: image ? URL.createObjectURL(image) : "https://images.unsplash.com/photo-1541963463532-d68292c34d19?w=400&h=300&fit=crop",
      sellerId: user?.id || 1,
      sellerName: formData.name,
      category: formData.category,
      location: formData.location,
      description: formData.description,
      condition: condition,
      contactMethod: contactMethod,
      phone: formData.phone
    };

    addProduct(newProduct);
    alert("Ad posted successfully!");
    navigate("/");
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
            <div className="md:col-span-3 relative">
              <input
                type="text"
                placeholder="Enter Category"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              />
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>
          </div>

          {/* Price */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <label className="text-gray-700 font-medium">Price</label>
            <div className="md:col-span-3">
              <input
                type="text"
                placeholder="Enter price (EGP)"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
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
                placeholder="Select location"
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
                placeholder="Describe the item you're selling"
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
            <label className="text-gray-700 font-medium">Image</label>
            <div className="md:col-span-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="mb-4"
              />
              {image && (
                <div className="mb-4">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                </div>
              )}
              <div className="grid grid-cols-6 gap-3">
                {[...Array(10)].map((_, i) => (
                  <button
                    key={i}
                    className="aspect-square border-2 border-gray-300 rounded-lg hover:border-teal-500 transition-colors flex items-center justify-center bg-white"
                  >
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <label className="text-gray-700 font-medium">Name</label>
            <div className="md:col-span-3">
              <input
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
          </div>

          {/* Phone Number */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <label className="text-gray-700 font-medium">Phone number</label>
            <div className="md:col-span-3">
              <input
                type="text"
                placeholder="+20 |"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Contact Method */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <label className="text-gray-700 font-medium">Contact Method</label>
            <div className="md:col-span-3 flex gap-3">
              <button
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
              onClick={handleSubmit}
              className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-md transition-colors"
            >
              Post now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}