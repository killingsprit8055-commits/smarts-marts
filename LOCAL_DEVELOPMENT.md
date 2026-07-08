# Local Development Setup Guide

## Prerequisites Installation

### Windows

#### 1. Install Node.js
- Download from https://nodejs.org (v16 or higher recommended)
- Run installer, select "Add to PATH"
- Verify: `node --version` and `npm --version`

#### 2. Install MongoDB
- Download from https://www.mongodb.com/try/download/community
- Run installer with default settings
- MongoDB will run as a service
- Verify: `mongosh` in terminal

#### 3. Install Git (Optional)
- Download from https://git-scm.com/download/win
- Use default settings

### macOS

```bash
# Using Homebrew
brew install node
brew install mongodb-community

# Verify installation
node --version
npm --version
mongod --version
```

### Linux (Ubuntu/Debian)

```bash
# Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo service mongod start
```

## Project Setup

### 1. Navigate to Project
```bash
cd "path/to/a2z mart"
```

### 2. Install All Dependencies
```bash
npm run install-all
```

Or manually:
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 3. Create Environment Files

#### Backend (.env)
```bash
cd backend
cp .env.example .env
# Edit .env with your values
```

Content of backend/.env:
```
# Database
MONGODB_URI=mongodb://localhost:27017/a2z-mart

# Server
PORT=5000
NODE_ENV=development

# Razorpay (get from https://dashboard.razorpay.com)
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxx
UPI_ID=hemanthraj15066@okaxis

# Twilio WhatsApp (optional - get from https://www.twilio.com)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxx
TWILIO_WHATSAPP_NUMBER=+1234567890
OWNER_WHATSAPP=+917794084986

# JWT
JWT_SECRET=your_super_secret_key_change_this_in_production
```

#### Frontend (.env)
```bash
cd ../frontend
cp .env.example .env
# Edit .env with your values
```

Content of frontend/.env:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
```

### 4. Start MongoDB
```bash
# Windows - MongoDB runs as service automatically

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Verify running
mongosh
```

### 5. Seed Sample Data
```bash
cd backend
npm run seed
```

Output should show:
```
✅ Inserted 10 products successfully!
Sample Products:
  - Notebook A4 - 100 Pages (₹45) [Stationery]
  - Ball Point Pen Set (10 pcs) (₹35) [Stationery]
  ...
```

### 6. Start Development Servers

#### Option A: Concurrent (Recommended)
```bash
cd a2z-mart
npm run dev
```

This starts:
- Backend: http://localhost:5000 (logs to console)
- Frontend: http://localhost:3000 (opens in browser)

#### Option B: Separate Terminals
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

## Testing the Application

### 1. Test Login Flow

1. Open http://localhost:3000
2. Enter phone number: `919876543210`
3. Click "Send OTP"
4. Check backend console - OTP will be printed (e.g., "123456")
5. Enter OTP in login page
6. Click "Verify OTP"
7. ✅ Should be redirected to homepage

### 2. Test Product Browsing

1. Click "Shop" or go to /products
2. See all products
3. Filter by "Stationery" or "Electronics"
4. Click on product to see details

### 3. Test Shopping Cart

1. Click "Add to Cart" on any product
2. Note cart badge shows item count
3. Go to /cart
4. Adjust quantities or remove items
5. Enter delivery address
6. Click "Proceed to Payment"

### 4. Test Payment (Demo Mode)

1. Razorpay popup will open
2. This is TEST mode - no real payment
3. For demo: use card 4111 1111 1111 1111
4. Enter any future expiry and CVC
5. Complete payment
6. Should show success message

### 5. Test PDF Upload

1. Go to /uploads
2. Select a PDF file from your computer
3. Click "Upload PDF"
4. Should show success message
5. PDF listed in "Your Uploads"

### 6. Test Order History

1. Go to /orders
2. Should see the order you just created
3. Shows status as "Paid"
4. Displays items, totals, delivery charges

## Database Management

### View Products
```bash
mongosh

