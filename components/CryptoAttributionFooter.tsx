'use client';

import Image from 'next/image';
import Link from 'next/link';

const CryptoAttributionFooter = () => {
  return (
    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-[#1e1e1e]">
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-gray-500">
          Data provided by{' '}
          <Link 
            href="https://www.coingecko.com?utm_source=myntpay&utm_medium=referral" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            CoinGecko
          </Link>
        </p>
        <Link 
          href="https://www.coingecko.com?utm_source=myntpay&utm_medium=referral" 
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Image
            src="/icons/coingecko-attribution.png"
            alt="CoinGecko Attribution"
            width={200}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
      </div>
    </div>
  );
};

export default CryptoAttributionFooter; 