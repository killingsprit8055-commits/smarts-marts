# A2Z Mart - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js v14+ installed
- MongoDB running locally or cloud instance
- Razorpay account for UPI payments
- Twilio account with WhatsApp enabled

### Step 1: Clone or Download Project
```bash
cd a2z-mart
```

### Step 2: Backend Setup

```bash
cd backend
npm install
```

Create `.env` file with your credentials:
```
MONGODB_URI=mongodb://localhost:27017/a2z-mart
PORT=5000
NODE_ENV=development

RAZORPAY_KEY_ID=<your_key_id>
RAZORPAY_KEY_SECRET=<your_key_secret>
UPI_ID=hemanthraj15066@okaxis

TWILIO_ACCOUNT_SID=<your_sid>
TWILIO_AUTH_TOKEN=<your_token>
TWILIO_WHATSAPP_NUMBER=+1234567890
OWNER_WHATSAPP=+917794084986

JWT_SECRET=your_secret_key_here
```

Start backend server:
```bash
npm run dev
```
✅ Backend running on http://localhost:5000

### Step 3: Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_RAZORPAY_KEY_ID=<your_razorpay_key_id>
```

Start frontend:
```bash
npm start
```
✅ Frontend running on http://localhost:3000

## 📝 Sample Database Setup

Add sample products to MongoDB:

```javascript
// Connect to MongoDB and run:
db.products.insertMany([
  {
    name: "Notebook A4",
    description: "100 pages ruled notebook",
    price: 50,
    category: "Stationery",
    stock: 100,
    deliveryCharge: 1
  },
  {
    name: "USB Pendrive 32GB",
    description: "High-speed USB 3.0 pendrive",
    price: 250,
    category: "Electronics",
    stock: 50,
    deliveryCharge: 1
  },
  {
    name: "Ballpoint Pen Set",
    description: "Pack of 10 quality ballpoint pens",
    price: 30,
    category: "Stationery",
    stock: 200,
    deliveryCharge: 1
  },
  {
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with USB receiver",
    price: 300,
    category: "Electronics",
    stock: 75,
    deliveryCharge: 1
  }
])
```

## 🔑 Test Credentials

### Phone Login
- Enter any phone number (e.g., +919876543210)
- OTP displayed in console during development (check server logs)

### Razorpay Payment
- Use test mode keys from Razorpay dashboard
- Test card: 4111 1111 1111 1111
- Or use UPI mock payments

## 📱 Features Overview

| Feature | Status |
|---------|--------|
| Phone OTP Login | ✅ |
| Product Browsing | ✅ |
| Shopping Cart | ✅ |
| UPI Payment | ✅ |
| PDF Upload | ✅ |
| Order Tracking | ✅ |
| WhatsApp Notifications | ✅ (needs Twilio setup) |
| User Profile | ✅ |

## 🐛 Troubleshooting

### Backend won't connect
```bash
# Check if MongoDB is running
mongod

# Check port availability
netstat -ano | findstr :5000
```

### API calls failing
- Check CORS is enabled in backend
- Verify frontend URL in .env
- Check network tab in browser DevTools

### Razorpay errors
- Verify API keys are correct
- Ensure amount is in paise (multiply by 100)
- Check test mode is enabled

### WhatsApp not sending
- Verify Twilio credentials
- Check phone numbers include country code
- Test in Twilio sandbox first

## 📂 Project Structure

```
a2z-mart/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── controllers/     # Business logic
│   ├── routes/         # API endpoints
│   ├── middleware/     # Auth middleware
│   ├── utils/          # Helper functions
│   └── server.js       # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/      # Page components
│   │   ├── services/   # API services
│   │   ├── context/    # State management
│   │   └── App.js
│   └── package.json
└── README.md
```

## 🔒 Security Notes

- NEVER commit `.env` files
- Use environment variables for secrets
- Validate all user inputs
- Use HTTPS in production
- Implement rate limiting
- Add CSRF protection

## 📞 Support

For issues:
1. Check README files in backend/ and frontend/
2. Review API documentation
3. Check Razorpay and Twilio docs
4. Review console logs for errors

## 🎯 Next Steps

1. Add more products
2. Implement admin panel
3. Add order notifications
4. Set up email alerts
5. Deploy to production
6. Set up CI/CD pipeline

---
Made with ❤️ for A2Z Mart
