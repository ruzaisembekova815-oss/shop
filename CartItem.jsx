import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ setCurrentPage }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // Calculate total amount for all items in cart
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const priceNum = parseFloat(item.cost.replace('$', ''));
      return total + priceNum * item.quantity;
    }, 0).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert("Coming Soon! Future functionality under development.");
  };

  return (
    <div className="cart-container">
      <nav className="navbar">
        <h2 onClick={() => setCurrentPage('landing')} style={{ cursor: 'pointer' }}>Paradise Nursery</h2>
        <div>
          <button onClick={() => setCurrentPage('products')}>Plants</button>
          <button onClick={() => setCurrentPage('cart')}>🛒 Cart ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</button>
        </div>
      </nav>

      <div className="cart-content">
        <h2>Total Shopping Cart Amount: ${calculateTotalAmount()}</h2>
        
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-items-list">
            {cartItems.map((item, index) => {
              const unitPrice = parseFloat(item.cost.replace('$', ''));
              const totalCostPerItem = (unitPrice * item.quantity).toFixed(2);

              return (
                <div key={index} className="cart-item-card">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>Unit Price: {item.cost}</p>
                    <p>Subtotal: ${totalCostPerItem}</p>
                    <div className="quantity-controls">
                      <button onClick={() => handleDecrement(item)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleIncrement(item)}>+</button>
                    </div>
                    <button className="delete-btn" onClick={() => handleRemove(item)}>Delete</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="cart-actions">
          <button className="continue-shopping-btn" onClick={() => setCurrentPage('products')}>
            Continue Shopping
          </button>
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;