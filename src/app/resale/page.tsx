"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { initAnimations } from "@/lib/animation"
import PageWrapper from "@/components/page-wrappper"

export default function ResalePage() {
  useEffect(() => {
    initAnimations()
  }, [])

  return (
    <PageWrapper>
      <div className="pt-32 pb-20 px-4 md:px-0">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="animate-fade-in text-4xl md:text-6xl font-bold text-white mb-6">Resale Marketplace</h1>
            <p className="animate-fade-in text-gray-600 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
              Buy and sell digital assets with confidence on our secure blockchain marketplace.
            </p>

            {/* Bitcoin animation */}
           
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="animate-slide-in-left">
              <h2 className="text-2xl font-bold text-white mb-4">Why Choose Our Marketplace</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center mr-3 mt-0.5">
                    <div className="h-2 w-2 bg-gray-500 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Zero Gas Fees</h3>
                    <p className="text-gray-600 text-sm">
                      Trade without worrying about high gas fees eating into your profits.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center mr-3 mt-0.5">
                    <div className="h-2 w-2 bg-gray-500 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Instant Settlements</h3>
                    <p className="text-gray-600 text-sm">
                      Get paid instantly when your assets sell with our Layer 2 technology.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center mr-3 mt-0.5">
                    <div className="h-2 w-2 bg-gray-500 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Secure Transactions</h3>
                    <p className="text-gray-600 text-sm">
                      Every transaction is verified and secured by our blockchain technology.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center mr-3 mt-0.5">
                    <div className="h-2 w-2 bg-gray-500 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Cross-Chain Support</h3>
                    <p className="text-gray-600 text-sm">
                      Trade assets across multiple blockchains with our interoperability features.
                    </p>
                  </div>
                </li>
              </ul>
              <div className="mt-8">
                <Button className="btn-primary">Start Trading</Button>
              </div>
            </div>
            <div className="animate-slide-in-right">
              <div className="bg-gray-100 rounded-xl p-8 h-full">
                <h2 className="text-2xl font-bold text-blue-800 mb-6">Market Statistics</h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Total Volume</span>
                      <span className="font-medium">$128.5M</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-gray-700 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Active Listings</span>
                      <span className="font-medium">24,891</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-gray-700 rounded-full w-2/3"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Unique Traders</span>
                      <span className="font-medium">18,342</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-gray-700 rounded-full w-1/2"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Average Sale Price</span>
                      <span className="font-medium">$1,240</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-gray-700 rounded-full w-4/5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 mb-20">
            <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-16 w-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="font-medium text-black mb-2">Connect Wallet</h3>
                <p className="text-gray-600 text-sm">Connect your wallet to our platform to start trading.</p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="font-medium text-black mb-2">List or Browse</h3>
                <p className="text-gray-600 text-sm">List your assets for sale or browse available listings.</p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="font-medium text-black mb-2">Trade Securely</h3>
                <p className="text-gray-600 text-sm">Complete transactions with our secure escrow system.</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary">Connect Wallet</Button>
              <Button variant="outline" className="btn-outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
