"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { initAnimations } from "@/lib/animation"
import PageWrapper from "@/components/page-wrappper"
import { useRouter } from "next/navigation"

interface CryptoCardProps {
  name: string
  symbol: string
  color: string
  icon: React.ReactNode
  description: string
  isExpanded: boolean
  onToggle: () => void
  onSelect: () => void
}

const CryptoCard = ({ name, symbol, color, icon, description, isExpanded, onToggle, onSelect }: CryptoCardProps) => {
  return (
    <div
      className={`animate-fade-in crypto-card rounded-lg p-8 flex flex-col items-center ${isExpanded ? "expanded" : ""}`}
      onClick={onToggle}
    >
      <div
        className={`h-24 w-24 bg-blue-900 rounded-full flex items-center justify-center mb-6 floating ${isExpanded ? "glow" : ""}`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">
        {name} ({symbol})
      </h3>
      <p className="text-gray-300 text-sm mb-6 text-center">{description}</p>
      <Button
        className="w-full bg-blue-600 hover:bg-blue-700 btn-hover-effect"
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
        }}
      >
        Select
      </Button>

      {isExpanded && (
        <div className="crypto-details mt-8 w-full">
          <div className="border-t border-blue-800 pt-6 mt-4">
            <h4 className="text-lg font-semibold mb-4 text-white">Features of {name} USDT</h4>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-900 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-xs text-white">1</span>
                </div>
                <div>
                  <h5 className="font-medium text-white">Wallet to wallet transfer maximum 60</h5>
                  <p className="text-gray-300 text-sm mt-1">
                    Direct transfers between wallets with a maximum chain of 60 transfers.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-900 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-xs text-white">2</span>
                </div>
                <div>
                  <h5 className="font-medium text-white">Flash USDT expiry 140 to 160 days</h5>
                  <p className="text-gray-300 text-sm mt-1">
                    After this period, it will automatically disappear from the wallet.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-900 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-xs text-white">3</span>
                </div>
                <div>
                  <h5 className="font-medium text-white">You can resell your Flash back to us</h5>
                  <p className="text-gray-300 text-sm mt-1">
                    If your Flash USDT has been in your wallet for 30 days or more, you can sell it back.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-900 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-xs text-white">4</span>
                </div>
                <div>
                  <h5 className="font-medium text-white">Flash USDT equivalent to real USDT</h5>
                  <p className="text-gray-300 text-sm mt-1">
                    Can be used on platforms like gambling sites just like real USDT.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-900 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-xs text-white">5</span>
                </div>
                <div>
                  <h5 className="font-medium text-white">Flash USDT cannot be used in P2P</h5>
                  <p className="text-gray-300 text-sm mt-1">It is strictly limited to internal transfers.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-900 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-xs text-white">6</span>
                </div>
                <div>
                  <h5 className="font-medium text-white">Not tradable</h5>
                  <p className="text-gray-300 text-sm mt-1">
                    Flash USDT cannot be withdrawn. It is designed for use within the platform.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-blue-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-300">1 USDT = 5 FLASH USDT</span>
                <span className="text-gray-300">Min: 10 USDT</span>
              </div>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 btn-hover-effect"
                onClick={(e) => {
                  e.stopPropagation()
                  onSelect()
                }}
              >
                Convert Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function USDTPage() {
  const router = useRouter()

  useEffect(() => {
    initAnimations()

    // Create particle animation
    const particlesContainer = document.querySelector(".particles")
    if (particlesContainer) {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div")
        particle.classList.add("particle")

        // Random position
        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`

        // Random size
        const size = Math.random() * 3 + 1
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`

        // Random opacity
        particle.style.opacity = `${Math.random() * 0.5 + 0.3}`

        // Random animation
        particle.style.animation = `floating ${Math.random() * 10 + 5}s linear infinite`

        particlesContainer.appendChild(particle)
      }
    }
  }, [])

  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const toggleCard = (cardId: string) => {
    if (expandedCard === cardId) {
      setExpandedCard(null)
    } else {
      setExpandedCard(cardId)
    }
  }

  const navigateToConverter = () => {
    router.push("/converter")
  }

  return (
    <PageWrapper>
      <div className="min-h-screen crypto-bg text-white pt-32 pb-20 px-4 md:px-0">
        {/* Particle animation */}
        <div className="particles"></div>

        {/* Circuit pattern overlay */}
        <div className="circuit-pattern"></div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h1 className="scroll-trigger text-4xl md:text-7xl font-bold mb-6 text-white">
              <span className="text-blue-400">Choose Your</span>
              <br />
              USDT
            </h1>
            <p className="scroll-trigger text-gray-300 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
              Select the blockchain network that best suits your needs for USDT transactions.
            </p>

            {/* Bitcoin animation */}
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CryptoCard
              name="POL"
              symbol="polygon"
              color="purple"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="#8247E5">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.243 17.657L6.9 14.8l3.857-2.25 3.857 2.25-3.857 2.857zm0-5.714L6.9 9.086l3.857-2.25 3.857 2.25-3.857 2.857zm7.714 2.857l-3.857 2.857V14.8l3.857-2.25v2.25z" />
                </svg>
              }
              description="Fast transactions with low fees on the Polygon network."
              isExpanded={expandedCard === "polygon"}
              onToggle={() => toggleCard("polygon")}
              onSelect={navigateToConverter}
            />

            <CryptoCard
              name="TRON"
              symbol="TRC20"
              color="teal"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="#26A17B">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm-1.2 4.8v6.4h2.4v-6.4h-2.4z" />
                </svg>
              }
              description="Efficient and cost-effective transactions on the TRON network."
              isExpanded={expandedCard === "tron"}
              onToggle={() => toggleCard("tron")}
              onSelect={navigateToConverter}
            />

            <CryptoCard
              name="ETH"
              symbol="ERC20"
              color="indigo"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="#627EEA">
                  <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
                </svg>
              }
              description="The original USDT implementation on the Ethereum network."
              isExpanded={expandedCard === "ethereum"}
              onToggle={() => toggleCard("ethereum")}
              onSelect={navigateToConverter}
            />

            <CryptoCard
              name="BINANCE"
              symbol="BEP20"
              color="yellow"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="#F0B90B">
                  <path d="M12 0L5.5 6.5 2.75 3.75 0 6.5l2.75 2.75L0 12l2.75 2.75L0 17.5l2.75 2.75L5.5 17.5 12 24l6.5-6.5 2.75 2.75 2.75-2.75-2.75-2.75L24 12l-2.75-2.75L24 6.5l-2.75-2.75L18.5 6.5 12 0zm0 4.37L17.63 10 12 15.63 6.37 10 12 4.37z" />
                </svg>
              }
              description="Fast and low-cost transactions on the Binance Smart Chain."
              isExpanded={expandedCard === "binance"}
              onToggle={() => toggleCard("binance")}
              onSelect={navigateToConverter}
            />
          </div>

          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold mb-8 text-white">How Flash USDT Works</h2>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="scroll-trigger-left bg-blue-900 bg-opacity-30 rounded-lg p-8 backdrop-filter backdrop-blur-sm border border-blue-800">
                <p className="text-gray-300 mb-6">
                  We create Flash Crypto in large quantities with a vast supply. When you place an order, our team
                  verifies the details and transfers your Flash USDT within 15 minutes. With 20 active employees, we
                  ensure fast and reliable transactions.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-800 flex items-center justify-center mr-3 mt-0.5">
                      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">
                        What if my wallet address is wrong or the transfer fails?
                      </h3>
                      <p className="text-gray-300 text-sm mt-1">
                        We'll notify you via email within 30 minutes and refund your USDT.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-800 flex items-center justify-center mr-3 mt-0.5">
                      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Our Mission & Vision</h3>
                      <p className="text-gray-300 text-sm mt-1">
                        We aim to make Flash USDT accessible to everyone, ensuring fast, secure, and hassle-free
                        transactions. Our vision is to support users who struggle to buy Flash USDT by providing a
                        trusted, efficient, and customer-friendly platform with instant transfers and 24/7 support.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-800 flex items-center justify-center mr-3 mt-0.5">
                      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Why should I trust your platform?</h3>
                      <p className="text-gray-300 text-sm mt-1">
                        We have over 1,000,000 buyers and process 60,000 to 70,000 transactions daily, ensuring fast and
                        reliable transfers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="scroll-trigger-right relative">
                <div className="network-animation h-80 w-full relative">
                  {/* Shield icon */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="128"
                      height="128"
                      fill="rgba(59, 130, 246, 0.1)"
                      className="pulse"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="1" fill="none" />
                    </svg>
                  </div>

                  {/* Network nodes and lines - will be populated by JS */}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="network-node"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `pulse ${Math.random() * 3 + 2}s infinite`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center">
            <div className="scroll-trigger inline-block bg-blue-900 bg-opacity-30 rounded-lg p-8 backdrop-filter backdrop-blur-sm border border-blue-800">
              <h3 className="text-xl font-bold mb-4 text-white">Ready to get started?</h3>
              <p className="text-gray-300 mb-6">Purchase Flash USDT now and experience fast, secure transactions.</p>
              <Button className="bg-blue-600 hover:bg-blue-700 btn-hover-effect" onClick={navigateToConverter}>
                Go to Converter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
