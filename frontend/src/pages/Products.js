import React, { useState, useEffect, useContext } from 'react';
import { productService } from '../services/api';
import { CartContext } from '../context/CartContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAllProducts(category);
      setProducts(response.data);
    } catch (err) {
      setError('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setCategory('')}
          className={`px-4 py-2 rounded ${category === '' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => setCategory('Stationery')}
          className={`px-4 py-2 rounded ${category === 'Stationery' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Stationery
        </button>
        <button
          onClick={() => setCategory('Electronics')}
          className={`px-4 py-2 rounded ${category === 'Electronics' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Electronics
        </button>
      </div>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <p className="text-gray-500">No products found</p>
          ) : (
            products.map((product) => (
              <div key={product._id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                {product.image && (
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2 text-sm">{product.description}</p>
                  <p className="text-blue-600 text-sm mb-2">{product.category}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Add to Cart
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Delivery: ₹{product.deliveryCharge || 1} per item
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
