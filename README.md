# MyntPay - Payment Gateway with Integrated Cryptocurrency Support

## Prerequisites

- Node.js v18.0 or higher
- Python 3.8 or higher
- npm or yarn package manager
- CUDA-capable GPU (optional, for ML model training)

## Installation

### 1. Clone the Repository
```bash
git clone [repository-url]
cd final-year-project
```

### 2. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 3. Install Node.js Dependencies
```bash
npm install
# or
yarn install
```

### 4. Set Up Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_URL=your_appwrite_url
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_STORAGE_ID=your_storage_id
NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID=your_user_collection_id
NEXT_PUBLIC_APPWRITE_BANK_COLLECTION_ID=your_bank_collection_id
NEXT_PUBLIC_APPWRITE_TRANSACTION_COLLECTION_ID=your_transaction_collection_id
NEXT_APPWRITE_KEY=your_appwrite_key

# Plaid Configuration
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret

# Dwolla Configuration
DWOLLA_ENV=sandbox
DWOLLA_KEY=your_dwolla_key
DWOLLA_SECRET=your_dwolla_secret

# Twilio Configuration
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_phone
```

### 5. Train the ML Model

```bash
cd mynt_condition/suspicion_model
python train_and_analyze.py
```

### 6. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
final-year-project/
├── app/                    # Next.js application routes
├── components/            # React components
├── lib/                   # Utility functions and configurations
├── mynt_condition/        # Machine learning model
│   └── suspicion_model/   # Fraud detection model
├── public/               # Static assets
└── appwrite/             # Appwrite cloud functions
```

## Features

- User Authentication with 2FA
- Real-time Transaction Monitoring
- Fraud Detection using ML
- Bank Account Integration
- Payment Processing
- Cryptocurrency Support
- Transaction Analytics

## API Integration

The application integrates with several third-party services:
- Appwrite (Backend as a Service)
- Plaid (Banking API)
- Dwolla (Payment Processing)
- Twilio (SMS Verification)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
