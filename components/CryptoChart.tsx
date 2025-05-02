'use client';

import { useEffect, useRef, useState } from 'react';

interface CryptoChartProps {
  coinId: string;
}

declare global {
  interface Window {
    TradingView: any;
  }
}

export default function CryptoChart({ coinId }: CryptoChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Load TradingView widget script
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        try {
          const symbolMap: { [key: string]: string } = {
            'bitcoin': 'BTC',
            'ethereum': 'ETH',
            'tether': 'USDTUSD',
            'xrp': 'XRP',
            'binancecoin': 'BNB',
            'solana': 'SOL',
            'usd-coin': 'USDC',
            'dogecoin': 'DOGE',
            'cardano': 'ADA',
            'tron': 'TRX'
          };

          new window.TradingView.widget({
            container_id: chartRef.current?.id,
            symbol: coinId === 'tether' ? 'USDTUSD' : `BINANCE:${symbolMap[coinId] || coinId.toUpperCase()}USDT`,
            interval: 'D',
            timezone: 'exchange',
            theme: 'light',
            style: '1',
            locale: 'en',
            toolbar_bg: '#f1f3f6',
            enable_publishing: false,
            allow_symbol_change: true,
            save_image: false,
            studies: ['RSI@tv-basicstudies'],
            show_popup_button: true,
            popup_width: '1000',
            popup_height: '650',
            width: '100%',
            height: '600',
            autosize: false,
          });
          setError(null);
        } catch (err) {
          console.error('Error initializing TradingView widget:', err);
          setError('Failed to load chart. Please try a different cryptocurrency.');
        }
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [coinId]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-4">
          <div className="text-red-500 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      id="tradingview-widget-container"
      ref={chartRef}
      className="w-full"
      style={{ height: '600px' }}
    />
  );
} 