import React, { useState, useEffect } from 'react';
import { Check, X, Clock, Search, Menu } from 'lucide-react';

export default function Products() {
  const [pendingProducts, setPendingProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const mockPendingProducts = [
      { id: 1, name: 'Apple Watch Ultra', posted: '2023-10-15', category: 'Electronics', price: '$120', userId: 101 },
      { id: 2, name: 'Apple Watch Ultra', posted: '2023-10-15', category: 'Electronics', price: '$120', userId: 102 },
      { id: 3, name: 'Apple Watch Ultra', posted: '2023-10-15', category: 'Electronics', price: '$120', userId: 103 },
      { id: 4, name: 'Apple Watch Ultra', posted: '2023-10-15', category: 'Electronics', price: '$120', userId: 104 },
    ];

    const mockAllProducts = [
      { id: 5, name: 'Apple Watch Ultra', posted: '2023-10-15', category: 'Electronics', price: '$120', userId: 105, status: 'pending' },
      { id: 6, name: 'Apple Watch Ultra', posted: '2023-10-15', category: 'Electronics', price: '$120', userId: 106, status: 'approved' },
      { id: 7, name: 'Apple Watch Ultra', posted: '2023-10-15', category: 'Electronics', price: '$120', userId: 107, status: 'pending' },
      { id: 8, name: 'Apple Watch Ultra', posted: '2023-10-15', category: 'Electronics', price: '$120', userId: 108, status: 'approved' },
    ];

    setPendingProducts(mockPendingProducts);
    setAllProducts(mockAllProducts);
  }, []);

  const handleApprove = (productId) => {
    setPendingProducts(pendingProducts.filter(p => p.id !== productId));
    const product = pendingProducts.find(p => p.id === productId);
    if (product) {
      setAllProducts([...allProducts, { ...product, status: 'approved' }]);
    }
  };

  const handleReject = (productId) => {
    setPendingProducts(pendingProducts.filter(p => p.id !== productId));
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setAllProducts(allProducts.filter(p => p.id !== productToDelete.id));
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const filteredProducts = allProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between md:px-6">
        <div className="flex items-center gap-3">
          <button 
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Product Approvals</h1>
            <p className="text-xs md:text-sm text-gray-500">Review and manage pending product listing</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">XXXXX</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <span className="text-xs md:text-sm font-semibold text-amber-700">HE</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 py-6 md:px-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-50 flex items-center justify-center">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">24</p>
                <p className="text-xs md:text-sm text-gray-500">Pending Reviews</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-50 flex items-center justify-center">
                <Check className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">156</p>
                <p className="text-xs md:text-sm text-gray-500">Approved Product</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-50 flex items-center justify-center">
                <X className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">156</p>
                <p className="text-xs md:text-sm text-gray-500">Rejected Products</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Products Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-4 py-4 md:px-6 md:py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Pending Product Listing</h2>
          </div>
          
          {/* Mobile Cards View */}
          <div className="md:hidden">
            {pendingProducts.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {pendingProducts.map((product) => (
                  <div key={product.id} className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-200 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">Posted: {product.posted}</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                        Pending
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Category</p>
                        <p className="text-sm text-gray-700">{product.category}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Price</p>
                        <p className="text-sm font-semibold text-gray-900">{product.price}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleApprove(product.id)}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded text-xs font-medium bg-green-500 text-white hover:bg-green-600 transition-colors"
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Approve
                      </button>
                      <button 
                        onClick={() => handleReject(product.id)}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded text-xs font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
                      >
                        <X className="w-3 h-3 mr-1" />
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500">No pending products to review</p>
              </div>
            )}
          </div>
          
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Categories</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pendingProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-200 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">Posted: {product.posted}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{product.category}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">{product.price}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleApprove(product.id)}
                          className="inline-flex items-center px-3 py-1.5 rounded text-xs font-medium bg-green-500 text-white hover:bg-green-600 transition-colors"
                        >
                          <Check className="w-3 h-3 mr-1" />
                          Approve
                        </button>
                        <button 
                          onClick={() => handleReject(product.id)}
                          className="inline-flex items-center px-3 py-1.5 rounded text-xs font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3 h-3 mr-1" />
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* All Products Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-4 py-4 md:px-6 md:py-4 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-gray-900">All Product Listing</h2>
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          
          {/* Mobile Cards View */}
          <div className="md:hidden">
            {filteredProducts.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-200 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">Posted: {product.posted}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === 'approved' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {product.status === 'approved' ? 'Approved' : 'Pending'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Category</p>
                        <p className="text-sm text-gray-700">{product.category}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Price</p>
                        <p className="text-sm font-semibold text-gray-900">{product.price}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 rounded text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                        View
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(product)}
                        className="flex-1 px-4 py-2 rounded text-xs font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500">No products found</p>
              </div>
            )}
          </div>
          
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Categories</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-200 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">Posted: {product.posted}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{product.category}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">{product.price}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        product.status === 'approved' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {product.status === 'approved' ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button className="px-4 py-1.5 rounded text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                          View
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(product)}
                          className="px-4 py-1.5 rounded text-xs font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Are you sure to delete it?</h3>
            <p className="text-sm text-gray-600 mb-6">
              This action cannot be undone. The product "{productToDelete?.name}" will be permanently deleted.
            </p>
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}