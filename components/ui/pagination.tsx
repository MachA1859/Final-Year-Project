"use client";

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalPages: number;
  page: number;
  baseUrl?: string;
}

const Pagination = ({ totalPages, page, baseUrl = '' }: PaginationProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = page || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${baseUrl}?${params.toString()}`;
  };

  const handlePageChange = (newPage: number) => {
    const url = createPageURL(newPage);
    router.push(url);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 dark:bg-[#1e1e1e] dark:text-white dark:border-[#333]"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="icon"
          className={`h-8 w-8 ${
            currentPage === page
              ? "bg-blue-600 text-white dark:bg-[#7F56D9] dark:text-white"
              : "dark:bg-[#1e1e1e] dark:text-white dark:border-[#333]"
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 dark:bg-[#1e1e1e] dark:text-white dark:border-[#333]"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination; 