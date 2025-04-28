import React from 'react'
import CryptoMarketWidget from '@/components/CryptoMarketWidget'
import CryptoAttributionFooter from '@/components/CryptoAttributionFooter'
import HeaderBox from '@/components/HeaderBox'

const Cryptocurrency = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-8">
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