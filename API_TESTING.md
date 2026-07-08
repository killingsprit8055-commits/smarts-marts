# A2Z Mart - API Testing Guide

## Setup Postman

1. Install Postman from https://www.postman.com/downloads/
2. Import the collection below or create requests manually
3. Set base URL: `http://localhost:5000/api`

## API Endpoints Documentation

### 1. Authentication

#### Send OTP
```
POST /auth/send-otp
Content-Type: application/json

{
  "phoneNumber": "919876543210"
}

Response:
{
  "message": "OTP sent successfully",
  "otpDemo": "123456"
}
```

#### Verify OTP & Login
```
POST /auth/verify-otp
Content-Type: application/json

{
  "phoneNumber": "919876543210",
  "otp": "123456"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "phoneNumber": "919876543210",
    "name": null
  }
}
```

#### Get Current User
```
GET /auth/me
Authorization: Bearer {token}

Response:
{
  "_id": "507f1f77bcf86cd799439011",
  "phoneNumber": "919876543210",
  "name": "John Doe",
  "isVerified": true,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### Update Profile
```
PUT /auth/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Doe"
}

Response:
{
  "message": "Profile updated successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "phoneNumber": "919876543210",
    "name": "John Doe"
  }
}
```

### 2. Products

#### Get All Products
```
GET /products
Authorization: Bearer {token}

Response:
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Notebook A4",
    "description": "100 pages ruled notebook",
    "price": 50,
    "category": "Stationery",
    "stock": 100,
    "deliveryCharge": 1,
    "createdAt": "2024-01-15T10:30:00Z"
  },
  ...
]
```

#### Get Products by Category
```
GET /products?category=Stationery
Authorization: Bearer {token}
```

#### Get Product by ID
```
GET /products/:id
Authorization: Bearer {token}

Response:
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Notebook A4",
  "description": "100 pages ruled notebook",
  "price": 50,
  "category": "Stationery",
  "stock": 100,
  "deliveryCharge": 1
}
```

#### Create Product (Admin)
```
POST /products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Pen Set",
  "description": "10 piece pen set",
  "price": 40,
  "category": "Stationery",
  "stock": 150,
  "image": "url-to-image"
}

Response:
{
  "message": "Product created successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439013",
    ...
  }
}
```

### 3. Orders

#### Create Order
```
POST /orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "items": [
    {
      "productId": "507f1f77bcf86cd799439012",
      "quantity": 2
    }
  ],
  "address": "123 Main Street, City, State 12345"
}

