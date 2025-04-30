"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
  page: number;
  baseUrl?: string;
}

const Pagination = ({ totalPages, page, baseUrl = '' }: PaginationProps) => {
  const searchParams = useSearchParams();
  const currentPage = page || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
        <Link
          key={pageNumber}
          href={createPageURL(pageNumber)}
          className={`px-3 py-1 rounded ${
            currentPage === pageNumber
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {pageNumber}
        </Link>
      ))}
    </div>
  );
};

export default Pagination; 