"use client"

import type React from "react"

import { useState, useRef } from "react"
import * as emailjs from "@emailjs/browser"
import Image from 'next/image'; // Import Image component if using Next.js for optimization

interface NetworkOption {
  id: string
  name: string
  symbol: string
  color: string
  logo: string // Path to the logo image
  walletAddress: string
}

export default function USDTPage() {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkOption | null>(null)
  const [transactionId, setTransactionId] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [amount, setAmount] = useState("20.00")
  const [email, setEmail] = useState("")
  const [copied, setCopied] = useState(false)
  
  const networks: NetworkOption[] = [
  
    {
      id: "USDT (TRC20)",
      name: "USDT",
      symbol: "TRC20",
      color: "#26A17B",
      logo: "/tronnew.png", // Path relative to the public folder
      walletAddress: "TLRgHFbz3b9uDaMUNnpbWoGvQ66H2hW4L7",
    },
      {
      id: "polygon",
      name: "POL",
      symbol: "polygon",
      color: "#8247E5",
      logo: "/polygon.png", // Path relative to the public folder
      walletAddress: "TLRgHFbz3b9uDaMUNnpbWoGvQ66H2hW4L7",
    },
    {
      id: "ethereum",
      name: "ETH",
      symbol: "ERC20",
      color: "#627EEA",
      logo: "/ethereum.png", // Path relative to the public folder
      walletAddress: "TLRgHFbz3b9uDaMUNnpbWoGvQ66H2hW4L7",
    },
    {
      id: "binance",
      name: "BINANCE",
      symbol: "BEP20",
      color: "#F0B90B",
      logo: "/gold.webp", // Path relative to the public folder
      walletAddress: "TLRgHFbz3b9uDaMUNnpbWoGvQ66H2hW4L7",
    },
    {
      id: "xrpbinance",
      name: "XRP BINANCE",
      symbol: "BEP20",
      color: "#F0B90B",
      logo: "/bxrpnew.png", // Path relative to the public folder
      walletAddress: "TLRgHFbz3b9uDaMUNnpbWoGvQ66H2hW4L7",
    }
  ]

  const handleNetworkSelect = (network: NetworkOption) => {
    setSelectedNetwork(network)
  }

  const handleCopyAddress = () => {
    if (selectedNetwork) {
      navigator.clipboard.writeText(selectedNetwork.walletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // --- EmailJS Setup ---
  // IMPORTANT: Replace with your actual EmailJS credentials
  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
  // It's highly recommended to use environment variables for these ^

  const form = useRef<HTMLFormElement>(null); // Type the ref for the form element

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.current) {
      console.error("Form ref is not attached.");
      return;
    }
    if (!selectedNetwork) {
        console.error("No network selected.");
        // Optionally, show an error to the user
        return;
    }
    if (!SERVICE_ID || SERVICE_ID === 'YOUR_SERVICE_ID' ||
        !TEMPLATE_ID || TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
        !PUBLIC_KEY || PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        console.error("EmailJS credentials are not configured properly. Please check your .env file or constants.");
        // Optionally, show a user-friendly error message
        alert("Submission service is currently unavailable. Please try again later.");
        return;
    }


    console.log("Submitting form with data:", {
      network: selectedNetwork?.name,
      symbol: selectedNetwork?.symbol, // Added symbol for clarity in email
      transactionId,
      walletAddress,
      amount,
      email,
      recipientWallet: selectedNetwork?.walletAddress // Added recipient wallet for clarity
    })

    // Prepare template parameters matching your EmailJS template
    const templateParams = {
      selected_network_name: selectedNetwork?.name,
      selected_network_symbol: selectedNetwork?.symbol,
      transaction_id: transactionId,
      user_wallet_address: walletAddress,
      transfer_amount: amount,
      user_email: email,
      recipient_wallet_address: selectedNetwork?.walletAddress,
      transaction_time: new Date().toLocaleString(), // or use a custom format
    };
    

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY) // Use send instead of sendForm if you manually construct params
      .then(
        (result) => {
          console.log('SUCCESS!', result.status, result.text);
          alert('Submission successful! We will process your request.');
          setSelectedNetwork(null); 
          setTransactionId('');
          setWalletAddress('');
          setEmail('');
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert(`Submission failed: ${error.text}. Please try again.`);
        },
      );
  };

  const handleBack = () => {
    setSelectedNetwork(null)
  }


  const images = [
    "https://flasherr.in/user/img/brand/brand_img07.png",
    "https://flasherr.in/user/img/brand/brand_img04.png",
    "https://flasherr.in/user/img/brand/brand_img01.png",
    "https://flasherr.in/user/img/brand/brand_img02.png",
    "https://flasherr.in/user/img/brand/brand_img05.png",
    "https://flasherr.in/user/img/brand/brand_img03.png",
  ];


  const marqueeRef = useRef<HTMLDivElement>(null)


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#13001A] to-[#290040] text-white">
      <div className="container mx-auto px-4 py-32">
        {!selectedNetwork ? (
          // Network Selection View
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-purple-300 text-2xl mb-2">Choose Your</h2>
              <h1 className="text-white text-6xl font-bold mb-8">USDT Network</h1>

              {/* Display a generic USDT logo or remove if not needed */}
             
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Adjusted grid for better layout */}
              {networks.map((network) => (
                <div
                  key={network.id}
                  className="bg-[#1f1c2c] rounded-lg p-6 flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30" // Enhanced styling
                  onClick={() => handleNetworkSelect(network)}
                  style={{ borderColor: network.color, borderWidth: '1px', borderStyle: 'solid' }} // Use network color for border
                >
                  {/* Use Image component for network logo */}
                 <div className="w-20 h-20 mb-5 relative flex items-center justify-center">
   <Image
      src={network.logo}
      alt={`${network.name} Logo`}
      width={80} // Adjust size as needed
      height={80} // Adjust size as needed
      className="object-contain rounded-full" // Makes the image circular
   />
</div>

                  <div className="bg-white text-black font-semibold py-2 px-6 rounded-full w-full text-center text-sm"> {/* Adjusted padding/text size */}
                    {network.name} ({network.symbol})
                  </div>
                </div>
              ))}
            </div>

             {/* Partners Section - Consider adding CSS animation for marquee */}
             <div className="text-center mt-20">
              <h3 className="text-pink-300 mb-4 text-lg font-semibold">● OUR TOP PARTNERS ●</h3>
              {/* Simple static display or implement a marquee library */}
              <div className="flex flex-wrap justify-center items-center gap-8 mt-8">
                {images.map((image, index) => (
                  <div className="h-12 w-32 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity" key={index}>
                    <img src={image} alt={`Partner Logo ${index + 1}`} className="max-h-full max-w-full object-contain" />
                  </div>
                ))}
                 {/* Coinbase Logo SVG */}
                 <div className="h-12 w-32 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity">
                   <svg viewBox="0 0 1024 1024" className="w-full h-full" fill="#0052FF">
                     <path d="M512 0C229.12 0 0 229.12 0 512s229.12 512 512 512 512-229.12 512-512S794.88 0 512 0zm0 981.76C252.16 981.76 42.24 771.84 42.24 512S252.16 42.24 512 42.24 981.76 252.16 981.76 512 771.84 981.76 512 981.76z" />
                     <path d="M512 193.28c-175.36 0-318.72 143.36-318.72 318.72S336.64 830.72 512 830.72 830.72 687.36 830.72 512 687.36 193.28 512 193.28zm0 595.2c-152.32 0-276.48-124.16-276.48-276.48S359.68 235.52 512 235.52 788.48 359.68 788.48 512 664.32 788.48 512 788.48z" />
                   </svg>
                 </div>
              </div>
            </div>

          </div>
        ) : (
           // Form View
          <div className="max-w-lg mx-auto bg-[#1f1c2c] rounded-lg p-8 relative shadow-xl shadow-purple-500/20">
            <button
              onClick={handleBack}
              className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors text-sm flex items-center"
              aria-label="Go back to network selection"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <div className="flex flex-col items-center mb-6">
              {/* Use Image component for the selected network logo */}
              <div className="w-16 h-16 mb-3 relative">
                <Image
                  src={selectedNetwork.logo}
                  alt={`${selectedNetwork.name} Logo`}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-1">{selectedNetwork.name} ({selectedNetwork.symbol})</h2>
              <p className="text-gray-300 text-center text-sm px-4">
                To receive 200 Flash USDT, please transfer exactly <strong className="text-white font-bold">{amount} USDT</strong> ({selectedNetwork.symbol}) to the address below.
              </p>
            </div>


             {/* IMPORTANT: Add hidden inputs for EmailJS if needed */}
            <form onSubmit={handleSubmit} className="space-y-5" ref={form}>
                {/* Add hidden inputs if your template relies on them and you are using sendForm */}
                {/* <input type="hidden" name="selected_network_name" value={selectedNetwork.name} /> */}
                {/* <input type="hidden" name="selected_network_symbol" value={selectedNetwork.symbol} /> */}
                {/* <input type="hidden" name="recipient_wallet_address" value={selectedNetwork.walletAddress} /> */}
                {/* <input type="hidden" name="transfer_amount" value={amount} /> */}

              <div>
                <label htmlFor="recipientAddress" className="block text-sm font-medium text-gray-300 mb-1">Our Wallet Address ({selectedNetwork.symbol})</label>
                <div className="flex">
                  <input
                    id="recipientAddress"
                    type="text"
                    value={selectedNetwork.walletAddress}
                    readOnly
                    className="flex-grow bg-gray-700 border border-gray-600 text-gray-200 py-2.5 px-3 rounded-l-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500" // Improved styling
                    aria-label="Recipient Wallet Address"
                  />
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="bg-purple-600 hover:bg-purple-700 text-white py-2.5 px-4 rounded-r-md font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800" // Improved styling
                    aria-live="polite" // Announce changes for screen readers
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                 <p className="text-xs text-yellow-400 mt-1">⚠️ Ensure you select the correct network ({selectedNetwork.symbol}) before sending.</p>
              </div>

              <div>
                <label htmlFor="transactionId" className="block text-sm font-medium text-gray-300 mb-1">Your Transaction ID / Hash</label>
                <input
                  id="transactionId"
                  type="text"
                  name="transaction_id" // Name should match EmailJS template variable if using sendForm
                  placeholder="Paste the Transaction ID here"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  required // Make required
                  className="w-full bg-gray-700 border border-gray-600 text-gray-200 py-2.5 px-3 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400" // Improved styling
                />
              </div>

              <div>
                <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-300 mb-1">Your Wallet Address (to receive Flash USDT)</label>
                <input
                  id="walletAddress"
                  type="text"
                  name="user_wallet_address" // Name should match EmailJS template variable if using sendForm
                  placeholder={`Enter your ${selectedNetwork.symbol} wallet address`}
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  required // Make required
                  className="w-full bg-gray-700 border border-gray-600 text-gray-200 py-2.5 px-3 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400" // Improved styling
                />
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">Transfer Amount (USDT)</label>
                <input
                  id="amount"
                  type="text" // Keep as text if you need exactly "20.00", otherwise use type="number" with step="0.01"
                  name="transfer_amount" // Make sure this matches template variable if using sendForm
                  value={amount}
                  readOnly // Make it read-only as per the instruction text
                  className="w-full bg-gray-800 border border-gray-600 text-gray-400 py-2.5 px-3 rounded-md text-sm focus:outline-none" // Read-only styling
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Your Email (for confirmation)</label>
                <input
                  id="email"
                  type="email"
                  name="user_email" // Name should match EmailJS template variable if using sendForm
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required // Make required
                  className="w-full bg-gray-700 border border-gray-600 text-gray-200 py-2.5 px-3 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400" // Improved styling
                />
              </div>

              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-10 rounded-full font-semibold flex items-center justify-center transition-all duration-300 ease-in-out shadow-lg hover:shadow-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800" // Enhanced button styling
                >
                  Submit Transfer Details
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" // Changed to a right arrow
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      {/* Simple CSS Marquee for Partners (add this CSS to your global styles or a <style jsx>) */}
      <style jsx global>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          box-sizing: border-box;
        }

        .marquee {
          display: inline-block;
          padding-left: 100%;
          animation: marquee 25s linear infinite; // Adjust duration as needed
        }

        .marquee-item {
          display: inline-block;
          margin-right: 40px; // Space between items
          vertical-align: middle; // Align items nicely
        }

         .marquee:hover {
           animation-play-state: paused // Optional: pause on hover
         }


        @keyframes marquee {
          0%   { transform: translate(0, 0); }
          100% { transform: translate(-100%, 0); }
        }

        // Optional: duplicate content for seamless loop without JS
        // .marquee::after {
        //   content: attr(data-content); // Requires setting data-content attribute on the marquee div
        //   display: inline-block;
        //   padding-left: 40px; // Match margin-right
        // }
      `}</style>
    </div>
  )
}
