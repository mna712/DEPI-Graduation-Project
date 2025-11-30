

export const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "iPhone 13 Pro Max - 256GB Gold Edition",
    price: "30,500 EGP",
    condition: "Used",
    description:
      "Used iPhone 13 Pro Max - Pink color, in excellent condition.\nUsed for 8 months only, battery health 90%.\nNo parts have been replaced and everything works perfectly.",
    images: [
      "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611472173362-3f53dbd65d80?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1632633173522-e83ff3e67c5c?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1678652197834-05d6d8b1a0e8?w=600&h=600&fit=crop",
    ],
    installment: "Use for 8 months",
    discount: "40% OFF",
    seller: {
      id: 101,
      name: "John Smith",
      avatar: "https://i.pravatar.cc/150?img=12",
      location: "Cairo, Egypt",
    },
    categoryId: 1,
  },
  {
    id: 2,
    name: "Samsung Galaxy S21 Ultra",
    price: "25,000 EGP",
    condition: "Used",
    description:
      "Samsung Galaxy S21 Ultra 5G - Phantom Black.\nUsed for 1 year, battery health 85%.\nIncludes original box and charger.\nNo scratches or dents.",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop",
    ],
    installment: "Use for 12 months",
    discount: "35% OFF",
    seller: {
      id: 102,
      name: "Sarah Ahmed",
      avatar: "https://i.pravatar.cc/150?img=25",
      location: "Alexandria, Egypt",
    },
    categoryId: 1,
  },
  {
    id: 3,
    name: "MacBook Pro 14 inch M1 Pro",
    price: "45,000 EGP",
    condition: "New",
    description:
      "Brand new MacBook Pro 14 with M1 Pro chip.\n16GB RAM, 512GB SSD.\nSpace Gray color.\nSealed box with full warranty.",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop",
    ],
    installment: "Use for 12 months",
    discount: "20% OFF",
    seller: {
      id: 103,
      name: "Mohamed Ali",
      avatar: "https://i.pravatar.cc/150?img=33",
      location: "Giza, Egypt",
    },
    categoryId: 1,
  },
  {
    id: 4,
    name: "iPad Air 5th Generation",
    price: "20,000 EGP",
    condition: "New",
    description:
      "iPad Air 2022 - 64GB WiFi.\nBlue color, brand new sealed.\nApple warranty included.\nPerfect for students and professionals.",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&h=600&fit=crop",
    ],
    installment: "Use for 6 months",
    discount: "25% OFF",
    seller: {
      id: 104,
      name: "Ahmed Hassan",
      avatar: "https://i.pravatar.cc/150?img=15",
      location: "Cairo, Egypt",
    },
    categoryId: 1,
  },
  {
    id: 5,
    name: "AirPods Pro 2nd Generation",
    price: "8,500 EGP",
    condition: "New",
    description:
      "AirPods Pro 2nd Gen with USB-C.\nActive Noise Cancellation.\nBrand new sealed box.\nOfficial Apple warranty.",
    images: [
      "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=600&h=600&fit=crop",
    ],
    installment: "Use for 4 months",
    discount: "30% OFF",
    seller: {
      id: 105,
      name: "Layla Mahmoud",
      avatar: "https://i.pravatar.cc/150?img=45",
      location: "Cairo, Egypt",
    },
    categoryId: 1,
  },
  {
    id: 6,
    name: "Apple Watch Series 7 GPS",
    price: "12,000 EGP",
    condition: "Used",
    description:
      "Apple Watch Series 7 GPS.\nGreen aluminum case.\nUsed for 6 months, excellent condition.\nIncludes original box and charger.",
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&h=600&fit=crop",
    ],
    installment: "Use for 5 months",
    discount: "28% OFF",
    seller: {
      id: 106,
      name: "Omar Khaled",
      avatar: "https://i.pravatar.cc/150?img=18",
      location: "Cairo, Egypt",
    },
    categoryId: 1,
  },
];

// TODO: لما الـ API يجهز، استبدلي الـ functions دي

// Function لإضافة منتج جديد
export const addProduct = (newProduct) => {
  const newId = MOCK_PRODUCTS.length > 0 ? Math.max(...MOCK_PRODUCTS.map(p => p.id)) + 1 : 1;
  const productWithId = { ...newProduct, id: newId };
  MOCK_PRODUCTS.push(productWithId);
  return productWithId;
};

