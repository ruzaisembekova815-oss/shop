import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import CartItem from './CartItem';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'products', 'cart'

  const handleGetStartedClick = () => {
    setCurrentPage('products');
  };

  return (
    <div className="app-container">
      {currentPage === 'landing' && (
        <div className="landing-page">
          <div className="landing-content">
            <h1>Paradise Nursery</h1>
            <p>Where Green Meets Serenity. Discover plants that purify your air and brighten your space.</p>
            <AboutUs />
            <button className="get-started-button" onClick={handleGetStartedClick}>
              Get Started
            </button>
          </div>
        </div>
      )}

      {currentPage === 'products' && (
        <ProductList setCurrentPage={setCurrentPage} />
      )}

      {currentPage === 'cart' && (
        <CartItem setCurrentPage={setCurrentPage} />
      )}
    </div>
  );
}

export default App;