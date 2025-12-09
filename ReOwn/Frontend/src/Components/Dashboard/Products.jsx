import React, { useState } from 'react';
<<<<<<< HEAD
import { User, ShoppingBag, FileText } from 'lucide-react';

// Default data (from your JSON)
const defaultData = {
  admin: {
    name: "Ahmed Ali",
    role: "Admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hana"
  },
  stats: [
    { id: 1, icon: "user", label: "Total Users", value: "1,245" },
    { id: 2, icon: "shopping", label: "Total Products", value: "748" },
    { id: 3, icon: "file", label: "Reports", value: "90" }
  ],
  saleGraph: {
    tabs: ["Weekly", "Monthly", "Yearly"],
    defaultTab: "Monthly",
    Weekly: { data: [ { date: "Mon", value: 85 }, { date: "Tue", value: 95 }, { date: "Wed", value: 110 }, { date: "Thu", value: 90 }, { date: "Fri", value: 130 }, { date: "Sat", value: 150 }, { date: "Sun", value: 120 } ] },
    Monthly: { data: [ { date: "Apr 23", value: 110 }, { date: "Apr 24", value: 120 }, { date: "Apr 25", value: 135 }, { date: "Apr 26", value: 140 }, { date: "Apr 27", value: 150 }, { date: "Apr 28", value: 135 }, { date: "Apr 29", value: 170 } ] },
    Yearly: { data: [ { date: "Jan", value: 100 }, { date: "Feb", value: 115 }, { date: "Mar", value: 125 }, { date: "Apr", value: 140 }, { date: "May", value: 155 }, { date: "Jun", value: 145 }, { date: "Jul", value: 160 } ] }
  },
  recentActivities: [
    { id: 1, type: "product", title: "New Product Added", user: "Michael Brown", date: "2024-2-14 8:23 am" },
    { id: 2, type: "user", title: "New User Registered", user: "Sarah Johnson", date: "2024-2-14 8:23 am" },
    { id: 3, type: "product", title: "New Product Added", user: "David Wilson", date: "2024-2-14 8:23 am" },
    { id: 4, type: "user", title: "New User Registered", user: "Emma Davis", date: "2024-2-14 8:23 am" }
  ]
};

function Overview({ data = defaultData }) {
  const [activeTab, setActiveTab] = useState(data.saleGraph.defaultTab);
  const currentChartData = data.saleGraph[activeTab]?.data || [];

  const getStatIcon = (iconName) => {
    const className = "w-5 h-5 text-gray-600";
    const icons = {
      user: <User className={className} />,
      shopping: <ShoppingBag className={className} />,
      file: <FileText className={className} />
    };
    return icons[iconName];
  };

  const getActivityIcon = (type) => type === 'product' 
    ? <ShoppingBag className="w-5 h-5 text-green-700" /> 
    : <User className="w-5 h-5 text-green-700" />;

  const generatePath = (data) => {
    return data.map((item, index) => {
      const x = 60 + index * 60;
      const y = 180 - (item.value * 0.8);
      return `${index === 0 ? 'M' : 'L'} ${x},${y}`;
    }).join(' ');
  };

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Overview</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{data.admin.name}</span>
          <img src={data.admin.avatar} alt="Admin" className="w-10 h-10 rounded-full" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {data.stats.map(stat => (
          <div key={stat.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                {getStatIcon(stat.icon)}
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sale Graph */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Sale Graph</h2>
          <div className="flex gap-2">
            {data.saleGraph.tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-sm rounded-lg transition-colors ${
                  activeTab === tab 
                    ? 'bg-teal-500 text-white' 
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="relative h-48">
          <svg className="w-full h-full" viewBox="0 0 600 200">
            <text x="10" y="20" className="text-xs fill-gray-500">200</text>
            <text x="10" y="70" className="text-xs fill-gray-500">150</text>
            <text x="10" y="120" className="text-xs fill-gray-500">100</text>
            <text x="10" y="170" className="text-xs fill-gray-500">50</text>
            <path d={generatePath(currentChartData)} fill="none" stroke="#06b6d4" strokeWidth="2"/>
            {currentChartData.map((item, i) => (
              <text key={i} x={60 + i * 60} y="195" className="text-xs fill-gray-500">{item.date}</text>
            ))}
          </svg>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h2>
        <div className="space-y-3">
          {data.recentActivities.map(activity => (
            <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-100">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-800">{activity.title}</div>
                <div className="text-sm text-gray-500">{activity.user} • {activity.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Overview;
=======
import { Trash2, Edit, Plus, X, Search } from 'lucide-react';

const ProductsPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: "1500 EGP",
      category: "Electronics",
      seller: "John Smith",
      status: "Active",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=150&h=150&fit=crop",
      created: "2024-01-15"
    },
    {
      id: 2,
      name: "MacBook Pro M3",
      price: "2500 EGP",
      category: "Electronics",
      seller: "Sarah Johnson",
      status: "Active",
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=150&h=150&fit=crop",
      created: "2024-01-14"
    },
    {
      id: 3,
      name: "Nike Air Max",
      price: "300 EGP",
      category: "Fashion",
      seller: "Mike Wilson",
      status: "Sold",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=150&h=150&fit=crop",
      created: "2024-01-13"
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingProduct, setEditingProduct] = useState(null);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || product.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleEditProduct = (product) => {
    setEditingProduct({...product});
    setShowAddForm(false);
  };

  const handleUpdateProduct = () => {
    if (editingProduct.name && editingProduct.price) {
      setProducts(products.map(product =>
        product.id === editingProduct.id ? editingProduct : product
      ));
      setEditingProduct(null);
    }
  };

  const handleToggleStatus = (id) => {
    setProducts(products.map(product =>
      product.id === id
        ? { ...product, status: product.status === 'Active' ? 'Sold' : 'Active' }
        : product
    ));
  };

  return (
    <>
        {/* Header */}
        <div className="bg-white shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Products Management</h1>
            <div className="flex items-center space-x-3">
              <span className="font-semibold">Hana Elsendy</span>
              <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
                <span className="text-sm">👩</span>
              </div>
              <span className="text-sm text-gray-500">Admin</span>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="sold">Sold</option>
            </select>
          </div>
        </div>

        <div className="p-6">
          {/* Edit Product Form */}
          {editingProduct && (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Edit Product</h2>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Product Name</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Price</label>
                  <input
                    type="text"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Category</label>
                  <input
                    type="text"
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Seller</label>
                  <input
                    type="text"
                    value={editingProduct.seller}
                    onChange={(e) => setEditingProduct({ ...editingProduct, seller: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setEditingProduct(null)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateProduct}
                  className="px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
                >
                  Update Product
                </button>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800">{product.name}</h3>
                    <p className="text-teal-600 font-bold text-lg mb-1">{product.price}</p>
                    <p className="text-sm text-gray-500 mb-1">Category: {product.category}</p>
                    <p className="text-sm text-gray-500 mb-1">Seller: {product.seller}</p>
                    <p className="text-sm text-gray-500 mb-3">Created: {product.created}</p>

                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {product.status}
                      </span>
                      <button
                        onClick={() => handleToggleStatus(product.id)}
                        className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                      >
                        {product.status === 'Active' ? 'Mark Sold' : 'Mark Active'}
                      </button>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="flex-1 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1"
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="flex-1 p-2 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center space-x-1"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                        <span className="text-sm text-red-600">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
                <Search className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Products Found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
    </>
  );
};

export default ProductsPage;
>>>>>>> 8310b9d6 (updating)
