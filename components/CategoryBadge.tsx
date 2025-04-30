import { cn } from '@/lib/utils'

interface CategoryBadgeProps {
  category: string;
}

const transactionCategoryStyles = {
  default: {
    borderColor: 'border-[#E2E8F0]',
    backgroundColor: 'bg-[#E2E8F0]',
    textColor: 'text-[#475569]',
    chipBackgroundColor: 'bg-[#F8FAFC]'
  },
  'Food & Drink': {
    borderColor: 'border-[#FEE2E2]',
    backgroundColor: 'bg-[#FEE2E2]',
    textColor: 'text-[#B91C1C]',
    chipBackgroundColor: 'bg-[#FEF2F2]'
  },
  'Income': {
    borderColor: 'border-[#D1FAE5]',
    backgroundColor: 'bg-[#D1FAE5]',
    textColor: 'text-[#065F46]',
    chipBackgroundColor: 'bg-[#ECFDF5]'
  },
  'Entertainment': {
    borderColor: 'border-[#E0E7FF]',
    backgroundColor: 'bg-[#E0E7FF]',
    textColor: 'text-[#3730A3]',
    chipBackgroundColor: 'bg-[#EEF2FF]'
  },
  'Transportation': {
    borderColor: 'border-[#FEF3C7]',
    backgroundColor: 'bg-[#FEF3C7]',
    textColor: 'text-[#92400E]',
    chipBackgroundColor: 'bg-[#FFFBEB]'
  },
  'Shopping': {
    borderColor: 'border-[#F3E8FF]',
    backgroundColor: 'bg-[#F3E8FF]',
    textColor: 'text-[#6B21A8]',
    chipBackgroundColor: 'bg-[#F5F3FF]'
  },
  'Health & Fitness': {
    borderColor: 'border-[#FCE7F3]',
    backgroundColor: 'bg-[#FCE7F3]',
    textColor: 'text-[#9D174D]',
    chipBackgroundColor: 'bg-[#FDF2F8]'
  },
  'Utilities': {
    borderColor: 'border-[#E0F2FE]',
    backgroundColor: 'bg-[#E0F2FE]',
    textColor: 'text-[#0369A1]',
    chipBackgroundColor: 'bg-[#F0F9FF]'
  },
  'Insurance': {
    borderColor: 'border-[#F1F5F9]',
    backgroundColor: 'bg-[#F1F5F9]',
    textColor: 'text-[#334155]',
    chipBackgroundColor: 'bg-[#F8FAFC]'
  },
  'Healthcare': {
    borderColor: 'border-[#FEE2E2]',
    backgroundColor: 'bg-[#FEE2E2]',
    textColor: 'text-[#B91C1C]',
    chipBackgroundColor: 'bg-[#FEF2F2]'
  }
}

export const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const {
    borderColor,
    backgroundColor,
    textColor,
    chipBackgroundColor,
  } = transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default
  
  return (
    <div className={cn('category-badge', borderColor, chipBackgroundColor)}>
      <div className={cn('size-2 rounded-full', backgroundColor)} />
      <p className={cn('text-[12px] font-medium', textColor)}>{category}</p>
    </div>
  )
} 