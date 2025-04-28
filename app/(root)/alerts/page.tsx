import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TransactionsTable from '@/components/TransactionsTable';
import { mockTransactions } from '@/mynt_condition/mockTransactions';
import { Transaction } from '@/lib/types';

const Alerts = async ({ searchParams: { id, page }}: SearchParamProps) => {
  // Convert mock transactions to the correct type
  const typedTransactions: Transaction[] = mockTransactions.map(transaction => ({
    id: transaction.id,
    name: transaction.name,
    amount: transaction.amount,
    type: transaction.type as 'credit' | 'debit',
    category: transaction.category,
    date: transaction.date,
    paymentChannel: transaction.paymentChannel,
    image: transaction.image
  }));

  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox 
          title="Alerts"
          subtext="See your bank alerts."
        />
      </div>

      <div className="space-y-6">
        <div className="transactions-account bg-gradient-to-r from-[#7F1D1D] to-[#581C87]">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">
              Requires Action
            </h2>
            <p className="text-14 text-white">
              Suspicious transactions detected
            </p>
          </div>
        </div>

        <section className="flex w-full flex-col gap-6">
          <TransactionsTable 
            transactions={typedTransactions}
          />
        </section>
      </div>
    </div>
  )
}

export default Alerts 