import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center py-12">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">Welcome to A2Z Mart</h1>
      <p className="text-xl text-gray-600 mb-8">
        Your one-stop shop for Stationery & Electronics
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">🛍️ Shop</h2>
          <p className="mb-4">Browse and buy from our collection</p>
          <Link to="/products" className="bg-white text-blue-600 px-6 py-2 rounded font-semibold hover:bg-gray-100">
            Shop Now
          </Link>
        </div>

        <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">📄 Upload</h2>
          <p className="mb-4">Upload PDFs for printing services</p>
          <Link to="/uploads" className="bg-white text-green-600 px-6 py-2 rounded font-semibold hover:bg-gray-100">
            Upload PDF
          </Link>
        </div>

        <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">🛒 Cart</h2>
          <p className="mb-4">View your cart and checkout</p>
          <Link to="/cart" className="bg-white text-purple-600 px-6 py-2 rounded font-semibold hover:bg-gray-100">
            View Cart
          </Link>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">📦 Orders</h2>
          <p className="mb-4">Track your orders</p>
          <Link to="/orders" className="bg-white text-orange-600 px-6 py-2 rounded font-semibold hover:bg-gray-100">
            My Orders
          </Link>
        </div>
      </div>

      <div className="mt-12 bg-blue-50 rounded-lg p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Why Choose A2Z Mart?</h2>
        <ul className="text-left space-y-2 text-gray-700">
          <li>✓ Phone-based easy login</li>
          <li>✓ Instant UPI payment processing</li>
          <li>✓ PDF upload and printing service</li>
          <li>✓ WhatsApp order notifications</li>
          <li>✓ Affordable delivery charges (₹1 per item)</li>
          <li>✓ Wide range of Stationery & Electronics</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
