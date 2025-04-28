import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TransactionsTable from '@/components/TransactionsTable';
import { mockTransactions } from '@/mynt_condition/mockTransactions';
import { Transaction } from '@/lib/types';
import Pagination from '@/components/Pagination';

interface SearchParamProps {
  searchParams: { 
    id: string;
    page: string | string[] | undefined;
  }
}

const Alerts = async ({ searchParams: { id, page = '1' }}: SearchParamProps) => {
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

  // Pagination logic
  const currentPage = Number(page);
  const pageSize = 10;
  const totalPages = Math.ceil(typedTransactions.length / pageSize);
  const paginatedTransactions = typedTransactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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
            transactions={paginatedTransactions}
          />
          
          {totalPages > 1 && (
            <div className="my-4 w-full">
              <Pagination 
                totalPages={totalPages}
                page={currentPage}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Alerts 