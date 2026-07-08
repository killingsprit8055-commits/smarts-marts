import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { orderService } from '../services/api';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getDeliveryCharges, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const subtotal = getTotalPrice();
  const deliveryCharges = getDeliveryCharges();
  const total = subtotal + deliveryCharges;

  const handleCheckout = async () => {
    if (!address.trim()) {
      setError('Please enter your address');
      return;
    }

    setLoading(true);
    try {
      const items = cart.map(item => ({
        productId: item._id,
        quantity: item.quantity
      }));

      const response = await orderService.createOrder(items, address);
      
      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_dummy',
          amount: Math.round(total * 100),
          currency: 'INR',
          order_id: response.data.razorpayOrder.id,
          handler: async (paymentResponse) => {
            try {
              await orderService.verifyPayment(
                response.data.razorpayOrder.id,
                paymentResponse.razorpay_payment_id,
                paymentResponse.razorpay_signature
              );
              clearCart();
              alert('Payment successful! Order confirmed.');
              setAddress('');
            } catch (err) {
              setError('Payment verification failed');
            }
          },
          prefill: {
            contact: localStorage.getItem('phoneNumber') || ''
          }
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      };
      document.body.appendChild(script);
    } catch (err) {
      setError(err.response?.data?.message || 'Error processing order');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-600 text-lg">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cart.map((item) => (
            <div key={item._id} className="border rounded-lg p-4 mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded">
                  <button 
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="px-3 py-1 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="px-3 py-1 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
                <span className="font-semibold min-w-[100px] text-right">₹{item.price * item.quantity}</span>
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="border rounded-lg p-6 h-fit sticky top-20 bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges:</span>
              <span>₹{deliveryCharges}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>
          </div>

          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your delivery address"
            className="w-full border rounded p-2 mb-4 focus:outline-none focus:border-blue-500"
            rows="3"
          />

          {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
