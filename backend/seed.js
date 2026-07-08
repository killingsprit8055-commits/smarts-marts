// Sample data script - Run this to populate sample products
// Usage: node seed.js

require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const SAMPLE_PRODUCTS = [
  {
    name: "Notebook A4 - 100 Pages",
    description: "High quality 100 pages ruled notebook for writing and notes",
    price: 45,
    category: "Stationery",
    stock: 150,
    deliveryCharge: 1
  },
  {
    name: "Ball Point Pen Set (10 pcs)",
    description: "Smooth writing ballpoint pen set of 10 pieces",
    price: 35,
    category: "Stationery",
    stock: 200,
    deliveryCharge: 1
  },
  {
    name: "A4 White Paper Ream",
    description: "500 sheets of high-quality white A4 paper",
    price: 200,
    category: "Stationery",
    stock: 100,
    deliveryCharge: 1
  },
  {
    name: "Pencil Set (HB & B)",
    description: "Professional pencil set with HB and B grades",
    price: 40,
    category: "Stationery",
    stock: 120,
    deliveryCharge: 1
  },
  {
    name: "Highlighter Marker (5 Colors)",
    description: "Bright colorful highlighter markers for study",
    price: 60,
    category: "Stationery",
    stock: 80,
    deliveryCharge: 1
  },
  {
    name: "USB Pendrive 32GB",
    description: "High-speed USB 3.0 pendrive with fast data transfer",
    price: 250,
    category: "Electronics",
    stock: 75,
    deliveryCharge: 1
  },
  {
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with 2.4GHz receiver and 18-month battery",
    price: 300,
    category: "Electronics",
    stock: 60,
    deliveryCharge: 1
  },
  {
    name: "USB Keyboard",
    description: "Standard USB wired keyboard with durable keys",
    price: 400,
    category: "Electronics",
    stock: 50,
    deliveryCharge: 1
  },
  {
    name: "USB Hub 4-Port",
    description: "4-port USB 2.0 hub for connecting multiple devices",
    price: 180,
    category: "Electronics",
    stock: 90,
    deliveryCharge: 1
  },
  {
    name: "HDMI Cable 2 Meter",
    description: "High-speed HDMI 2.0 cable for HD video and audio",
    price: 150,
    category: "Electronics",
    stock: 110,
    deliveryCharge: 1
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/a2z-mart');
    console.log('MongoDB connected');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const inserted = await Product.insertMany(SAMPLE_PRODUCTS);
    console.log(`✅ Inserted ${inserted.length} products successfully!`);

    console.log('\nSample Products:');
    inserted.forEach(product => {
      console.log(`  - ${product.name} (₹${product.price}) [${product.category}]`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
