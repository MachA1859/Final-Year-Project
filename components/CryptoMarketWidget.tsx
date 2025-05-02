'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
  sparkline_in_7d: {
    price: number[];
  };
}

const CryptoMarketWidget = () => {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCryptoData = async () => {
    try {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true',
        {
          headers: {
            'Accept': 'application/json',
          },
          next: {
            revalidate: 60, // Cache for 1 minute
          }
        }
      );
      
      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }
      
      const data = await res.json();
      setCoins(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      setError('Failed to load cryptocurrency data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
        <div className="text-red-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">Error Loading Data</h3>
        <p className="text-gray-500 mb-4">{error}</p>
        <button
          onClick={fetchCryptoData}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {coins.map((coin) => {
        const chartData = coin.sparkline_in_7d.price.map((price, index) => ({
          price,
          index,
        }));

        return (
          <Link 
            key={coin.id}
            href={`/cryptocurrency/${coin.id}`}
            className="block"
          >
            <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={coin.image}
                  alt={coin.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold">{coin.name}</h3>
                  <p className="text-gray-500 uppercase">{coin.symbol}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-2xl font-bold">
                  ${coin.current_price.toLocaleString()}
                </p>
                <p
                  className={`text-sm ${
                    coin.price_change_percentage_24h >= 0
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>

              <div className="h-[100px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke={
                        coin.price_change_percentage_24h >= 0 ? '#22c55e' : '#ef4444'
                      }
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CryptoMarketWidget; 