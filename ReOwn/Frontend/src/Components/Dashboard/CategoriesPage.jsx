import React, { useState } from 'react';
import { Trash2, Edit, Plus, X } from 'lucide-react';
<<<<<<< HEAD
import Sidebar from './Sidebar';
=======
>>>>>>> 8310b9d6 (updating)

const CategoriesPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    title: '',
    image: ''
  });
  const [editingCategory, setEditingCategory] = useState(null);

  const handleAddCategory = () => {
    if (newCategory.title && newCategory.image) {
      const category = {
        id: categories.length + 1,
        title: newCategory.title,
        image: newCategory.image,
        created: new Date().toISOString().split('T')[0],
        products: Math.floor(Math.random() * 50) + 1 // إضافة عدد عشوائي للمنتجات
      };
      setCategories([...categories, category]);
      setNewCategory({ title: '', image: '' });
      setShowAddForm(false);
    }
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const handleEditCategory = (category) => {
    setEditingCategory({...category});
    setShowAddForm(false);
  };

  const handleUpdateCategory = () => {
    if (editingCategory.title && editingCategory.image) {
<<<<<<< HEAD
      setCategories(categories.map(cat => 
=======
      setCategories(categories.map(cat =>
>>>>>>> 8310b9d6 (updating)
        cat.id === editingCategory.id ? editingCategory : cat
      ));
      setEditingCategory(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  const handleImageUpload = (e, isEditing = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEditing) {
          setEditingCategory({ ...editingCategory, image: reader.result });
        } else {
          setNewCategory({ ...newCategory, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShowAddForm = () => {
    setShowAddForm(true);
    setEditingCategory(null);
    setNewCategory({ title: '', image: '' });
  };

  return (
<<<<<<< HEAD
    <div className="flex h-screen bg-gray-50">
      {/* السايدبار */}
      <Sidebar />
      
      {/* المحتوى الرئيسي */}
      <div className="flex-1 overflow-y-auto">
        {/* الهيدر */}
        <div className="bg-white shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Categories Management</h1>
            <div className="flex items-center space-x-3">
              <span className="font-semibold">Hana Elsendy</span>
              <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
                <span className="text-sm">👩</span>
              </div>
              <span className="text-sm text-gray-500">Admin</span>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <button
              onClick={handleShowAddForm}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Category</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* نموذج تعديل الفئة */}
          {editingCategory && (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Edit Category</h2>
                <button 
                  onClick={handleCancelEdit}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Category Title</label>
                  <input
                    type="text"
                    value={editingCategory.title}
                    onChange={(e) => setEditingCategory({ ...editingCategory, title: e.target.value })}
                    placeholder="Enter category title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Category Image</label>
                  <div className="flex items-start space-x-4">
                    <label className="w-20 h-20 border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 overflow-hidden">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, true)}
                        className="hidden"
                      />
                      {editingCategory.image ? (
                        <img src={editingCategory.image} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                    </label>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Click to upload an image</p>
                      <p className="text-xs text-gray-400">Recommended: 400x400px</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={handleCancelEdit}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateCategory}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Update Category
                  </button>
                </div>
              </div>
            </div>
          )}

          {showAddForm && !editingCategory && (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Add New Category</h2>
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Category Title</label>
                  <input
                    type="text"
                    value={newCategory.title}
                    onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
                    placeholder="Enter category title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Category Image</label>
                  <div className="flex items-start space-x-4">
                    <label className="w-20 h-20 border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 overflow-hidden">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, false)}
                        className="hidden"
                      />
                      {newCategory.image ? (
                        <img src={newCategory.image} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                    </label>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Click to upload an image</p>
                      <p className="text-xs text-gray-400">Recommended: 400x400px</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCategory}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Add Category
                  </button>
                </div>
              </div>
            </div>
          )}

          {categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category) => (
                <div key={category.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800">{category.title}</h3>
                    <p className="text-sm text-gray-500 mb-1">Created: {category.created}</p>
                    <p className="text-sm text-gray-500 mb-4">{category.products} Products</p>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditCategory(category)}
                        className="flex-1 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1"
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Edit</span>
                      </button>
                      <button 
                        onClick={() => handleDeleteCategory(category.id)}
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
            !showAddForm && !editingCategory && (
              <div className="text-center py-20">
                <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="7" height="7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="14" y="3" width="7" height="7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="14" y="14" width="7" height="7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="3" y="14" width="7" height="7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Categories Yet</h3>
                <p className="text-gray-500 mb-6">Start by adding your first category to organize your products</p>
                <button
                  onClick={handleShowAddForm}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium inline-flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Your First Category</span>
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
=======
    <>
      {/* Header */}
      <div className="bg-white shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Categories Management</h1>
          <div className="flex items-center space-x-3">
            <span className="font-semibold">Hana Elsendy</span>
            <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
              <span className="text-sm">👩</span>
            </div>
            <span className="text-sm text-gray-500">Admin</span>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleShowAddForm}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* نموذج تعديل الفئة */}
        {editingCategory && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Category</h2>
              <button
                onClick={handleCancelEdit}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Category Title</label>
                <input
                  type="text"
                  value={editingCategory.title}
                  onChange={(e) => setEditingCategory({ ...editingCategory, title: e.target.value })}
                  placeholder="Enter category title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Category Image</label>
                <div className="flex items-start space-x-4">
                  <label className="w-20 h-20 border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 overflow-hidden">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, true)}
                      className="hidden"
                    />
                    {editingCategory.image ? (
                      <img src={editingCategory.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </label>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Click to upload an image</p>
                    <p className="text-xs text-gray-400">Recommended: 400x400px</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleCancelEdit}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateCategory}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Update Category
                </button>
              </div>
            </div>
          </div>
        )}

        {showAddForm && !editingCategory && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Category</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Category Title</label>
                <input
                  type="text"
                  value={newCategory.title}
                  onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
                  placeholder="Enter category title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Category Image</label>
                <div className="flex items-start space-x-4">
                  <label className="w-20 h-20 border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 overflow-hidden">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, false)}
                      className="hidden"
                    />
                    {newCategory.image ? (
                      <img src={newCategory.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </label>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Click to upload an image</p>
                    <p className="text-xs text-gray-400">Recommended: 400x400px</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCategory}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>
        )}

        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">{category.title}</h3>
                  <p className="text-sm text-gray-500 mb-1">Created: {category.created}</p>
                  <p className="text-sm text-gray-500 mb-4">{category.products} Products</p>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="flex-1 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
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
          !showAddForm && !editingCategory && (
            <div className="text-center py-20">
              <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="14" y="3" width="7" height="7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="14" y="14" width="7" height="7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="3" y="14" width="7" height="7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Categories Yet</h3>
              <p className="text-gray-500 mb-6">Start by adding your first category to organize your products</p>
              <button
                onClick={handleShowAddForm}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium inline-flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Your First Category</span>
              </button>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default CategoriesPage;
>>>>>>> 8310b9d6 (updating)
