"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, Wallet } from "lucide-react"
import upbit from "@/app/upbit.png"


const images = [
  "https://flasherr.in/user/img/brand/brand_img07.png",
  "https://flasherr.in/user/img/brand/brand_img04.png",
  "https://flasherr.in/user/img/brand/brand_img01.png",
  "https://flasherr.in/user/img/brand/brand_img02.png",
  "https://flasherr.in/user/img/brand/brand_img05.png",
  "https://flasherr.in/user/img/brand/brand_img03.png",
];

export default function HeroSection() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [walletFlipped, setWalletFlipped] = useState(false)

  useEffect(() => {
    // Create duplicate items for seamless looping
    if (marqueeRef.current) {
      const marqueeContent = marqueeRef.current.innerHTML
      marqueeRef.current.innerHTML = marqueeContent + marqueeContent
    }
  }, [])

  const toggleWallet = () => {
    setWalletFlipped(!walletFlipped)
  }

  return (
    <section id="" className="pt-32 pb-20 px-4 md:px-0 relative overflow-hidden">
      {/* Abstract background */}
    

      {/* Circuit pattern overlay */}
      <div className="circuit-pattern"></div>

      <div className="container mx-auto text-center relative z-10">
        <div className="animate-fade-in mb-8">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm font-medium mb-6">
            BUILD ON Fast Flasher LAYER 2
          </div>
        </div>

        <h1 className="animate-fade-in text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6 max-w-4xl mx-auto">
        Fast Flasher is a better way to build products
        </h1>

        <p className="animate-fade-in text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
          DAO Managed by Fast Flasher DAO LLC Builds a Tokenized Layer 2 Native Restacking Integration, AA Wallets, World Class
          Payment System Powers the Next 1 Million DAOs World Wide!
        </p>

        <div className="animate-fade-in flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="btn-primary inline-flex items-center btn-hover-effect">
            Launch the app
            <ArrowRight className="ml-2" size={16} />
          </Button>

          <Button variant="outline" className="btn-outline inline-flex items-center" onClick={toggleWallet}>
            <Wallet className="mr-2" size={16} />
            View Wallet
          </Button>
        </div>

        {/* Bitcoin Wallet Animation */}
        {walletFlipped && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={toggleWallet}
          >
            <div className="wallet-container" onClick={(e) => e.stopPropagation()}>
              <div className={`wallet ${walletFlipped ? "flipped" : ""}`}>
                <div className="wallet-front">
                  <div className="flex justify-between items-start">
                    <div className="wallet-chip"></div>
                    <div className="text-xs text-white opacity-70">OxHash</div>
                  </div>
                  <div className="wallet-number">0x8F3...7A2E</div>
                  <div className="flex justify-between items-end">
                    <div className="wallet-name">Blockchain Wallet</div>
                    <div className="wallet-balance">3.42 ETH</div>
                  </div>
                </div>
                <div className="wallet-back">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="wallet-qr mb-4"></div>
                    <div className="text-white text-sm">Scan to send crypto</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Coin Grid */}



        <div className="mt-20">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-6">
            Trusted by leading blockchain projects
          </h3>

        </div>
      </div>


      <div id="partners" className="marquee-container">
        <div className="marquee" ref={marqueeRef}>
          {images.map((image, index) => (
            <div className="marquee-item" key={index}>
              <div className="h-12 w-32  rounded-md flex items-center justify-center">
                <img src={image} alt={`Blockchain Logo ${index + 1}`} className="max-h-full max-w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>


     
    </section>
  )
}
