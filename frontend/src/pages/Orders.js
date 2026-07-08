import React, { useState, useEffect } from 'react';
import { orderService } from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getUserOrders();
      setOrders(response.data);
    } catch (err) {
      setError('Error fetching orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {orders.length === 0 ? (
        <div className="text-center py-8 text-gray-600">
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border rounded-lg p-6 shadow-md">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-gray-600 text-sm">Order ID</p>
                  <p className="font-semibold">{order._id.slice(0, 8)}...</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Status</p>
                  <p className="font-semibold text-blue-600">{order.status}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total</p>
                  <p className="font-semibold text-green-600">₹{order.total}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Date</p>
                  <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Items:</h3>
                <ul className="space-y-1 text-sm">
                  {order.items.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      • {item.productId?.name || 'Product'} x {item.quantity} = ₹{item.price * item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t mt-4 pt-4 text-sm text-gray-600">
                <p>Delivery Address: {order.address}</p>
                <p>Delivery Charges: ₹{order.deliveryCharges}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
