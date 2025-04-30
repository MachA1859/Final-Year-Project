'use client';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { transactionCategoryStyles } from "@/constants"
import { cn, formatAmount, formatDateTime, getTransactionStatus, removeSpecialCharacters } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Transaction } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { usePathname } from 'next/navigation'
import { CategoryBadge } from './CategoryBadge'

interface TransactionTableProps {
  transactions: Transaction[]
}

interface SuspiciousTransaction extends Transaction {
  suspiciousProbability?: number;
  model_score?: number;
  amount_score?: number;
}

const TransactionsTable = ({ transactions }: TransactionTableProps) => {
  const [transactionsWithSuspicious, setTransactionsWithSuspicious] = useState<SuspiciousTransaction[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    // Assume transactions already have suspicion data
    setTransactionsWithSuspicious(transactions as SuspiciousTransaction[]);
  }, [transactions]);

  const handleRemove = (transactionId: string) => {
    setTransactionsWithSuspicious(prev => 
      prev.filter(tx => tx.id !== transactionId)
    );
  };

  return (
    <Table>
      <TableHeader className="bg-[#f9fafb]">
        <TableRow>
          <TableHead className="px-2">Transaction</TableHead>
          <TableHead className="px-2">Amount</TableHead>
          <TableHead className="px-2">Status</TableHead>
          <TableHead className="px-2">Date</TableHead>
          <TableHead className="px-2 max-md:hidden">Channel</TableHead>
          <TableHead className="px-2 max-md:hidden">Category</TableHead>
          <TableHead className="px-2">Suspicion</TableHead>
          {pathname === '/alerts' && (
            <TableHead className="px-2">Action</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactionsWithSuspicious.map((t: Transaction) => {
          const status = getTransactionStatus(new Date(t.date))
          const amount = formatAmount(t.amount)

          const isDebit = t.type === 'debit';
          const isCredit = t.type === 'credit';
          const isSuspicious = t.suspiciousProbability && t.suspiciousProbability > 5;

          // Skip rendering if on alerts page and transaction is not suspicious
          if (pathname === '/alerts' && !isSuspicious) {
            return null;
          }

          return (
            <TableRow key={t.id} className={`${isDebit || amount[0] === '-' ? 'bg-[#FFFBFA]' : 'bg-[#F6FEF9]'} hover:!bg-none border-b-DEFAULT`}>
              <TableCell className="max-w-[250px] pl-2 pr-10">
                <div className="flex items-center gap-3">
                  {t.image && (
                    <img 
                      src={t.image} 
                      alt={t.name}
                      className="size-8 rounded-full object-cover"
                    />
                  )}
                  <h1 className="text-14 truncate font-semibold text-[#344054]">
                    {removeSpecialCharacters(t.name)}
                  </h1>
                </div>
              </TableCell>

              <TableCell className={`pl-2 pr-10 font-semibold ${
                isDebit || amount[0] === '-' ?
                  'text-[#f04438]'
                  : 'text-[#039855]'
              }`}>
                {isDebit ? `-${amount}` : isCredit ? amount : amount}
              </TableCell>

              <TableCell className="pl-2 pr-10">
                <CategoryBadge category={status} /> 
              </TableCell>

              <TableCell className="min-w-32 pl-2 pr-10">
                {formatDateTime(new Date(t.date)).dateTime}
              </TableCell>

              <TableCell className="pl-2 pr-10 capitalize min-w-24">
               {t.paymentChannel}
              </TableCell>

              <TableCell className="pl-2 pr-10 max-md:hidden">
               <CategoryBadge category={t.category} /> 
              </TableCell>

              <TableCell className="pl-2 pr-10">
                <div className={`font-semibold ${
                  isSuspicious 
                    ? 'text-red-600' 
                    : 'text-green-600'
                }`}>
                  {t.suspiciousProbability?.toFixed(1) || '0.0'}
                </div>
              </TableCell>

              {pathname === '/alerts' && (
                <TableCell className="pl-2 pr-10">
                  <Button 
                    className="bg-[#DC2626] hover:bg-[#DC2626]/90 text-white"
                    size="sm"
                    onClick={() => handleRemove(t.id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable