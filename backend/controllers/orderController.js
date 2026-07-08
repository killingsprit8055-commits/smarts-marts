const Order = require('../models/Order');
const Product = require('../models/Product');
const { sendWhatsAppMessage } = require('../utils/whatsapp');
const { createOrder: createRazorpayOrder, verifyPayment } = require('../utils/payment');

// Create order
exports.createOrder = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.user.userId;
    const phoneNumber = req.user.phoneNumber;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    let subtotal = 0;
    let orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }

      subtotal += product.price * item.quantity;
      orderItems.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price
      });
    }

    // Calculate delivery charges (1 rupee per item)
    const deliveryCharges = items.reduce((sum, item) => sum + item.quantity, 0) * 1;
    const total = subtotal + deliveryCharges;

    // Create Razorpay order
    const paymentResult = await createRazorpayOrder(total, 'INR', `Order from A2Z Mart - ${items.length} items`);

    if (!paymentResult.success) {
      return res.status(400).json({ message: 'Error creating payment order' });
    }

    // Create order in database
    const order = new Order({
      userId,
      items: orderItems,
      subtotal,
      deliveryCharges,
      total,
      phoneNumber,
      address,
      paymentId: paymentResult.order.id
    });

    await order.save();

    res.status(201).json({
      message: 'Order created successfully',
      order,
      razorpayOrder: paymentResult.order
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

// Verify payment and update order
exports.verifyOrderPayment = async (req, res) => {
  try {
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Verify payment signature
    const isValidPayment = verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);

    if (!isValidPayment) {
      return res.status(400).json({ message: 'Payment verification failed' });
    }

    // Update order status
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status: 'Paid', paymentId: razorpay_payment_id },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Send WhatsApp confirmation
    const message = `
Order Confirmation - A2Z Mart

Order ID: ${order._id}
Total Amount: ₹${order.total}
Subtotal: ₹${order.subtotal}
Delivery Charges: ₹${order.deliveryCharges}
Status: Payment Received

Thank you for your order!
    `;

    await sendWhatsAppMessage(order.phoneNumber, message);

    // Send to owner
    const ownerMessage = `
New Order Received!

Order ID: ${order._id}
Customer Phone: ${order.phoneNumber}
Amount: ₹${order.total}
Items: ${order.items.length}
Payment ID: ${razorpay_payment_id}
    `;

    await sendWhatsAppMessage(process.env.OWNER_WHATSAPP, ownerMessage);

    res.json({ message: 'Payment verified successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying payment', error: error.message });
  }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId })
      .populate('items.productId')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
};
