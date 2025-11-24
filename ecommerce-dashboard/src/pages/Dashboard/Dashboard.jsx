import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  FiEye,
  FiAlertTriangle,
  FiTrendingUp,
  FiUsers,
  FiShoppingCart,
  FiDollarSign
} from 'react-icons/fi';

const Dashboard = () => {
  const { isDark } = useTheme();
  const [timeRange, setTimeRange] = useState('monthly');
  const [chartType, setChartType] = useState('line');

  // Theme styles - Fixed text colors for dark/light mode
  const cardBg = isDark ? 'bg-slate-900' : 'bg-white';
  const cardBorder = isDark ? 'border-slate-800' : 'border-gray-200';
  const cardText = isDark ? 'text-white' : 'text-gray-900';
  const secondaryText = isDark ? 'text-slate-400' : 'text-gray-500';
  const borderColor = isDark ? 'border-slate-800' : 'border-gray-200';
  const hoverBg = isDark ? 'hover:bg-slate-800' : 'hover:bg-gray-50';

  // KPI Stats Data
  const stats = [
    { 
      name: 'Total Sales', 
      value: '₹2,45,231', 
      change: '+20.1%', 
      color: 'text-emerald-600',
      icon: <FiDollarSign className="w-5 h-5 md:w-6 md:h-6" />
    },
    { 
      name: 'Total Orders', 
      value: '2,350', 
      change: '+180.1%', 
      color: 'text-sky-600',
      icon: <FiShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
    },
    { 
      name: 'Total Customers', 
      value: '12,234', 
      change: '+19%', 
      color: 'text-violet-600',
      icon: <FiUsers className="w-5 h-5 md:w-6 md:h-6" />
    },
    { 
      name: "Today's Revenue", 
      value: '₹45,231', 
      change: '+12.4%', 
      color: 'text-amber-600',
      icon: <FiTrendingUp className="w-5 h-5 md:w-6 md:h-6" />
    },
    { 
      name: 'Monthly Revenue', 
      value: '₹8,45,231', 
      change: '+25.8%', 
      color: 'text-rose-600',
      icon: <FiDollarSign className="w-5 h-5 md:w-6 md:h-6" />
    },
    { 
      name: 'Conversion Rate', 
      value: '3.2%', 
      change: '+2.1%', 
      color: 'text-green-600',
      icon: <FiTrendingUp className="w-5 h-5 md:w-6 md:h-6" />
    },
  ];

  // Revenue Chart Data
  const revenueData = {
    daily: [
      { name: 'Mon', revenue: 4000 },
      { name: 'Tue', revenue: 3000 },
      { name: 'Wed', revenue: 2000 },
      { name: 'Thu', revenue: 2780 },
      { name: 'Fri', revenue: 1890 },
      { name: 'Sat', revenue: 2390 },
      { name: 'Sun', revenue: 3490 },
    ],
    weekly: [
      { name: 'Week 1', revenue: 12000 },
      { name: 'Week 2', revenue: 15000 },
      { name: 'Week 3', revenue: 18000 },
      { name: 'Week 4', revenue: 22000 },
    ],
    monthly: [
      { name: 'Jan', revenue: 40000 },
      { name: 'Feb', revenue: 45000 },
      { name: 'Mar', revenue: 52000 },
      { name: 'Apr', revenue: 48000 },
      { name: 'May', revenue: 55000 },
      { name: 'Jun', revenue: 60000 },
    ]
  };

  // Top Selling Products
  const topProducts = [
    { id: 1, name: 'Wireless Headphones', image: '🎧', quantity: 1245, earnings: '₹1,24,500' },
    { id: 2, name: 'Smart Watch', image: '⌚', quantity: 987, earnings: '₹2,96,100' },
    { id: 3, name: 'Laptop Backpack', image: '🎒', quantity: 756, earnings: '₹75,600' },
    { id: 4, name: 'Bluetooth Speaker', image: '🔊', quantity: 654, earnings: '₹98,100' },
    { id: 5, name: 'Phone Case', image: '📱', quantity: 543, earnings: '₹27,150' },
  ];

  // Recent Orders
  const recentOrders = [
    { id: '#1001', customer: 'Aarav Sharma', status: 'Delivered', amount: '₹4,599', date: '2024-01-15' },
    { id: '#1002', customer: 'Priya Patel', status: 'Processing', amount: '₹12,999', date: '2024-01-15' },
    { id: '#1003', customer: 'Rohan Kumar', status: 'Shipped', amount: '₹7,299', date: '2024-01-14' },
    { id: '#1004', customer: 'Neha Singh', status: 'Delivered', amount: '₹3,499', date: '2024-01-14' },
    { id: '#1005', customer: 'Vikram Joshi', status: 'Cancelled', amount: '₹15,999', date: '2024-01-13' },
  ];

  // Low Stock Alerts
  const lowStock = [
    { id: 1, name: 'Gaming Mouse', stock: 3 },
    { id: 2, name: 'USB Cable', stock: 5 },
    { id: 3, name: 'Phone Charger', stock: 2 },
    { id: 4, name: 'Keyboard', stock: 4 },
  ];

  // Status colors - Fixed for dark/light mode
  const getStatusColor = (status) => {
    const colors = {
      Delivered: isDark ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800',
      Processing: isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800',
      Shipped: isDark ? 'bg-amber-900 text-amber-200' : 'bg-amber-100 text-amber-800',
      Cancelled: isDark ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800',
    };
    return colors[status] || colors.Processing;
  };

  // Chart colors - Fixed for dark/light mode
  const chartColors = {
    revenue: isDark ? '#3b82f6' : '#2563eb',
    grid: isDark ? '#374151' : '#e5e7eb',
    tooltipBg: isDark ? '#1f2937' : '#ffffff',
    tooltipText: isDark ? '#f3f4f6' : '#111827',
    axisText: isDark ? '#9ca3af' : '#6b7280',
  };

  // Button text colors for toggle buttons
  const getToggleButtonClass = (isActive, range) => {
    const baseClass = "px-2 md:px-3 py-1 rounded-md capitalize text-xs md:text-sm transition-all duration-200";
    
    if (isActive) {
      return `${baseClass} bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm`;
    } else {
      return `${baseClass} text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-slate-700/50`;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Section 1: KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`${cardBg} border ${cardBorder} rounded-lg md:rounded-xl p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow`}>
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <div className={`p-1.5 md:p-2 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-gray-100'}`}>
                {stat.icon}
              </div>
            </div>
            <div>
              <p className={`${secondaryText} text-xs font-medium`}>{stat.name}</p>
              <p className={`text-lg md:text-xl font-bold ${cardText} mt-1`}>{stat.value}</p>
            </div>
            <div className="mt-2 md:mt-3">
              <span className={`text-xs font-medium ${stat.color}`}>
                {stat.change}
              </span>
              <span className={`${secondaryText} text-xs ml-1`}>from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        {/* Section 2: Revenue Chart */}
        <div className={`${cardBg} border ${cardBorder} rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm xl:col-span-2`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6">
            <h3 className={`text-base md:text-lg font-semibold ${cardText} mb-2 sm:mb-0`}>Revenue Analytics</h3>
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="flex bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
                {['daily', 'weekly', 'monthly'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={getToggleButtonClass(timeRange === range, range)}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <div className="flex bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
                {['line', 'bar'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setChartType(type)}
                    className={getToggleButtonClass(chartType === type, type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'line' ? (
                <LineChart data={revenueData[timeRange]}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                  <XAxis 
                    dataKey="name" 
                    stroke={chartColors.axisText}
                    fontSize={10}
                    tick={{ fill: chartColors.axisText }}
                  />
                  <YAxis 
                    stroke={chartColors.axisText}
                    fontSize={10}
                    tick={{ fill: chartColors.axisText }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: chartColors.tooltipBg,
                      color: chartColors.tooltipText,
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      fontSize: '12px'
                    }}
                    formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke={chartColors.revenue}
                    strokeWidth={2}
                    dot={{ fill: chartColors.revenue, strokeWidth: 2, r: 3 }}
                    activeDot={{ r: 5, fill: chartColors.revenue }}
                  />
                </LineChart>
              ) : (
                <BarChart data={revenueData[timeRange]}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                  <XAxis 
                    dataKey="name" 
                    stroke={chartColors.axisText}
                    fontSize={10}
                    tick={{ fill: chartColors.axisText }}
                  />
                  <YAxis 
                    stroke={chartColors.axisText}
                    fontSize={10}
                    tick={{ fill: chartColors.axisText }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: chartColors.tooltipBg,
                      color: chartColors.tooltipText,
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      fontSize: '12px'
                    }}
                    formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill={chartColors.revenue} 
                    radius={[2, 2, 0, 0]} 
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Section 5: Low Stock Alerts */}
        <div className={`${cardBg} border ${cardBorder} rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm`}>
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h3 className={`text-base md:text-lg font-semibold ${cardText}`}>Low Stock Alerts</h3>
            <FiAlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
          </div>
          <div className="space-y-2 md:space-y-3">
            {lowStock.map((product) => (
              <div key={product.id} className={`flex items-center justify-between p-2 md:p-3 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-amber-50'} border ${isDark ? 'border-slate-700' : 'border-amber-200'}`}>
                <div>
                  <p className={`font-medium ${cardText} text-sm md:text-base`}>{product.name}</p>
                  <p className={`text-xs md:text-sm ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                    Only {product.stock} left in stock
                  </p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-amber-900 text-amber-200' : 'bg-amber-500 text-white'}`}>
                  Low Stock
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Section 3: Top Selling Products */}
        <div className={`${cardBg} border ${cardBorder} rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm`}>
          <h3 className={`text-base md:text-lg font-semibold ${cardText} mb-3 md:mb-4`}>Top Selling Products</h3>
          <div className="space-y-3 md:space-y-4">
            {topProducts.map((product) => (
              <div key={product.id} className={`flex items-center space-x-3 md:space-x-4 py-2 md:py-3 border-b ${borderColor} last:border-b-0`}>
                <div className={`w-10 h-10 md:w-12 md:h-12 ${isDark ? 'bg-slate-800' : 'bg-gray-100'} rounded-lg flex items-center justify-center text-lg md:text-xl`}>
                  {product.image}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`${cardText} font-medium text-sm md:text-base truncate`}>{product.name}</p>
                  <p className={`${secondaryText} text-xs md:text-sm`}>{product.quantity} sold</p>
                </div>
                <div className="text-right">
                  <p className={`${cardText} font-medium text-sm md:text-base`}>{product.earnings}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Recent Orders */}
        <div className={`${cardBg} border ${cardBorder} rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm`}>
          <h3 className={`text-base md:text-lg font-semibold ${cardText} mb-3 md:mb-4`}>Recent Orders</h3>
          <div className="space-y-2 md:space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className={`flex items-center justify-between p-2 md:p-3 rounded-lg border ${borderColor} ${hoverBg} transition-colors`}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1 md:mb-2">
                    <p className={`${cardText} font-medium text-sm md:text-base truncate`}>{order.id}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)} whitespace-nowrap ml-2`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className={`${secondaryText} text-xs md:text-sm truncate`}>{order.customer}</p>
                      <p className={`${secondaryText} text-xs`}>{order.date}</p>
                    </div>
                    <div className="flex items-center space-x-1 md:space-x-2">
                      <p className={`${cardText} font-medium text-sm md:text-base whitespace-nowrap`}>{order.amount}</p>
                      <button className={`p-1 rounded ${isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}>
                        <FiEye className={`w-3 h-3 md:w-4 md:h-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                      </button>
                    </div>
                  </div>  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;