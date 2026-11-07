import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

function ProductList({ setCurrentPage }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [addedToCart, setAddedToCart] = useState({});

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482892290-f596e3ab9f2d?w=300", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300", description: "Great for beginners.", cost: "$12" },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7655?w=300", description: "Elegant white blooms.", cost: "$18" },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=300", description: "Loves humidity.", cost: "$14" },
        { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1555353540-64580b51c258?w=300", description: "Shiny thick leaves.", cost: "$22" },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=300", description: "Soothing gel properties.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=300", description: "Calming scent.", cost: "$16" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592417817098-8f3d691a4bf5?w=300", description: "Sweet evening aroma.", cost: "$20" },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1515584854538-2977f88e7d23?w=300", description: "Herbaceous fragrance.", cost: "$12" },
        { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=300", description: "Refreshing minty scent.", cost: "$25" },
        { name: "Geranium", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300", description: "Vibrant and scented.", cost: "$14" },
        { name: "Mint", image: "https://images.unsplash.com/photo-1628556270448-4d627c28dc9e?w=300", description: "Fast-growing aromatic.", cost: "$8" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207256028-0959955a591e?w=300", description: "Thrives on neglect.", cost: "$18" },
        { name: "Pothos", image: "https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=300", description: "Hardy trailing vine.", cost: "$11" },
        { name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1629196911514-cf975aa4e73a?w=300", description: "Nearly indestructible.", cost: "$20" },
        { name: "Succulent Mix", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=300", description: "Requires minimal water.", cost: "$9" },
        { name: "Jade Plant", image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=300", description: "Symbol of good luck.", cost: "$15" },
        { name: "Cactus", image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=300", description: "Desert survivor.", cost: "$13" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prevState => ({ ...prevState, [plant.name]: true }));
  };

  return (
    <div>
      <nav className="navbar">
        <h2 onClick={() => setCurrentPage('landing')} style={{ cursor: 'pointer' }}>Paradise Nursery</h2>
        <div>
          <button onClick={() => setCurrentPage('products')}>Plants</button>
          <button onClick={() => setCurrentPage('cart')}>
            🛒 Cart ({totalCartCount})
          </button>
        </div>
      </nav>

      <div className="product-catalog">
        {plantsArray.map((categoryObj, index) => (
          <div key={index} className="category-section">
            <h2>{categoryObj.category}</h2>
            <div className="plant-grid">
              {categoryObj.plants.map((plant, pIndex) => (
                <div key={pIndex} className="plant-card">
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p>{plant.description}</p>
                  <p className="price">{plant.cost}</p>
                  <button 
                    disabled={addedToCart[plant.name]} 
                    onClick={() => handleAddToCart(plant)}
                  >
                    {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;