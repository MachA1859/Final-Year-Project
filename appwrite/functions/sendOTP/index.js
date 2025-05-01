const twilio = require('twilio');
const { Client, Databases, ID } = require('node-appwrite');

// Environment variables
const APPWRITE_ENDPOINT = process.env.APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID = process.env.APPWRITE_PROJECT_ID;
const APPWRITE_API_KEY = process.env.NEXT_APPWRITE_KEY;
const APPWRITE_DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const APPWRITE_USER_COLLECTION_ID = process.env.APPWRITE_USER_COLLECTION_ID;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

module.exports = async function (req, res) {
  console.log('Function started');
  console.log('Request payload:', req.payload);

  const client = new Client();
  const databases = new Databases(client);

  client
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID)
    .setKey(APPWRITE_API_KEY);

  try {
    const { userId } = JSON.parse(req.payload);
    console.log('User ID:', userId);
    
    // Get user from Appwrite
    const user = await databases.getDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_USER_COLLECTION_ID,
      userId
    );
    console.log('User document:', user);

    if (!user.phoneNumber) {
      return JSON.stringify({
        success: false,
        message: 'User phone number not found'
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Generated OTP:', otp);

    // Initialize Twilio client
    const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    // Send OTP via Twilio
    console.log('Sending OTP via Twilio to:', user.phoneNumber);
    await twilioClient.messages.create({
      body: `Your MyntPay verification code is: ${otp}`,
      to: user.phoneNumber,
      from: TWILIO_PHONE_NUMBER
    });

    // Store OTP in database with expiry (5 minutes)
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 5);

    console.log('Storing OTP in database');
    await databases.createDocument(
      APPWRITE_DATABASE_ID,
      'otp_verification',
      ID.unique(),
      {
        userId,
        otp,
        expiry: expiry.toISOString(),
        verified: false
      }
    );

    return JSON.stringify({
      success: true,
      message: 'OTP sent successfully'
    });
  } catch (error) {
    console.error('Error in sendOTP:', error);
    return JSON.stringify({
      success: false,
      message: error.message
    });
  }
}; 