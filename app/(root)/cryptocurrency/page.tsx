import React from 'react'
import CryptoMarketWidget from '@/components/CryptoMarketWidget'
import CryptoAttributionFooter from '@/components/CryptoAttributionFooter'

const Cryptocurrency = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Cryptocurrency Market</h1>
          <CryptoMarketWidget />
          <CryptoAttributionFooter />
        </div>
      </div>
    </div>
  )
}

export default Cryptocurrency 