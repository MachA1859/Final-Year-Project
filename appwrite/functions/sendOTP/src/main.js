const twilio = require('twilio');
const { Client, Databases, ID } = require('node-appwrite');

// Environment variables
const APPWRITE_ENDPOINT = process.env.APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = process.env.APPWRITE_PROJECT_ID || '680528d2003045f02662';
const APPWRITE_API_KEY = process.env.NEXT_APPWRITE_KEY;
const APPWRITE_DATABASE_ID = process.env.APPWRITE_DATABASE_ID || 'bank';
const APPWRITE_USER_COLLECTION_ID = process.env.APPWRITE_USER_COLLECTION_ID || 'users';
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

module.exports = async function (context) {
  context.log('Function started');

  // Validate required environment variables
  context.log('Checking environment variables...');
  if (!APPWRITE_API_KEY) {
    context.error('APPWRITE_API_KEY is not set');
    return {
      success: false,
      message: 'APPWRITE_API_KEY environment variable is not set'
    };
  }

  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
    context.error('Twilio credentials are not properly configured');
    return {
      success: false,
      message: 'Twilio credentials are not properly configured'
    };
  }

  context.log('Environment variables check passed');

  try {
    // Initialize Appwrite client with self-signed certificate
    const client = new Client()
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID)
      .setKey(APPWRITE_API_KEY)
      .setSelfSigned(true);

    const databases = new Databases(client);

    // Get userId from input data
    const userId = '680d04c0000349f633df'; // Hardcoded for testing
    context.log('Processing request for User ID:', userId);

    // Validate userId
    if (!userId) {
      context.error('userId is missing');
      return {
        success: false,
        message: 'userId is required'
      };
    }
    
    // Get user from Appwrite using the document ID
    context.log('Getting user document...');
    const user = await databases.getDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_USER_COLLECTION_ID,
      userId
    );

    context.log('Found user document:', user);

    if (!user.phoneNumber) {
      context.error('No phone number found for user:', userId);
      return {
        success: false,
        message: 'User phone number not found'
      };
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    context.log('Generated OTP:', otp);

    // Initialize Twilio client
    context.log('Initializing Twilio client...');
    const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    // Send OTP via Twilio
    context.log('Sending OTP via Twilio to:', user.phoneNumber);
    await twilioClient.messages.create({
      body: `Your MyntPay verification code is: ${otp}`,
      to: user.phoneNumber,
      from: TWILIO_PHONE_NUMBER
    });

    // Store OTP in database with expiry (5 minutes)
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 5);

    context.log('Storing OTP in database...');
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

    context.log('OTP process completed successfully');
    return {
      success: true,
      message: 'OTP sent successfully'
    };
  } catch (error) {
    context.error('Error in sendOTP:', error);
    return {
      success: false,
      message: error.message
    };
  }
}; 