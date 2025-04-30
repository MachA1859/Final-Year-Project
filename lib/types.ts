export interface Transaction {
  id: string;
  name: string;
  amount: number;
  type: 'credit' | 'debit';
  category: string;
  date: string;
  paymentChannel: string;
  suspiciousProbability?: number;
  image?: string;
  pending?: boolean;
  accountId?: string;
} 