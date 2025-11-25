import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import ProductsList from './pages/Products/ProductsList';
import AddProduct from './pages/Products/AddProduct';
import EditProduct from './pages/Products/EditProduct';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/edit/:id" element={<EditProduct />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;