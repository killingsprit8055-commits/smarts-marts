const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const createOrder = async (amount, currency = 'INR', description = '') => {
  try {
    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise
      currency,
      description,
      notes: {
        store: 'A2Z Mart'
      }
    };

    const order = await razorpay.orders.create(options);
    return { success: true, order };
  } catch (error) {
    console.log('Error creating Razorpay order:', error);
    return { success: false, error: error.message };
  }
};

const verifyPayment = (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
  try {
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    return expectedSignature === razorpay_signature;
  } catch (error) {
    console.log('Error verifying payment:', error);
    return false;
  }
};

module.exports = {
  razorpay,
  createOrder,
  verifyPayment
};
