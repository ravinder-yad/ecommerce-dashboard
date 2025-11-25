import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { 
  FiSearch, 
  FiEdit, 
  FiTrash2, 
  FiEye, 
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiArrowUp,
  FiArrowDown
} from 'react-icons/fi';

const ProductsList = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const productsPerPage = 8;

  // Theme styles
  const cardBg = isDark ? 'bg-slate-900' : 'bg-white';
  const cardBorder = isDark ? 'border-slate-800' : 'border-gray-200';
  const cardText = isDark ? 'text-white' : 'text-gray-900';
  const secondaryText = isDark ? 'text-slate-400' : 'text-gray-500';
  const borderColor = isDark ? 'border-slate-800' : 'border-gray-200';
  const hoverBg = isDark ? 'hover:bg-slate-800' : 'hover:bg-gray-50';
  const inputBg = isDark ? 'bg-slate-800' : 'bg-gray-50';
  const inputBorder = isDark ? 'border-slate-700' : 'border-gray-300';

  // Sample products data
  const products = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      category: 'Electronics',
      price: 2999,
      salePrice: 2499,
      stock: 45,
      status: 'In Stock',
      image: '🎧',
      sku: 'WH-001',
      tags: ['wireless', 'bluetooth', 'audio']
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      category: 'Electronics',
      price: 8999,
      salePrice: 7999,
      stock: 0,
      status: 'Out of Stock',
      image: '⌚',
      sku: 'SFW-002',
      tags: ['fitness', 'smartwatch', 'health']
    },
    {
      id: 3,
      name: 'Laptop Backpack',
      category: 'Accessories',
      price: 1999,
      salePrice: null,
      stock: 120,
      status: 'In Stock',
      image: '🎒',
      sku: 'LB-003',
      tags: ['bag', 'laptop', 'travel']
    },
    {
      id: 4,
      name: 'USB-C Charging Cable',
      category: 'Electronics',
      price: 499,
      salePrice: 399,
      stock: 200,
      status: 'In Stock',
      image: '🔌',
      sku: 'UCC-004',
      tags: ['cable', 'charging', 'usb-c']
    },
    {
      id: 5,
      name: 'Mechanical Keyboard',
      category: 'Electronics',
      price: 4599,
      salePrice: 3999,
      stock: 15,
      status: 'Low Stock',
      image: '⌨️',
      sku: 'MK-005',
      tags: ['keyboard', 'gaming', 'mechanical']
    },
    {
      id: 6,
      name: 'Phone Case',
      category: 'Accessories',
      price: 799,
      salePrice: 599,
      stock: 0,
      status: 'Out of Stock',
      image: '📱',
      sku: 'PC-006',
      tags: ['case', 'protection', 'phone']
    },
    {
      id: 7,
      name: 'Wireless Mouse',
      category: 'Electronics',
      price: 1299,
      salePrice: 999,
      stock: 80,
      status: 'In Stock',
      image: '🖱️',
      sku: 'WM-007',
      tags: ['mouse', 'wireless', 'computer']
    },
    {
      id: 8,
      name: 'Tablet Stand',
      category: 'Accessories',
      price: 899,
      salePrice: null,
      stock: 60,
      status: 'In Stock',
      image: '📱',
      sku: 'TS-008',
      tags: ['stand', 'tablet', 'holder']
    }
  ];

  // Categories for filter
  const categories = ['all', 'Electronics', 'Accessories', 'Clothing', 'Home'];
  const statusOptions = ['all', 'In Stock', 'Out of Stock', 'Low Stock'];

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'price') {
        aValue = a.salePrice || a.price;
        bValue = b.salePrice || b.price;
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <FiArrowUp className="w-4 h-4" /> : <FiArrowDown className="w-4 h-4" />;
  };

  const getStatusColor = (status) => {
    const colors = {
      'In Stock': isDark ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800',
      'Out of Stock': isDark ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800',
      'Low Stock': isDark ? 'bg-amber-900 text-amber-200' : 'bg-amber-100 text-amber-800'
    };
    return colors[status] || colors['In Stock'];
  };

  const handleAddProduct = () => {
    navigate('/products/add');
  };

  const handleEditProduct = (productId) => {
    navigate(`/products/edit/${productId}`);
  };

  const handleViewProduct = (productId) => {
    // Navigate to view product page or show modal
    console.log('View product:', productId);
  };

  const handleDeleteProduct = (productId) => {
    // Handle delete product logic
    if (window.confirm('Are you sure you want to delete this product?')) {
      console.log('Delete product:', productId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${cardText}`}>Products</h1>
          <p className={secondaryText}>Manage your product inventory</p>
        </div>
        <button 
          onClick={handleAddProduct}
          className="mt-4 sm:mt-0 flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className={`${cardBg} border ${cardBorder} rounded-lg p-4 md:p-6`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-slate-400' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 ${inputBg} border ${inputBorder} rounded-lg ${cardText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`w-full px-3 py-2 ${inputBg} border ${inputBorder} rounded-lg ${cardText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className={`w-full px-3 py-2 ${inputBg} border ${inputBorder} rounded-lg ${cardText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className={`${cardBg} border ${cardBorder} rounded-lg overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${isDark ? 'bg-slate-800' : 'bg-gray-50'}`}>
              <tr>
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center space-x-2">
                    <span>Product</span>
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left cursor-pointer hover:bg-slate-700/50 transition-colors"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center space-x-2">
                    <span>Category</span>
                    {getSortIcon('category')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left cursor-pointer hover:bg-slate-700/50 transition-colors"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center space-x-2">
                    <span>Price</span>
                    {getSortIcon('price')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left cursor-pointer hover:bg-slate-700/50 transition-colors"
                  onClick={() => handleSort('stock')}
                >
                  <div className="flex items-center space-x-2">
                    <span>Stock</span>
                    {getSortIcon('stock')}
                  </div>
                </th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-800">
              {currentProducts.map((product) => (
                <tr key={product.id} className={`${hoverBg} transition-colors`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${isDark ? 'bg-slate-800' : 'bg-gray-100'} rounded-lg flex items-center justify-center text-lg`}>
                        {product.image}
                      </div>
                      <div>
                        <p className={`font-medium ${cardText}`}>{product.name}</p>
                        <p className={`text-sm ${secondaryText}`}>SKU: {product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cardText}>{product.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      {product.salePrice ? (
                        <>
                          <span className={`font-medium ${cardText}`}>₹{product.salePrice}</span>
                          <span className={`text-sm line-through ml-2 ${secondaryText}`}>₹{product.price}</span>
                        </>
                      ) : (
                        <span className={`font-medium ${cardText}`}>₹{product.price}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cardText}>{product.stock}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewProduct(product.id)}
                        className={`p-1.5 rounded ${isDark ? 'hover:bg-slate-700 text-blue-400' : 'hover:bg-gray-100 text-blue-600'}`}
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditProduct(product.id)}
                        className={`p-1.5 rounded ${isDark ? 'hover:bg-slate-700 text-green-400' : 'hover:bg-gray-100 text-green-600'}`}
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className={`p-1.5 rounded ${isDark ? 'hover:bg-slate-700 text-red-400' : 'hover:bg-gray-100 text-red-600'}`}
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={`px-4 py-3 border-t ${borderColor} flex items-center justify-between`}>
          <div>
            <p className={`text-sm ${secondaryText}`}>
              Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} results
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg border ${inputBorder} ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : hoverBg}`}
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg border ${inputBorder} ${
                  currentPage === page 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : hoverBg
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg border ${inputBorder} ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : hoverBg}`}
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;