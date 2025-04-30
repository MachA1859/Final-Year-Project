declare module '@/mynt_condition/suspicion_model/mock_transaction_suspicion' {
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

  export const transactions: SuspiciousTransaction[];
} 