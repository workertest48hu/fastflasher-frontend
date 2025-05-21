"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react" // Added useEffect for copied modal timeout
import * as emailjs from "@emailjs/browser"
import Image from 'next/image';
import PageWrapper from "@/components/page-wrappper";
import { ToastContainer, toast } from 'react-toastify'; // Still used for submission status (info/error)
import 'react-toastify/dist/ReactToastify.css';

interface NetworkOption {
  id: string
  name: string
  symbol: string
  color: string
  logo: string
  walletAddress: string
}

export default function USDTPage() {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkOption | null>(null)
  const [transactionId, setTransactionId] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [email, setEmail] = useState("")
  const [showAmountInputStep, setShowAmountInputStep] = useState(false);
  const [showCopiedModal, setShowCopiedModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const networks: NetworkOption[] = [
    {
      id: "USDT (TRC20)",
      name: "USDT",
      symbol: "TRC20",
      color: "#26A17B",
      logo: "/tronnew.png",
      walletAddress: "TQksgLY6Lzcyaa5TwEdVzHtW3KPitZaEv8",
    },
    {
      id: "polygon",
      name: "POL",
      symbol: "polygon",
      color: "#8247E5",
      logo: "/polygon.png",
      walletAddress: "0x342B92813f805c2055bbAAC77c451b60a366254f",
    },
    {
      id: "ethereum",
      name: "ETH",
      symbol: "ERC20",
      color: "#627EEA",
      logo: "/ethereum.png",
      walletAddress: "0x342B92813f805c2055bbAAC77c451b60a366254f",
    },
    {
      id: "binance",
      name: "BINANCE",
      symbol: "BEP20",
      color: "#F0B90B",
      logo: "/gold.webp",
      walletAddress: "0x342B92813f805c2055bbAAC77c451b60a366254f",
    },
    {
      id: "xrpbinance",
      name: "XRP BINANCE",
      symbol: "BEP20",
      color: "#F0B90B",
      logo: "/bxrpnew.png",
      walletAddress: "r3XzrWaRQvQ82Q8mnDao8WCuKLQWipdsnq",
    }
  ];

  const handleNetworkSelect = (network: NetworkOption) => {
    setSelectedNetwork(network);
    setAmount("");
    setShowAmountInputStep(true);
  };

  const handleAmountProceed = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount < 500) {
      alert("Amount must be 500 USDT or more to proceed."); // Use alert
      return;
    }
    setAmount(numericAmount.toFixed(2));
    setShowAmountInputStep(false);
  };

  const handleBackToNetworkSelection = () => {
    setSelectedNetwork(null);
    setShowAmountInputStep(false);
    setAmount("");
  };

  const handleCopyAddress = () => {
    if (selectedNetwork) {
      navigator.clipboard.writeText(selectedNetwork.walletAddress);
      setShowCopiedModal(true);
    }
  };

  // Auto-hide copied modal
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showCopiedModal) {
      timer = setTimeout(() => {
        setShowCopiedModal(false);
      }, 1000); // Modal visible for 2.5 seconds
    }
    return () => clearTimeout(timer);
  }, [showCopiedModal]);


  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) {
      toast.error("An error occurred. Please try again.");
      return;
    }
    if (!selectedNetwork) {
      toast.error("Please select a network first."); // Or alert, but toast is fine for this
      return;
    }
    if (!SERVICE_ID || SERVICE_ID === 'YOUR_SERVICE_ID' ||
      !TEMPLATE_ID || TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
      !PUBLIC_KEY || PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      toast.error("Submission service is currently unavailable. Please try again later.");
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount < 500) {
      alert("Amount must be at least 500 USDT."); // Use alert
      return;
    }

    const templateParams = {
      selected_network_name: selectedNetwork?.name,
      selected_network_symbol: selectedNetwork?.symbol,
      transaction_id: transactionId,
      user_wallet_address: walletAddress,
      transfer_amount: numericAmount.toFixed(2),
      user_email: email,
      recipient_wallet_address: selectedNetwork?.walletAddress,
      transaction_time: new Date().toLocaleString(),
      type:"BUY"
    };

    toast.info("Submitting your details...", { autoClose: 2000 });

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(
        (result) => {
          console.log('SUCCESS!', result.status, result.text);
    setShowSuccessModal(true); // Show custom success modal
    // Refresh form fields, but keep user on the current network form
    setTransactionId('');
    setWalletAddress('');
    setEmail('');
    setAmount('');
    // Amount remains as is
    if (form.current) form.current.reset(); // This might be redundant with controlled inputs
      },
      (error) => {
        console.log('FAILED...', error.text);
        toast.error(`Submission failed: ${error.text}. Please try again.`);
      }
    );
  };

  const handleBackFromMainForm = () => {
    setSelectedNetwork(null);
    setShowAmountInputStep(false);
    setAmount("");
    setTransactionId('');
    setWalletAddress('');
    setEmail('');
  };

  const images = [
    "https://flasherr.in/user/img/brand/brand_img07.png",
    "https://flasherr.in/user/img/brand/brand_img04.png",
    "https://flasherr.in/user/img/brand/brand_img01.png",
    "https://flasherr.in/user/img/brand/brand_img02.png",
    "https://flasherr.in/user/img/brand/brand_img05.png",
    "https://flasherr.in/user/img/brand/brand_img03.png",
  ];

  return (
    <PageWrapper>
      <div className="min-h-screen relative text-white">
        <div className="container mx-auto px-4 py-12">
          {/* ToastContainer still needed for submission info/error toasts */}
          <ToastContainer position="top-center" theme="dark" autoClose={4000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

          {!selectedNetwork ? (
            // View 1: Network Selection
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-purple-300 text-2xl mb-2">Choose Your</h2>
                <h1 className="text-white text-6xl font-bold mb-8">USDT Network</h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {networks.map((network) => (
                  <div
                    key={network.id}
                    className="bg-[#1f1c2c] rounded-lg p-6 flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
                    onClick={() => handleNetworkSelect(network)}
                    style={{ borderColor: network.color, borderWidth: '1px', borderStyle: 'solid' }}
                  >
                    <div className="w-20 h-20 mb-5 relative flex items-center justify-center">
                      <Image
                        src={network.logo}
                        alt={`${network.name} Logo`}
                        width={80}
                        height={80}
                        className="object-contain rounded-full"
                      />
                    </div>
                    <div className="bg-white text-black font-semibold py-2 px-6 rounded-full w-full text-center text-sm">
                      {network.name} ({network.symbol})
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-20">
                <h3 className="text-pink-300 mb-4 text-lg font-semibold">● OUR TOP PARTNERS ●</h3>
                <div className="flex flex-wrap justify-center items-center gap-8 mt-8">
                  {images.map((image, index) => (
                    <div className="h-12 w-32 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity" key={index}>
                      <img src={image} alt={`Partner Logo ${index + 1}`} className="max-h-full max-w-full object-contain" />
                    </div>
                  ))}
                  <div className="h-12 w-32 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity">
                    <svg viewBox="0 0 1024 1024" className="w-full h-full" fill="#0052FF">
                      <path d="M512 0C229.12 0 0 229.12 0 512s229.12 512 512 512 512-229.12 512-512S794.88 0 512 0zm0 981.76C252.16 981.76 42.24 771.84 42.24 512S252.16 42.24 512 42.24 981.76 252.16 981.76 512 771.84 981.76 512 981.76z" />
                      <path d="M512 193.28c-175.36 0-318.72 143.36-318.72 318.72S336.64 830.72 512 830.72 830.72 687.36 830.72 512 687.36 193.28 512 193.28zm0 595.2c-152.32 0-276.48-124.16-276.48-276.48S359.68 235.52 512 235.52 788.48 359.68 788.48 512 664.32 788.48 512 788.48z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ) : selectedNetwork && showAmountInputStep ? (
            // View 2: Amount Input Step
            <div className="max-w-md mx-auto bg-[#1f1c2c] rounded-lg p-8 relative shadow-xl shadow-purple-500/20 animate-fade-in">
              <button
                onClick={handleBackToNetworkSelection}
                className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                aria-label="Go back to network selection"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 mb-3 relative">
                  <Image
                    src={selectedNetwork.logo}
                    alt={`${selectedNetwork.name} Logo`}
                    width={64}
                    height={64}
                    className="object-contain rounded-full"
                  />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-1">{selectedNetwork.name} ({selectedNetwork.symbol})</h2>
                <p className="text-gray-300 text-center text-sm px-4 mb-4">
                  Enter the amount of USDT you wish to process.
                </p>
              </div>
              <div className="space-y-5">
                <div className="flex items-center justify-center text-slate-400">1 USDT = 10 FLASH USDT  </div>
                <div>

                  <label htmlFor="intermediateAmount" className="block text-sm font-medium text-gray-300 mb-1">How many Flash USDT you want ?</label>
                  <input
                    id="intermediateAmount"
                    type="number"
                    placeholder="Enter amount (e.g., 500)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                    step="0.01"
                    className="w-full bg-gray-700 border border-gray-600 text-gray-200 py-2.5 px-3 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400"
                  />
                  <p className="text-xs text-yellow-400 mt-1">Minimum 500 USDT required.</p>
                </div>
                <div className="flex justify-center pt-2">
                  <button
                    onClick={handleAmountProceed}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-10 rounded-full font-semibold flex items-center justify-center transition-all duration-300 ease-in-out shadow-lg hover:shadow-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    Proceed
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ) : selectedNetwork && !showAmountInputStep ? (
            // View 3: Main Form
            <div className="animate-fade-in top-0 mt-0">
             

              <div className="max-w-lg mx-auto bg-[#1f1c2c] rounded-lg p-8 relative shadow-xl shadow-purple-500/20">
                <button
                  onClick={handleBackFromMainForm}
                  className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                  aria-label="Go back to network selection"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Networks
                </button>

                <div className="flex flex-col items-center mb-6">
                  <div className="w-16 h-16 mb-3 relative">
                    <Image
                      src={selectedNetwork.logo}
                      alt={`${selectedNetwork.name} Logo`}
                      width={64}
                      height={64}
                      className="object-contain rounded-full"
                    />
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-1">{selectedNetwork.name} ({selectedNetwork.symbol})</h2>
                   <p className="text-gray-300 text-center text-sm px-4">
                    For every 500 Flash USDT transfer 50 USDT to our wallet address 
                  </p>
                 
                </div>

                <form onSubmit={handleSubmit} className="space-y-5" ref={form}>
                  <div>
                    <label htmlFor="recipientAddress" className="block text-sm font-medium text-gray-300 mb-1">Our Wallet Address ({selectedNetwork.symbol})</label>
                    <div className="flex">
                      <input
                        id="recipientAddress"
                        type="text"
                        value={selectedNetwork.walletAddress}
                        readOnly
                        className="flex-grow bg-gray-700 border border-gray-600 text-gray-200 py-2.5 px-3 rounded-l-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                        aria-label="Recipient Wallet Address"
                      />
                      <button
                        type="button"
                        onClick={handleCopyAddress}
                        className="bg-purple-600 hover:bg-purple-700 text-white py-2.5 px-4 rounded-r-md font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="text-xs text-yellow-400 mt-1">⚠️ Ensure you select the correct network ({selectedNetwork.symbol}) before sending.</p>
                  </div>

                  <div>
                    <label htmlFor="transactionId" className="block text-sm font-medium text-gray-300 mb-1">Your Transaction ID / Hash</label>
                    <input
                      id="transactionId"
                      type="text"
                      name="transaction_id"
                      placeholder="Paste the Transaction ID here"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      required
                      className="w-full bg-gray-700 border border-gray-600 text-gray-200 py-2.5 px-3 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-300 mb-1">Your Wallet Address (to receive Flash USDT)</label>
                    <input
                      id="walletAddress"
                      type="text"
                      name="user_wallet_address"
                      placeholder={`Enter your ${selectedNetwork.symbol} wallet address`}
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      required
                      className="w-full bg-gray-700 border border-gray-600 text-gray-200 py-2.5 px-3 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="amountEditable" className="block text-sm font-medium text-gray-300 mb-1">Transfer Amount (USDT)</label>
                    <input
                      id="amountEditable"
                      type="number"
                      name="transfer_amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="200"
                      step="0.01"
                      required
                      className="w-full bg-gray-700 border border-gray-600 text-gray-200 py-2.5 px-3 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400"
                    />
                    <p className="text-xs text-yellow-400 mt-1">Minimum 500 USDT. You can adjust if needed.</p>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Your Email (for confirmation)</label>
                    <input
                      id="email"
                      type="email"
                      name="user_email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-gray-700 border border-gray-600 text-gray-200 py-2.5 px-3 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400"
                    />
                  </div>

                  <div className="flex justify-center pt-2">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-10 rounded-full font-semibold flex items-center justify-center transition-all duration-300 ease-in-out shadow-lg hover:shadow-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      Submit Transfer Details
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : null}
        </div>

        {/* Copied Address Modal */}
        {showCopiedModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-transparent bg-opacity-50 transition-opacity duration-10 ease-in-out">
            <div className="bg-white text-gray-800 p-6 rounded-lg shadow-xl flex items-center space-x-3 animate-fade-in">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span className="text-lg font-semibold">Address Copied!</span>
            </div>
          </div>
        )}

        {/* Submission Success Modal */}
        {showSuccessModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-75 px-4 transition-opacity duration-300 ease-in-out"
            onClick={() => setShowSuccessModal(false)} // Click outside to close
          >
            <div
              className="bg-[#1b263b] text-white rounded-2xl p-8 shadow-lg max-w-md w-full animate-fade-in"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <h2 className="text-2xl font-semibold text-center">
                  Submission Successful!
                </h2>
                <div className="text-center text-sm text-gray-300 leading-relaxed">
                  Thank you for buying Flash USDT for Flasher!
                  <br /><br />
                  Your Flash USDT transfer will be completed to your provided wallet within 15 minutes.
                  <br /><br />
                  We will update you via your provided email in case of any issues. If any errors occur,
                  we'll contact you through your given email.
                  <br /><br />
                  Thank you for choosing Flasher!
                </div>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="mt-6 bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-full font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <style jsx global>{`
        .glow-text {
  position: relative;
  display: inline-block;
  background: linear-gradient(90deg, #ffffff 20%, #00f0ff 40%, #ffffff 60%);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: shimmer 4s ease-in-out infinite;
  text-shadow: 0 0 4px rgba(0, 240, 255, 0.3);
}

@keyframes shimmer {
  0% {
    background-position: 200% center;
  }
  50% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
}

          @keyframes fade-in {
            0% {
              opacity: 0;
              transform: scale(0.95) translateY(10px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
          .marquee-container {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            box-sizing: border-box;
          }
          .marquee {
            display: inline-block;
            padding-left: 100%;
            animation: marquee 25s linear infinite;
          }
          .marquee-item {
            display: inline-block;
            margin-right: 40px;
            vertical-align: middle;
          }
          .marquee:hover {
            animation-play-state: paused;
          }
          @keyframes marquee {
            0%   { transform: translate(0, 0); }
            100% { transform: translate(-100%, 0); }
          }
        `}</style>
      </div>
    </PageWrapper>
  );
}