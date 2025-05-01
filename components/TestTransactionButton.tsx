'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { fetchTransactionsFromPython } from '@/mynt_condition/suspicion_model/mockTransactionsWithSuspicion';

export function TestTransactionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTest = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedTransactions = await fetchTransactionsFromPython();
      setTransactions(fetchedTransactions);
    } catch (err) {
      setError('Failed to fetch transactions. Please try again.');
      console.error('Error testing transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="default" 
          className="mt-4 bg-white text-black hover:bg-gray-100 border border-gray-200 dark:bg-[#1e1e1e] dark:text-white dark:border-[#333]"
        >
          Test Transaction Fetch
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px] bg-white p-4">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-lg font-bold">Test Transaction Fetch</DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          <Button 
            onClick={handleTest} 
            disabled={loading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {loading ? 'Fetching...' : 'Fetch Transactions'}
          </Button>
          
          {error && (
            <div className="mt-2 p-2 bg-red-50 text-red-600 rounded-md border border-red-200 text-sm">
              {error}
            </div>
          )}

          {transactions.length > 0 && (
            <div className="mt-2">
              <h3 className="font-semibold mb-1 text-base">Sample Transactions:</h3>
              <div className="space-y-2">
                {transactions.slice(0, 3).map((t, index) => (
                  <div key={t.id} className="p-2 border rounded-md bg-gray-50">
                    <p className="font-medium text-gray-900 text-sm">Transaction {index + 1}:</p>
                    <div className="mt-1 space-y-0.5 text-gray-700 text-sm">
                      <p><span className="font-medium">ID:</span> {t.id}</p>
                      <p><span className="font-medium">Name:</span> {t.name}</p>
                      <p><span className="font-medium">Amount:</span> {t.amount}</p>
                      <p><span className="font-medium">Type:</span> {t.type}</p>
                      <p><span className="font-medium">Suspicious Probability:</span> {t.suspiciousProbability}</p>
                      <p><span className="font-medium">Model Score:</span> {t.model_score}</p>
                      <p><span className="font-medium">Amount Score:</span> {t.amount_score}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 