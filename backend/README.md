# A2Z Mart Backend

Node.js/Express backend for the A2Z Mart e-commerce platform.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production

```bash
npm start
```

## Features

- Phone-based OTP authentication via Twilio WhatsApp
- Product management (Stationery, Electronics)
- Shopping cart and order management
- UPI payment processing via Razorpay
- PDF file uploads
- WhatsApp notifications for orders and uploads

## API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP to phone
- `POST /api/auth/verify-otp` - Verify OTP and login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products?category=Stationery` - Filter by category
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `POST /api/orders` - Create order
- `POST /api/orders/verify-payment` - Verify payment
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID

### Uploads
- `POST /api/uploads` - Upload PDF
- `GET /api/uploads` - Get user uploads
- `DELETE /api/uploads/:id` - Delete upload

## Environment Setup

Create a `.env` file with:

```
# Database
MONGODB_URI=mongodb://localhost:27017/a2z-mart

# Server
PORT=5000
NODE_ENV=development

# Razorpay UPI
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
UPI_ID=hemanthraj15066@okaxis

# Twilio WhatsApp
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_WHATSAPP_NUMBER=+1234567890
OWNER_WHATSAPP=+917794084986

# JWT
JWT_SECRET=your_jwt_secret_key
```

## Getting Started

1. Install MongoDB and ensure it's running
2. Install dependencies: `npm install`
3. Create `.env` file with your credentials
4. Run development server: `npm run dev`
5. Server will run on http://localhost:5000
