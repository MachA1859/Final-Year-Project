'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';
import CryptoChart from '@/components/CryptoChart';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: {
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
    price_change_percentage_1y: number;
    market_cap: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
  };
  market_cap_rank: number;
}

export default function CoinPage() {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
        );
        if (!response.ok) throw new Error('Failed to fetch coin data');
        const data = await response.json();
        setCoinData(data);
      } catch (err) {
        setError('This coin is currently unavailable, please try in a few minutes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [coinId]);

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  if (error) return <div className="flex min-h-screen items-center justify-center text-red-500">{error}</div>;
  if (!coinData) return null;

  return (
    <div className="flex min-h-screen flex-col p-8 pb-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <div className="mb-6">
        <Link href="/cryptocurrency">
          <Button variant="ghost" className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Cryptocurrencies
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 hide-scrollbar">
        {/* Header Section */}
        <div className="flex items-center gap-4">
          <img 
            src={coinData.image.large} 
            alt={coinData.name}
            className="size-16"
          />
          <div>
            <h1 className="text-3xl font-bold">{coinData.name}</h1>
            <p className="text-gray-500">{coinData.symbol.toUpperCase()}</p>
          </div>
        </div>

        {/* Price Section */}
        <div className="grid gap-4 rounded-lg border border-gray-200 dark:border-[#333] p-6 dark:bg-[#1e1e1e]">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">
              {formatCurrency(coinData.market_data.current_price.usd)}
            </span>
            <span className={`text-lg ${
              coinData.market_data.price_change_percentage_24h >= 0 
                ? 'text-green-500' 
                : 'text-red-500'
            }`}>
              {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
          <div className="text-gray-500">
            Rank #{coinData.market_cap_rank}
          </div>
        </div>

        {/* Chart Section */}
        <div className="rounded-lg border border-gray-200 dark:border-[#333] p-6 dark:bg-[#1e1e1e]">
          <CryptoChart coinId={coinId as string} />
        </div>

        {/* Market Data Section */}
        <div className="grid gap-6 rounded-lg border border-gray-200 dark:border-[#333] p-6 dark:bg-[#1e1e1e]">
          <h2 className="text-xl font-bold">Market Data</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <div>
              <p className="text-gray-500">Market Cap</p>
              <p className="text-lg font-semibold">
                {formatCurrency(coinData.market_data.market_cap.usd)}
              </p>
            </div>
            <div>
              <p className="text-gray-500">24h Trading Volume</p>
              <p className="text-lg font-semibold">
                {formatCurrency(coinData.market_data.total_volume.usd)}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Circulating Supply</p>
              <p className="text-lg font-semibold">
                {coinData.market_data.circulating_supply.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Total Supply</p>
              <p className="text-lg font-semibold">
                {coinData.market_data.total_supply.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Max Supply</p>
              <p className="text-lg font-semibold">
                {coinData.market_data.max_supply?.toLocaleString() || '∞'}
              </p>
            </div>
          </div>
        </div>

        {/* Price Changes Section */}
        <div className="grid gap-6 rounded-lg border border-gray-200 dark:border-[#333] p-6 dark:bg-[#1e1e1e]">
          <h2 className="text-xl font-bold">Price Changes</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <p className="text-gray-500">24h</p>
              <p className={`text-lg font-semibold ${
                coinData.market_data.price_change_percentage_24h >= 0 
                  ? 'text-green-500' 
                  : 'text-red-500'
              }`}>
                {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-gray-500">7d</p>
              <p className={`text-lg font-semibold ${
                coinData.market_data.price_change_percentage_7d >= 0 
                  ? 'text-green-500' 
                  : 'text-red-500'
              }`}>
                {coinData.market_data.price_change_percentage_7d.toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-gray-500">30d</p>
              <p className={`text-lg font-semibold ${
                coinData.market_data.price_change_percentage_30d >= 0 
                  ? 'text-green-500' 
                  : 'text-red-500'
              }`}>
                {coinData.market_data.price_change_percentage_30d.toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-gray-500">1y</p>
              <p className={`text-lg font-semibold ${
                coinData.market_data.price_change_percentage_1y >= 0 
                  ? 'text-green-500' 
                  : 'text-red-500'
              }`}>
                {coinData.market_data.price_change_percentage_1y.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 