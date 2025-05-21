"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { initAnimations } from "@/lib/animation"
import PageWrapper from "@/components/page-wrappper"
import { ArrowDownUp, Bitcoin, EclipseIcon as Ethereum, DollarSign } from "lucide-react" // Ethereum is EclipseIcon
import Image from "next/image"

// Define the type for currency keys
type Currency = 'BTC' | 'ETH' | 'USDT' | 'OXH' | 'FUSDT' | 'FETH' | 'FXRP' | 'FMATIC'
type OriginalCurrency = 'BTC' | 'ETH' | 'USDT' | 'OXH';
type FlashCurrency = 'FUSDT' | 'FETH' | 'FXRP' | 'FMATIC';

const originalCurrencyDefs: { value: OriginalCurrency; label: string }[] = [
  { value: "USDT", label: "USDT" },
];

const flashCurrencyDefs: { value: FlashCurrency; label: string }[] = [
  { value: "FUSDT", label: "FUSDT" },
  { value: "FETH", label: "FETH" },
  { value: "FXRP", label: "FXRP" },
  { value: "FMATIC", label: "FMATIC" },
];

// Mapping for specific images provided for popular conversions


export default function ConverterPage() {
  const [fromAmount, setFromAmount] = useState<string>("1")
  const [toAmount, setToAmount] = useState<string>("0")
  const [fromCurrency, setFromCurrency] = useState<Currency>("USDT")
  const [toCurrency, setToCurrency] = useState<Currency>("FUSDT")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOriginalToFlash, setIsOriginalToFlash] = useState<boolean>(true) // true: Original -> Flash, false: Flash -> Original

  // Exchange Rates (kept as is)
  const oBTC_USDT = 43250.75
  const oBTC_ETH = 15.82
  const oBTC_OXH = 86501.5

  const oETH_USDT = 2734.21
  const oETH_BTC = 0.063
  const oETH_OXH = 5468.42

  const oUSDT_BTC = 0.000023
  const oUSDT_ETH = 0.00037
  const oUSDT_OXH = 2

  const oOXH_USDT = 0.5
  const oOXH_BTC = 0.000012
  const oOXH_ETH = 0.00018

  const USDT_TO_FUSDT = 100
  const USDT_TO_FETH = 0.005
  const USDT_TO_FXRP = 80
  const USDT_TO_FMATIC = 90

  const FUSDT_TO_USDT = 1 / USDT_TO_FUSDT
  const FETH_TO_USDT = 1 / USDT_TO_FETH
  const FXRP_TO_USDT = 1 / USDT_TO_FXRP
  const FMATIC_TO_USDT = 1 / USDT_TO_FMATIC

  const exchangeRates: Record<Currency, Record<Currency, number>> = {
    BTC: {
      BTC: 1, ETH: oBTC_ETH, USDT: oBTC_USDT, OXH: oBTC_OXH,
      FUSDT: oBTC_USDT * USDT_TO_FUSDT, FETH: oBTC_USDT * USDT_TO_FETH,
      FXRP: oBTC_USDT * USDT_TO_FXRP, FMATIC: oBTC_USDT * USDT_TO_FMATIC,
    },
    ETH: {
      BTC: oETH_BTC, ETH: 1, USDT: oETH_USDT, OXH: oETH_OXH,
      FUSDT: oETH_USDT * USDT_TO_FUSDT, FETH: oETH_USDT * USDT_TO_FETH,
      FXRP: oETH_USDT * USDT_TO_FXRP, FMATIC: oETH_USDT * USDT_TO_FMATIC,
    },
    USDT: {
      BTC: oUSDT_BTC, ETH: oUSDT_ETH, USDT: 1, OXH: oUSDT_OXH,
      FUSDT: USDT_TO_FUSDT, FETH: USDT_TO_FETH,
      FXRP: USDT_TO_FXRP, FMATIC: USDT_TO_FMATIC,
    },
    OXH: {
      BTC: oOXH_BTC, ETH: oOXH_ETH, USDT: oOXH_USDT, OXH: 1,
      FUSDT: oOXH_USDT * USDT_TO_FUSDT, FETH: oOXH_USDT * USDT_TO_FETH,
      FXRP: oOXH_USDT * USDT_TO_FXRP, FMATIC: oOXH_USDT * USDT_TO_FMATIC,
    },
    FUSDT: {
      BTC: FUSDT_TO_USDT * oUSDT_BTC, ETH: FUSDT_TO_USDT * oUSDT_ETH, USDT: FUSDT_TO_USDT, OXH: FUSDT_TO_USDT * oUSDT_OXH,
      FUSDT: 1, FETH: FUSDT_TO_USDT * USDT_TO_FETH, FXRP: FUSDT_TO_USDT * USDT_TO_FXRP, FMATIC: FUSDT_TO_USDT * USDT_TO_FMATIC,
    },
    FETH: {
      BTC: FETH_TO_USDT * oUSDT_BTC, ETH: FETH_TO_USDT * oUSDT_ETH, USDT: FETH_TO_USDT, OXH: FETH_TO_USDT * oUSDT_OXH,
      FUSDT: FETH_TO_USDT * USDT_TO_FUSDT, FETH: 1, FXRP: FETH_TO_USDT * USDT_TO_FXRP, FMATIC: FETH_TO_USDT * USDT_TO_FMATIC,
    },
    FXRP: {
      BTC: FXRP_TO_USDT * oUSDT_BTC, ETH: FXRP_TO_USDT * oUSDT_ETH, USDT: FXRP_TO_USDT, OXH: FXRP_TO_USDT * oUSDT_OXH,
      FUSDT: FXRP_TO_USDT * USDT_TO_FUSDT, FETH: FXRP_TO_USDT * USDT_TO_FETH, FXRP: 1, FMATIC: FXRP_TO_USDT * USDT_TO_FMATIC,
    },
    FMATIC: {
      BTC: FMATIC_TO_USDT * oUSDT_BTC, ETH: FMATIC_TO_USDT * oUSDT_ETH, USDT: FMATIC_TO_USDT, OXH: FMATIC_TO_USDT * oUSDT_OXH,
      FUSDT: FMATIC_TO_USDT * USDT_TO_FUSDT, FETH: FMATIC_TO_USDT * USDT_TO_FETH, FXRP: FMATIC_TO_USDT * USDT_TO_FXRP, FMATIC: 1,
    },
  }

  useEffect(() => {
    initAnimations()
  }, [])

  useEffect(() => {
    if (fromAmount && fromCurrency && toCurrency && exchangeRates[fromCurrency] && exchangeRates[fromCurrency][toCurrency]) {
      const rate = exchangeRates[fromCurrency][toCurrency]
      const result = Number.parseFloat(fromAmount) * rate
      setToAmount(result.toFixed(8))
    } else if (fromAmount === "") {
      setToAmount("")
    } else {
      setToAmount("0")
    }
  }, [fromAmount, fromCurrency, toCurrency, exchangeRates])

  const handleSwap = () => {
    setIsLoading(true)
    setTimeout(() => {
      const newIsOriginalToFlash = !isOriginalToFlash;
      setIsOriginalToFlash(newIsOriginalToFlash);

      const oldFromCurrency = fromCurrency;
      const oldToCurrency = toCurrency;

      // Determine new default currencies based on the swapped direction
      let newFromCurrency: Currency;
      let newToCurrency: Currency;

      if (newIsOriginalToFlash) {
        // Swapping from Flash -> Original to Original -> Flash
        // Try to keep the currency "type" if possible, or pick defaults
        newFromCurrency = originalCurrencyDefs.find(c => c.value === oldToCurrency) ? oldToCurrency as OriginalCurrency : originalCurrencyDefs[0].value;
        newToCurrency = flashCurrencyDefs.find(c => c.value === oldFromCurrency) ? oldFromCurrency as FlashCurrency : flashCurrencyDefs[0].value;
      } else {
        // Swapping from Original -> Flash to Flash -> Original
        newFromCurrency = flashCurrencyDefs.find(c => c.value === oldToCurrency) ? oldToCurrency as FlashCurrency : flashCurrencyDefs[0].value;
        newToCurrency = originalCurrencyDefs.find(c => c.value === oldFromCurrency) ? oldFromCurrency as OriginalCurrency : originalCurrencyDefs[0].value;
      }

      setFromCurrency(newFromCurrency);
      setToCurrency(newToCurrency);
      // fromAmount is kept, toAmount will be recalculated by useEffect

      setIsLoading(false)
    }, 500)
  }

  const getCurrencyIcon = (currency: Currency) => {
    const iconStyle = "w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-800 dark:text-white text-xs font-bold";
    switch (currency) {
      case "BTC": return <Bitcoin className="text-orange-500 w-6 h-6" />;
      case "ETH": return <Ethereum className="text-indigo-500 w-6 h-6" />;
      case "USDT": return <DollarSign className="text-green-500 w-6 h-6" />;
      case "OXH": return <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">OX</div>;
      case "FUSDT": return <div className={iconStyle}>F$</div>;
      case "FETH": return <div className={iconStyle}>FΞ</div>;
      case "FXRP": return <div className={iconStyle}>FX</div>;
      case "FMATIC": return <div className={iconStyle}>FM</div>;
      default: return <div className="w-6 h-6"></div>; // Fallback empty div
    }
  }

  const fromOptions = isOriginalToFlash ? originalCurrencyDefs : flashCurrencyDefs;
  const toOptions = isOriginalToFlash ? flashCurrencyDefs : originalCurrencyDefs;

  useEffect(() => {
    // Adjust currencies if they are not valid for the current direction
    if (isOriginalToFlash) {
      if (!originalCurrencyDefs.some(opt => opt.value === fromCurrency)) {
        setFromCurrency(originalCurrencyDefs[0].value);
      }
      if (!flashCurrencyDefs.some(opt => opt.value === toCurrency)) {
        setToCurrency(flashCurrencyDefs[0].value);
      }
    } else {
      if (!flashCurrencyDefs.some(opt => opt.value === fromCurrency)) {
        setFromCurrency(flashCurrencyDefs[0].value);
      }
      if (!originalCurrencyDefs.some(opt => opt.value === toCurrency)) {
        setToCurrency(originalCurrencyDefs[0].value);
      }
    }
  }, [isOriginalToFlash, fromCurrency, toCurrency]);




  return (
    <PageWrapper>
      <div className="min-h-screen pt-32 pb-20 px-4 md:px-0">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="animate-fade-in text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
              Flash Converter
            </h1>
            <p className="animate-fade-in text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
              Fast, very Fast, the fastest convertor
            </p>
            <div className="bitcoin-animation mb-10">
              <div className="bitcoin-logo">
                <Image
                  src="/tronnew.png"
                  alt="Logo"
                  width={100}
                  height={80}
                  className="object-contain rounded-full animate-pulse transform-3d -skew-y-6 shadow-md shadow-white "
                />
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
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === "" || /^\d*\.?\d*$/.test(val)) {
                              setFromAmount(val);
                            }
                          }}
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
                        {fromOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
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
                        {toOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center my-6">
                <Button
                  onClick={handleSwap}
                  disabled={isLoading}
                  className="rounded-full p-3 bg-indigo-600 hover:bg-indigo-700 text-white btn-hover-effect"
                >
                  <ArrowDownUp size={24} className={isLoading ? "animate-spin" : ""} />
                </Button>
              </div>

              <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
                {(exchangeRates[fromCurrency] && exchangeRates[fromCurrency][toCurrency]) ?
                  `1 ${fromCurrency} = ${exchangeRates[fromCurrency][toCurrency].toFixed(8)} ${toCurrency}` :
                  `Rate not available for ${fromCurrency} to ${toCurrency}`
                }
              </div>

              <Button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg btn-hover-effect">
                Convert Now
              </Button>
            </div>
            <div className="mt-3 px-10">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                Supported Cryptocurrencies
              </h2>
              <div className="coin-grid">
                {[
                  { name: "Flash USDT", symbol: "USDT", color: "bg-green-500" },
                  { name: "Flash ETH", symbol: "ETH", color: "bg-indigo-500" },
                  { name: "Flash XRP", symbol: "XRP", color: "bg-gray-500" },
                  { name: "Flash MATIC", symbol: "MATIC", color: "bg-purple-600" },
                ].map((coin, index) => (
                  <div key={index} className={`coin-item ${coin.color} text-white font-bold text-xs`} title={coin.name}>
                    {coin.symbol}
                  </div>
                ))}
              </div>

            </div>
          </div>


        </div>

      </div>
    </PageWrapper>
  )
}