Response:
{
  "message": "Order created successfully",
  "order": {
    "_id": "507f1f77bcf86cd799439014",
    "userId": "507f1f77bcf86cd799439011",
    "items": [...],
    "subtotal": 100,
    "deliveryCharges": 2,
    "total": 102,
    "status": "Pending",
    "paymentId": "order_1234567890",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "razorpayOrder": {
    "id": "order_1234567890",
    "entity": "order",
    "amount": 10200,
    "amount_paid": 0,
    "currency": "INR"
  }
}
```

#### Verify Payment
```
POST /orders/verify-payment
Authorization: Bearer {token}
Content-Type: application/json

{
  "orderId": "507f1f77bcf86cd799439014",
  "razorpay_order_id": "order_1234567890",
  "razorpay_payment_id": "pay_1234567890",
  "razorpay_signature": "signature_hash_here"
}

Response:
{
  "message": "Payment verified successfully",
  "order": {
    "_id": "507f1f77bcf86cd799439014",
    "status": "Paid",
    "paymentId": "pay_1234567890",
    ...
  }
}
```

#### Get User Orders
```
GET /orders
Authorization: Bearer {token}

Response:
[
  {
    "_id": "507f1f77bcf86cd799439014",
    "userId": "507f1f77bcf86cd799439011",
    "items": [...],
    "total": 102,
    "status": "Paid",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  ...
]
```

#### Get Order by ID
```
GET /orders/:id
Authorization: Bearer {token}

Response:
{
  "_id": "507f1f77bcf86cd799439014",
  "userId": "507f1f77bcf86cd799439011",
  "items": [
    {
      "productId": {...},
      "quantity": 2,
      "price": 50
    }
  ],
  "subtotal": 100,
  "deliveryCharges": 2,
  "total": 102,
  "status": "Paid",
  "address": "123 Main Street, City, State 12345",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### 4. Uploads

#### Upload PDF
```
POST /uploads
Authorization: Bearer {token}
Content-Type: multipart/form-data

Body:
file: [Select PDF file]

Response:
{
  "message": "File uploaded successfully",
  "upload": {
    "_id": "507f1f77bcf86cd799439015",
    "userId": "507f1f77bcf86cd799439011",
    "fileName": "document.pdf",
    "filePath": "/backend/uploads/file-1234567890.pdf",
    "fileSize": 512000,
    "mimeType": "application/pdf",
    "phoneNumber": "919876543210",
    "uploadedAt": "2024-01-15T10:30:00Z",
    "sentToWhatsApp": true,
    "whatsAppSentAt": "2024-01-15T10:35:00Z"
  }
}
```

#### Get User Uploads
```
GET /uploads
Authorization: Bearer {token}

Response:
[
  {
    "_id": "507f1f77bcf86cd799439015",
    "fileName": "document.pdf",
    "fileSize": 512000,
    "uploadedAt": "2024-01-15T10:30:00Z",
    "sentToWhatsApp": true
  },
  ...
]
```

#### Delete Upload
```
DELETE /uploads/:id
Authorization: Bearer {token}

Response:
{
  "message": "Upload deleted successfully"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Phone number is required"
}
```

### 401 Unauthorized
```json
{
  "message": "No token, authorization denied"
}
```

### 404 Not Found
```json
{
  "message": "Product not found"
}
```

### 500 Server Error
```json
{
  "message": "Error creating order",
  "error": "Error details"
}
```

## Testing Workflow

### 1. Register & Login
1. Call `POST /auth/send-otp` with phone number
2. Check server console for OTP
3. Call `POST /auth/verify-otp` with phone and OTP
4. Save the returned token

### 2. Browse Products
1. Call `GET /products` to see all products
2. Call `GET /products?category=Stationery` to filter
3. Call `GET /products/:id` to see details

### 3. Create Order
1. Call `POST /orders` with items and address
2. Note the razorpayOrder.id returned

### 4. Upload PDF
1. Call `POST /uploads` with PDF file
2. Check WhatsApp for notification (requires Twilio setup)

### 5. View Orders
1. Call `GET /orders` to see all user orders
2. Call `GET /orders/:id` for specific order

## Sample Test Data

### Phone Numbers
- +919876543210
- +917794084986
- +919898765432

### Categories
- Stationery
- Electronics

### Test Amounts (INR)
- ₹50 - Notebook
- ₹250 - USB Pendrive
- ₹300 - Wireless Mouse

## Common Issues & Solutions

### "No token, authorization denied"
- Make sure to include Authorization header
- Format: `Authorization: Bearer {token}`
- Token expires in 30 days

### "Invalid OTP"
- Check if OTP matches (see console)
- OTP expires in 10 minutes

### "Payment verification failed"
- Ensure signature is correct
- Check amount matches (in paise)
- Verify Razorpay keys

### "Only PDF files are allowed"
- Make sure file is PDF format
- File size max 50MB
- Use multipart/form-data for uploads

## Postman Collection JSON

Save this as `A2Z Mart.postman_collection.json` and import in Postman:

```json
{
  "info": {
    "name": "A2Z Mart API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Send OTP",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/auth/send-otp",
            "body": {
              "raw": "{\"phoneNumber\": \"919876543210\"}"
            }
          }
        },
        {
          "name": "Verify OTP",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/auth/verify-otp",
            "body": {
              "raw": "{\"phoneNumber\": \"919876543210\", \"otp\": \"123456\"}"
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5000/api"
    },
    {
      "key": "token",
      "value": ""
    }
  ]
}
```

---

Happy Testing! 🎉