use a2z-mart
db.products.find()
```

### View Users
```bash
db.users.find()
```

### View Orders
```bash
db.orders.find().pretty()
```

### Clear Database
```bash
db.users.deleteMany({})
db.products.deleteMany({})
db.orders.deleteMany({})
```

### Re-seed Data
```bash
# Terminal (from backend folder)
npm run seed
```

## Debugging

### Backend Logs
```bash
# Check backend console for:
- Server running on port 5000
- MongoDB connected
- OTP values (development mode)
- API request logs
```

### Frontend Console
```bash
# Browser DevTools (F12)
- API responses
- Error messages
- Auth token
```

### Network Tab
```bash
# Browser DevTools → Network
- API requests/responses
- Status codes
- Payload and headers
```

### MongoDB Logs
```bash
mongosh
db.getCollectionNames()
```

## Common Development Issues

### Issue: "Cannot GET /api/..."
**Solution:** Backend not running. Start with `npm run dev`

### Issue: "CORS error"
**Solution:** Backend CORS not set. Check server.js has cors()

### Issue: "MongoDB connection error"
**Solution:** 
- Start MongoDB: `mongod` (Windows) or `brew services start mongodb-community` (Mac)
- Verify connection string in .env

### Issue: "Cannot find module 'dotenv'"
**Solution:** Run `npm install` in backend folder

### Issue: "Port already in use"
**Solution:** 
```bash
# Find process using port 5000
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

### Issue: "PayPal/Razorpay not working"
**Solution:** 
- Verify API keys in .env
- Check amount formatting (should be in paise)
- Use test keys for development

## Useful Commands Reference

```bash
# Install dependencies
npm install

# Start development
npm run dev
npm run backend
npm run frontend

# Database seeding
cd backend && npm run seed

# View MongoDB
mongosh

# Stop servers
Ctrl + C

# Check Node version
node --version

# Check npm version
npm --version

# List running processes
ps aux | grep node  # macOS/Linux
tasklist | findstr node  # Windows

# Clear node modules (if needed)
rm -rf node_modules  # macOS/Linux
rmdir /s /q node_modules  # Windows
npm install
```

## Performance Optimization Tips

### Frontend
- Use React DevTools to check component renders
- Check Network tab for large bundle
- Lazy load routes and components
- Enable source maps in development

### Backend
- Check MongoDB query performance
- Use indexes on frequently queried fields
- Monitor memory usage
- Check response times in browser

## Security for Development

### Never commit .env files
```bash
# Already in .gitignore
echo ".env" >> .gitignore
```

### Keep secrets safe
- Use different keys for dev/prod
- Rotate Razorpay/Twilio keys
- Never share .env files

### Use test mode
- Razorpay test keys only
- Twilio sandbox mode
- Test database separately

## Useful VSCode Extensions

- ES7+ React/Redux/React-Native snippets
- Thunder Client (API testing)
- MongoDB for VSCode
- REST Client
- Prettier - Code formatter
- ESLint
- Thunder Client
- PostCSS Language Support

## Production Preparation Checklist

- [ ] All .env variables set correctly
- [ ] Database backups tested
- [ ] API keys validated
- [ ] HTTPS certificates obtained
- [ ] Domain configured
- [ ] CI/CD pipeline setup
- [ ] Error logging configured
- [ ] Monitoring alerts setup
- [ ] Load testing completed
- [ ] Security audit done

## Next Steps

1. ✅ Run `npm run dev`
2. ✅ Test login with phone OTP
3. ✅ Browse products
4. ✅ Add items to cart
5. ✅ Test payment flow
6. ✅ Upload PDF
7. ✅ View orders
8. ✅ Explore codebase
9. ✅ Customize features
10. ✅ Deploy to production

## Getting Help

### Check Documentation
- README.md - Project overview
- backend/README.md - Backend docs
- frontend/README.md - Frontend docs
- API_TESTING.md - API details
- DEPLOYMENT.md - Production guide

### Common Questions

**Q: How do I change the OTP expiry time?**
A: Edit `backend/controllers/authController.js`, line with `10 * 60 * 1000`

**Q: How do I add new products?**
A: Edit `backend/seed.js` and run `npm run seed` or POST to `/api/products`

**Q: How do I change delivery charges?**
A: Edit product schema in `backend/models/Product.js`, currently ₹1 per item

**Q: Can I use MySQL instead of MongoDB?**
A: Yes, but need to rewrite models and schema. MongoDB recommended for this project.

---

Happy Coding! 🚀
