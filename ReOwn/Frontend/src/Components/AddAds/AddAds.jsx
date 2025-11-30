import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { addProduct } from "../mockProducts";

const AddAds = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    images: [],
  });

  const categories = [
    { value: "home-kitchen", label: "Home & Kitchen tools" },
    { value: "clothes", label: "Clothes & Accessories" },
    { value: "electronics", label: "Electronics & Gadgets" },
    { value: "books", label: "Books & Games" },
    { value: "decor", label: "Home Decors & Gifts" },
    { value: "kids", label: "Baby & Kids items" },
    { value: "sports", label: "Sports & Hobbies" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: files,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Map category to categoryId
    const categoryMapping = {
      "home-kitchen": 1,
      "clothes": 2,
      "electronics": 3,
      "books": 4,
      "decor": 5,
      "kids": 6,
      "sports": 7,
    };
    const categoryId = categoryMapping[formData.category] || 1;

    // Create image URLs (placeholder for now)
    const imageUrls = formData.images.length > 0
      ? ["https://via.placeholder.com/400"] // Placeholder for uploaded images
      : ["https://via.placeholder.com/400"];

    // Create new product object
    const newProduct = {
      name: formData.title,
      price: `${formData.price} EGP`,
      condition: "New", // Default
      description: formData.description,
      images: imageUrls,
      installment: "Use for 6 months", // Default
      discount: "0% OFF", // Default
      seller: {
        id: 999, // Default
        name: "Current User", // Default
        avatar: "https://i.pravatar.cc/150?img=50",
        location: "Cairo, Egypt", // Default
      },
      categoryId: categoryId,
    };

    // Add product to mock data
    const addedProduct = addProduct(newProduct);

    // Navigate to the new product's details page
    navigate(`/product/${addedProduct.id}`, { state: { showAlert: true } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Add New Ad
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              Title *
            </Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Enter ad title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="mt-1"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description *
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your item in detail"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="mt-1 min-h-[120px]"
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category" className="text-sm font-medium text-gray-700">
              Category *
            </Label>
            <Select value={formData.category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price" className="text-sm font-medium text-gray-700">
              Price (EGP) *
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              className="mt-1"
            />
          </div>

          {/* Images */}
          <div>
            <Label htmlFor="images" className="text-sm font-medium text-gray-700">
              Images
            </Label>
            <Input
              id="images"
              name="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              You can select multiple images (max 5)
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-medium"
            >
              Post Ad
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAds;
