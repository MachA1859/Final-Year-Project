'use client';

import React from 'react'
import CryptoMarketWidget from '@/components/CryptoMarketWidget'
import CryptoAttributionFooter from '@/components/CryptoAttributionFooter'
import HeaderBox from '@/components/HeaderBox'

const Cryptocurrency = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 p-8 overflow-y-auto no-scrollbar">
        <div className="max-w-7xl mx-auto">
          <HeaderBox 
            title="Cryptocurrency Market"
            subtext="Track and monitor cryptocurrency prices and market trends in real-time."
          />
          <CryptoMarketWidget />
          <CryptoAttributionFooter />
        </div>
      </div>
    </div>
  )
}

export default Cryptocurrency 