import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { 
  FiUpload, 
  FiX,
  FiSave,
  FiArrowLeft
} from 'react-icons/fi';

const AddProduct = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    salePrice: '',
    category: '',
    subCategory: '',
    stock: '',
    sku: '',
    status: 'draft',
    tags: ''
  });
  const [images, setImages] = useState([]);

  // Theme styles
  const cardBg = isDark ? 'bg-slate-900' : 'bg-white';
  const cardBorder = isDark ? 'border-slate-800' : 'border-gray-200';
  const cardText = isDark ? 'text-white' : 'text-gray-900';
  const secondaryText = isDark ? 'text-slate-400' : 'text-gray-500';
  const borderColor = isDark ? 'border-slate-800' : 'border-gray-200';
  const inputBg = isDark ? 'bg-slate-800' : 'bg-gray-50';
  const inputBorder = isDark ? 'border-slate-700' : 'border-gray-300';

  // Sample categories
  const categories = [
    { value: '', label: 'Select Category' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'home', label: 'Home & Kitchen' },
    { value: 'books', label: 'Books' },
    { value: 'sports', label: 'Sports & Fitness' }
  ];

  const subCategories = {
    electronics: [
      { value: '', label: 'Select Sub-category' },
      { value: 'smartphones', label: 'Smartphones' },
      { value: 'laptops', label: 'Laptops' },
      { value: 'headphones', label: 'Headphones' },
      { value: 'cameras', label: 'Cameras' }
    ],
    clothing: [
      { value: '', label: 'Select Sub-category' },
      { value: 'mens', label: "Men's Clothing" },
      { value: 'womens', label: "Women's Clothing" },
      { value: 'kids', label: "Kids' Clothing" }
    ],
    home: [
      { value: '', label: 'Select Sub-category' },
      { value: 'furniture', label: 'Furniture' },
      { value: 'kitchen', label: 'Kitchenware' },
      { value: 'decor', label: 'Home Decor' }
    ],
    books: [
      { value: '', label: 'Select Sub-category' },
      { value: 'fiction', label: 'Fiction' },
      { value: 'nonfiction', label: 'Non-Fiction' },
      { value: 'academic', label: 'Academic' }
    ],
    sports: [
      { value: '', label: 'Select Sub-category' },
      { value: 'fitness', label: 'Fitness' },
      { value: 'outdoor', label: 'Outdoor Sports' },
      { value: 'indoor', label: 'Indoor Games' }
    ]
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product Data:', { ...formData, images });
    // Handle form submission here
    // After successful submission, navigate back to products list
    navigate('/products');
  };

  const handleBack = () => {
    navigate('/products');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${cardText}`}>Add New Product</h1>
          <p className={secondaryText}>Create a new product in your store</p>
        </div>
        <button 
          onClick={handleBack}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Name */}
            <div className={`${cardBg} border ${cardBorder} rounded-lg p-6`}>
              <h3 className={`text-lg font-semibold ${cardText} mb-4`}>Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${cardText} mb-2`}>
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 ${inputBg} border ${inputBorder} rounded-lg ${cardText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${cardText} mb-2`}>
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-3 py-2 ${inputBg} border ${inputBorder} rounded-lg ${cardText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter product description"
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className={`${cardBg} border ${cardBorder} rounded-lg p-6`}>
              <h3 className={`text-lg font-semibold ${cardText} mb-4`}>Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${cardText} mb-2`}>
                    Regular Price *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 ${inputBg} border ${inputBorder} rounded-lg ${cardText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${cardText} mb-2`}>
                    Sale Price
                  </label>
                  <input
                    type="number"
                    name="salePrice"
                    value={formData.salePrice}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 ${inputBg} border ${inputBorder} rounded-lg ${cardText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Inventory */}
            <div className={`${cardBg} border ${cardBorder} rounded-lg p-6`}>
              <h3 className={`text-lg font-semibold ${cardText} mb-4`}>Inventory</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${cardText} mb-2`}>
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 ${inputBg} border ${inputBorder} rounded-lg ${cardText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${cardText} mb-2`}>
                    SKU *
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 ${inputBg} border ${inputBorder} rounded-lg ${cardText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Product SKU"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div className={`${cardBg} border ${cardBorder} rounded-lg p-6`}>
              <h3 className={`text-lg font-semibold ${cardText} mb-4`}>Status</h3>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 ${inputBg} border ${inputBorder} rounded-lg ${cardText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
              </select>
            </div>

            {/* Categories */}
            <div className={`${cardBg} border ${cardBorder} rounded-lg p-6`}>
              <h3 className={`text-lg font-semibold ${cardText} mb-4`}>Categories</h3>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${cardText} mb-2`}>
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 ${inputBg} border ${inputBorder} rounded-lg ${cardText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${cardText} mb-2`}>
                    Sub-category
                  </label>
                  <select
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 ${inputBg} border ${inputBorder} rounded-lg ${cardText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    {(subCategories[formData.category] || [{ value: '', label: 'Select Sub-category' }]).map(subCat => (
                      <option key={subCat.value} value={subCat.value}>
                        {subCat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className={`${cardBg} border ${cardBorder} rounded-lg p-6`}>
              <h3 className={`text-lg font-semibold ${cardText} mb-4`}>Tags</h3>
              <div>
                <label className={`block text-sm font-medium ${cardText} mb-2`}>
                  Product Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 ${inputBg} border ${inputBorder} rounded-lg ${cardText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Separate tags with commas"
                />
                <p className={`text-xs ${secondaryText} mt-2`}>
                  Separate tags with commas (e.g., wireless, bluetooth, audio)
                </p>
              </div>
            </div>

            {/* Product Images */}
            <div className={`${cardBg} border ${cardBorder} rounded-lg p-6`}>
              <h3 className={`text-lg font-semibold ${cardText} mb-4`}>Product Images</h3>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-lg p-6 text-center">
                  <FiUpload className={`w-8 h-8 mx-auto ${secondaryText} mb-2`} />
                  <p className={`text-sm ${cardText} mb-2`}>Drop images here or click to upload</p>
                  <p className={`text-xs ${secondaryText} mb-4`}>PNG, JPG, GIF up to 10MB</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
                  >
                    Select Images
                  </label>
                </div>

                {/* Image Previews */}
                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {images.map(image => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.preview}
                          alt="Preview"
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Publish Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <FiSave className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;