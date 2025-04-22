"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { initAnimations } from "@/lib/animation"
import PageWrapper from "@/components/page-wrappper"
import { ArrowDownUp, Bitcoin, EclipseIcon as Ethereum, DollarSign } from "lucide-react"

// Define the type for currency keys
type Currency = 'BTC' | 'ETH' | 'USDT' | 'OXH'

export default function ConverterPage() {
  const [fromAmount, setFromAmount] = useState<string>("1")
  const [toAmount, setToAmount] = useState<string>("0")
  const [fromCurrency, setFromCurrency] = useState<Currency>("BTC")
  const [toCurrency, setToCurrency] = useState<Currency>("USDT")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const exchangeRates: Record<Currency, Record<Currency, number>> = {
    BTC: { USDT: 43250.75, ETH: 15.82, OXH: 86501.5, BTC: 1 },
    ETH: { USDT: 2734.21, BTC: 0.063, OXH: 5468.42, ETH: 1 },
    USDT: { BTC: 0.000023, ETH: 0.00037, OXH: 2, USDT: 1 },
    OXH: { USDT: 0.5, BTC: 0.000012, ETH: 0.00018, OXH: 1 },
  }


  useEffect(() => {
    initAnimations()
  }, [])

  useEffect(() => {
    if (fromAmount && fromCurrency && toCurrency) {
      const rate = exchangeRates[fromCurrency][toCurrency]
      const result = Number.parseFloat(fromAmount) * rate
      setToAmount(result.toFixed(8))
    }
  }, [fromAmount, fromCurrency, toCurrency])

  const handleSwap = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const tempCurrency = fromCurrency
      setFromCurrency(toCurrency)
      setToCurrency(tempCurrency)

      // Recalculate based on new currencies
      const rate = exchangeRates[toCurrency][tempCurrency]
      const result = Number.parseFloat(fromAmount) * rate
      setToAmount(result.toFixed(8))

      setIsLoading(false)
    }, 500)
  }

  const getCurrencyIcon = (currency: Currency) => {
    switch (currency) {
      case "BTC":
        return <Bitcoin className="text-orange-500" />
      case "ETH":
        return <Ethereum className="text-indigo-500" />
      case "USDT":
        return <DollarSign className="text-green-500" />
      case "OXH":
        return (
          <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            OX
          </div>
        )
      default:
        return null
    }
  }

  return (
    <PageWrapper>
      <div className="min-h-screen pt-32 pb-20 px-4 md:px-0">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="animate-fade-in text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
              Crypto Converter
            </h1>
            <p className="animate-fade-in text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
              Convert between cryptocurrencies with real-time exchange rates
            </p>

            {/* Bitcoin animation */}
            <div className="bitcoin-animation mb-10">
              <div className="bitcoin-logo">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="white">
                  <path d="M23.638 14.904c-1.602 6.425-8.113 10.343-14.542 8.743C2.67 22.05-1.244 15.542.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.349-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.415-.614.32.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.52 2.75 2.084v.006z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* From Currency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">From</label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="relative">
                        <input
                          type="number"
                          value={fromAmount}
                          onChange={(e) => setFromAmount(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div>
                      <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value as Currency)}
                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="BTC">BTC</option>
                        <option value="ETH">ETH</option>
                        <option value="USDT">USDT</option>
                        <option value="OXH">OXH</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* To Currency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">To</label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="relative">
                        <input
                          type="text"
                          value={toAmount}
                          readOnly
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div>
                      <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value as Currency)}
                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="USDT">USDT</option>
                        <option value="BTC">BTC</option>
                        <option value="ETH">ETH</option>
                        <option value="OXH">OXH</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center my-6">
                <Button
                  onClick={handleSwap}
                  disabled={isLoading}
                  className="rounded-full p-3 bg-indigo-600 hover:bg-indigo-700 text-white btn-hover-effect"
                >
                  <ArrowDownUp size={24} className={isLoading ? "animate-spin" : ""} />
                </Button>
              </div>

              {/* Exchange Rate */}
              <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
                1 {fromCurrency} = {exchangeRates[fromCurrency][toCurrency]} {toCurrency}
              </div>

              {/* Convert Button */}
              <Button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg btn-hover-effect">
                Convert Now
              </Button>
            </div>

            {/* Popular Conversions */}
            <div className="bg-gray-50 dark:bg-gray-900 p-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Popular Conversions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { from: "BTC", to: "USDT" },
                  { from: "ETH", to: "USDT" },
                  { from: "OXH", to: "USDT" },
                ].map((pair, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => {
                      setFromCurrency(pair.from as Currency)
                      setToCurrency(pair.to as Currency)
                    }}
                  >
                    <div className="flex items-center">
                      {getCurrencyIcon(pair.from as Currency)}
                      <span className="ml-2 text-gray-800 dark:text-white">{pair.from}</span>
                    </div>
                    <ArrowDownUp size={16} className="text-gray-400 mx-2" />
                    <div className="flex items-center">
                      {getCurrencyIcon(pair.to as Currency)}
                      <span className="ml-2 text-gray-800 dark:text-white">{pair.to}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coin Grid */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Supported Cryptocurrencies
            </h2>
            <div className="coin-grid">
              {[
                { name: "Bitcoin", symbol: "BTC", color: "bg-orange-500" },
                { name: "Ethereum", symbol: "ETH", color: "bg-indigo-500" },
                { name: "Tether", symbol: "USDT", color: "bg-green-500" },
                { name: "Fast Flasher", symbol: "OXH", color: "bg-indigo-600" },
                { name: "Binance Coin", symbol: "BNB", color: "bg-yellow-500" },
                { name: "Cardano", symbol: "ADA", color: "bg-blue-500" },
                { name: "Solana", symbol: "SOL", color: "bg-purple-500" },
                { name: "XRP", symbol: "XRP", color: "bg-gray-500" },
                { name: "Polkadot", symbol: "DOT", color: "bg-pink-500" },
                { name: "Dogecoin", symbol: "DOGE", color: "bg-yellow-400" },
                { name: "Avalanche", symbol: "AVAX", color: "bg-red-500" },
                { name: "Polygon", symbol: "MATIC", color: "bg-purple-600" },
              ].map((coin, index) => (
                <div key={index} className={`coin-item ${coin.color} text-white font-bold text-xs`} title={coin.name}>
                  {coin.symbol}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
