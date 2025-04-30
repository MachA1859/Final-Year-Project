export interface SuspiciousTransaction {
  id: string;
  name: string;
  paymentChannel: string;
  type: string;
  accountId: string;
  amount: number;
  pending: boolean;
  category: string;
  date: string;
  image: string;
  step: number;
  nameOrig: string;
  oldbalanceOrg: number;
  newbalanceOrig: number;
  nameDest: string;
  oldbalanceDest: number;
  newbalanceDest: number;
  isFraud: null;
  suspicion: number;
  model_score: number;
  amount_score: number;
}

export const transactions: SuspiciousTransaction[] = [
  {
    "id": "1",
    "name": "Grocery Store",
    "paymentChannel": "in store",
    "type": "debit",
    "accountId": "123",
    "amount": -45.67,
    "pending": false,
    "category": "Food & Drink",
    "date": "2024-04-25T14:30:00",
    "image": "https://picsum.photos/200?category=food",
    "step": 14,
    "nameOrig": "C123456789",
    "oldbalanceOrg": 1000.0,
    "newbalanceOrig": 954.33,
    "nameDest": "M987654321",
    "oldbalanceDest": 5000.0,
    "newbalanceDest": 5045.67,
    "isFraud": null,
    "suspicion": 1.43,
    "model_score": 1.0,
    "amount_score": 1.58
  },
  // ... rest of the transactions ...
]; 