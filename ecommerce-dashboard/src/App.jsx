import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Dashboard />
      </Layout>
    </ThemeProvider>
  );
}

export default App;