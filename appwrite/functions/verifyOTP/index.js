const { Client, Databases, Query } = require('node-appwrite');

// Environment variables
const APPWRITE_ENDPOINT = process.env.APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID = process.env.APPWRITE_PROJECT_ID;
const APPWRITE_API_KEY = process.env.NEXT_APPWRITE_KEY;
const APPWRITE_DATABASE_ID = process.env.APPWRITE_DATABASE_ID;

module.exports = async function (req, res) {
  const client = new Client();
  const databases = new Databases(client);

  client
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID)
    .setKey(APPWRITE_API_KEY);

  try {
    const { userId, otp } = JSON.parse(req.payload);
    
    // Get the most recent OTP for the user
    const otpRecords = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      'otp_verification',
      [
        Query.equal('userId', userId),
        Query.orderDesc('$createdAt'),
        Query.limit(1)
      ]
    );

    if (otpRecords.total === 0) {
      throw new Error('No OTP found for this user');
    }

    const otpRecord = otpRecords.documents[0];
    const now = new Date();
    const expiry = new Date(otpRecord.expiry);

    // Check if OTP is expired
    if (now > expiry) {
      throw new Error('OTP has expired');
    }

    // Check if OTP matches
    if (otpRecord.otp !== otp) {
      throw new Error('Invalid OTP');
    }

    // Mark OTP as verified
    await databases.updateDocument(
      APPWRITE_DATABASE_ID,
      'otp_verification',
      otpRecord.$id,
      {
        verified: true
      }
    );

    res.json({
      success: true,
      message: 'OTP verified successfully'
    });
  } catch (error) {
    console.error('Error in verifyOTP:', error);
    res.json({
      success: false,
      message: error.message
    });
  }
}; 