const twilio = require('twilio');

const sendOTP = async (phoneNumber, otp) => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    const message = await client.messages.create({
      body: `Your A2Z Mart OTP is: ${otp}. Valid for 10 minutes.`,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:${phoneNumber}`
    });

    return { success: true, messageId: message.sid };
  } catch (error) {
    console.log('Error sending OTP:', error);
    return { success: false, error: error.message };
  }
};

const sendWhatsAppMessage = async (phoneNumber, message) => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    const msg = await client.messages.create({
      body: message,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:${phoneNumber}`
    });

    return { success: true, messageId: msg.sid };
  } catch (error) {
    console.log('Error sending WhatsApp message:', error);
    return { success: false, error: error.message };
  }
};

const sendWhatsAppFile = async (phoneNumber, fileUrl, caption) => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    const msg = await client.messages.create({
      body: caption || 'File attachment',
      mediaUrl: [fileUrl],
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:${phoneNumber}`
    });

    return { success: true, messageId: msg.sid };
  } catch (error) {
    console.log('Error sending WhatsApp file:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendOTP,
  sendWhatsAppMessage,
  sendWhatsAppFile
};
