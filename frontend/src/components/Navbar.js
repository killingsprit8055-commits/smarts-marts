import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">A2Z Mart</Link>
        <div className="flex items-center space-x-6">
          <Link to="/products" className="hover:text-blue-200">Products</Link>
          <Link to="/cart" className="hover:text-blue-200 relative">
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
          <Link to="/orders" className="hover:text-blue-200">Orders</Link>
          <Link to="/uploads" className="hover:text-blue-200">Uploads</Link>
          <Link to="/profile" className="hover:text-blue-200">Profile</Link>
          <button 
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
