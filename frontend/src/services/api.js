import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthToken = () => localStorage.getItem('authToken');

// Auth Service
export const authService = {
  sendOTP: (phoneNumber) => 
    axios.post(`${API_BASE_URL}/auth/send-otp`, { phoneNumber }),
  
  verifyOTP: (phoneNumber, otp) => 
    axios.post(`${API_BASE_URL}/auth/verify-otp`, { phoneNumber, otp }),
  
  getUser: () => 
    axios.get(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    }),
  
  updateProfile: (data) => 
    axios.put(`${API_BASE_URL}/auth/profile`, data, {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    })
};

// Product Service
export const productService = {
  getAllProducts: (category) => {
    const url = category 
      ? `${API_BASE_URL}/products?category=${category}`
      : `${API_BASE_URL}/products`;
    return axios.get(url);
  },
  
  getProductById: (id) => 
    axios.get(`${API_BASE_URL}/products/${id}`)
};

// Order Service
export const orderService = {
  createOrder: (items, address) => 
    axios.post(`${API_BASE_URL}/orders`, { items, address }, {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    }),
  
  verifyPayment: (orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature) =>
    axios.post(`${API_BASE_URL}/orders/verify-payment`, {
      orderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    }, {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    }),
  
  getUserOrders: () => 
    axios.get(`${API_BASE_URL}/orders`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    }),
  
  getOrderById: (id) => 
    axios.get(`${API_BASE_URL}/orders/${id}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    })
};

// Upload Service
export const uploadService = {
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`${API_BASE_URL}/uploads`, formData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  
  getUserUploads: () => 
    axios.get(`${API_BASE_URL}/uploads`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    }),
  
  deleteUpload: (id) => 
    axios.delete(`${API_BASE_URL}/uploads/${id}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    })
};
