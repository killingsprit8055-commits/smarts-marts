# A2Z Mart - E-Commerce Platform

A full-stack e-commerce platform for buying stationery & electronics with PDF printing support, instant UPI payment processing, and WhatsApp integration.

## Features

✅ **Phone-based Authentication** - Users login via OTP sent to WhatsApp  
✅ **Product Categories** - Stationery and Electronics  
✅ **Shopping Cart** - Add/remove items with quantity management  
✅ **UPI Payment** - Instant payment via Razorpay (UPI ID: hemanthraj15066@okaxis)  
✅ **PDF Uploads** - Upload PDFs that are sent to WhatsApp (7794084986)  
✅ **Order Tracking** - View order status and history  
✅ **WhatsApp Notifications** - Order confirmations and delivery updates  
✅ **Delivery Charges** - ₹1 per item  

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, TailwindCSS, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Payment | Razorpay UPI Gateway |
| Messaging | Twilio WhatsApp API |
| Authentication | Phone OTP |

## Project Structure

```
a2z-mart/
├── frontend/                 # React application
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── context/        # State management
│   │   └── App.js
│   ├── package.json
│   └── tailwind.config.js
├── backend/                 # Express server
│   ├── models/             # Database schemas
│   ├── controllers/        # Business logic
│   ├── routes/             # API endpoints
│   ├── middleware/         # Auth & validation
│   ├── utils/              # Helper functions
│   ├── uploads/            # PDF storage
│   ├── server.js
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)
- Razorpay account (https://razorpay.com)
- Twilio account with WhatsApp (https://twilio.com)

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/a2z-mart
PORT=5000
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
OWNER_WHATSAPP=+917794084986
JWT_SECRET=your_secret_key
```

Start backend:
```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Start frontend:
```bash
npm start
```

## Usage

1. **Login** - Enter phone number, receive OTP via WhatsApp, verify to login
2. **Browse** - View products in Stationery or Electronics categories
3. **Shop** - Add items to cart, set delivery address
4. **Payment** - Pay via UPI using Razorpay
5. **Order Confirmation** - Receive confirmation on WhatsApp
6. **Uploads** - Upload PDFs for printing (sent to owner's WhatsApp)
7. **Track** - View all orders in "My Orders"

## API Documentation

### Authentication
```
POST /api/auth/send-otp
Body: { phoneNumber: "919876543210" }

POST /api/auth/verify-otp
Body: { phoneNumber: "919876543210", otp: "123456" }
Response: { token, user }
```

### Products
```
GET /api/products
GET /api/products?category=Stationery
GET /api/products/:id
```

### Orders
```
POST /api/orders
Header: Authorization: Bearer {token}
Body: { items: [{productId, quantity}], address }

POST /api/orders/verify-payment
Header: Authorization: Bearer {token}
Body: { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature }
```

### Uploads
```
POST /api/uploads
Header: Authorization: Bearer {token}, Content-Type: multipart/form-data
Body: FormData with file (PDF only)

GET /api/uploads
Header: Authorization: Bearer {token}
```

## Payment Flow

1. User adds items to cart
2. Proceeds to checkout with address
3. Backend creates Razorpay order
4. Razorpay payment gateway opens (UPI)
5. User pays to: `hemanthraj15066@okaxis`
6. Payment verified via signature
7. Order confirmed, WhatsApp notification sent

## WhatsApp Notifications

- **OTP Login** - "Your A2Z Mart OTP is: XXXXXX"
- **Order Confirmation** - Order details and total amount
- **PDF Upload** - Notification with file details to owner

## Admin Panel (Coming Soon)

- Add/Edit/Delete products
- Manage orders
- View uploads
- Analytics

## Troubleshooting

### Backend won't start
- Ensure MongoDB is running: `mongod`
- Check port 5000 is available
- Verify all environment variables

### WhatsApp not sending
- Check Twilio credentials
- Ensure phone numbers have correct country code (+91 for India)
- Verify Twilio sandbox is activated

### Payment fails
- Check Razorpay credentials
- Ensure amount is in paise (multiply by 100)
- Test with Razorpay test keys first

## Future Enhancements

- Admin dashboard
- Multiple payment methods
- Order rating & reviews
- Inventory management
- Email notifications
- SMS support
- Mobile app
- Analytics dashboard

## Contact

For issues or questions, contact: hemanthraj15066@okaxis

## License

ISC
