'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

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

  const fetchCryptoData = async () => {
    try {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true'
      );
      const data = await res.json();
      setCoins(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching crypto data:', error);
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {coins.map((coin) => {
        const chartData = coin.sparkline_in_7d.price.map((price, index) => ({
          price,
          index,
        }));

        return (
          <div
            key={coin.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
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

            <div className="h-20">
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
        );
      })}
    </div>
  );
};

export default CryptoMarketWidget; 