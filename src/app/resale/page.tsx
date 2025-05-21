"use client"

import type React from "react" // Added type import
import { useEffect, useState, useRef } from "react" // Added useRef
import { Button } from "@/components/ui/button" // Assuming this is used, though not in the provided snippet directly
import { initAnimations } from "@/lib/animation" // Assuming this lib exists
import PageWrapper from "@/components/page-wrappper"
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify'; // For submission status
import 'react-toastify/dist/ReactToastify.css';
import * as emailjs from "@emailjs/browser"; // For sending email

// Define a fixed network for this ResalePage
// You can customize this as needed for the specific resale context
const fixedNetwork = {
  id: "USDT (TRC20) Resale",
  name: "USDT (TRC20)", // Name for the resale context
  symbol: "TRC20",
  color: "#26A17B", // Tron's color
  logo: "/tronnew.png", // Tron logo
  walletAddress: "TQksgLY6Lzcyaa5TwEdVzHtW3KPitZaEv8", // Your TRC20 wallet address
};

export default function ResalePage() {
  useEffect(() => {
    // initAnimations(); // Assuming this function exists and is needed
  }, []);

  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState(""); // User's wallet to receive Flash USDT
  const [email, setEmail] = useState(""); // User's email
  const [showAmountInputStep, setShowAmountInputStep] = useState(true); // Start with amount input
  const [showCopiedModal, setShowCopiedModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const form = useRef<HTMLFormElement>(null);

  // EmailJS Configuration (replace with your actual IDs or ensure .env variables are set)
  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID2 || 'YOUR_TEMPLATE_ID';
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

  const handleAmountProceed = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount < 10000) {
      alert("Amount must be 10,000 USDT or more to proceed.");
      return;
    }
    setAmount(numericAmount.toFixed(2));
    setShowAmountInputStep(false); // Move to the main form
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fixedNetwork.walletAddress);
    setShowCopiedModal(true);
  };

  // Auto-hide copied modal
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showCopiedModal) {
      timer = setTimeout(() => {
        setShowCopiedModal(false);
      }, 1000); // Modal visible for 1.5 seconds
    }
    return () => clearTimeout(timer);
  }, [showCopiedModal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) {
      toast.error("An error occurred. Please try again.");
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
      alert("Amount must be at least 500 USDT.");
      return;
    }

    const templateParams = {
      user_wallet_address: walletAddress,
      transfer_amount: numericAmount.toFixed(3),
      user_email: email,
      transaction_time: new Date().toLocaleString(),
    };

    toast.info("Submitting your details...", { autoClose: 2000 });

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(
        (result) => {
          console.log('SUCCESS!', result.status, result.text);
          setShowSuccessModal(true);
          // Reset form fields for this submission
          setWalletAddress('');
          setEmail('');
          // Amount could be reset or kept, depending on desired UX.
          // For now, we keep 'amount' as is, but typically it's entered once per submission flow.
          // If you want to reset amount to allow a new amount entry for the same session:
          // setAmount('');
          // setShowAmountInputStep(true); // Optionally go back to amount step
        },
        (error) => {
          console.log('FAILED...', error.text);
          toast.error(`Submission failed: ${error.text}. Please try again.`);
        }
      );
  };

  const handleBackToAmountInput = () => {
    setShowAmountInputStep(true);
    // Optionally clear form fields if going back means starting over
    // setTransactionId('');
    // setWalletAddress('');
    // setEmail('');
  };

  return (
    <PageWrapper>
      <div className="min-h-screen relative text-white"> {/* Added similar wrapper as USDTPage */}
        <div className="container mx-auto px-4 py-12">
          <ToastContainer position="top-center" theme="dark" autoClose={4000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

          <div className="flex items-center w-full justify-center mb-5 text-6xl md:text-7xl lg:text-8xl font-extrabold text-white relative">
            <span className="glow-text">RESALE</span>
          </div>

          {showAmountInputStep ? (
            // View 1: Amount Input Step for the fixed network
            <div className="max-w-md mx-auto bg-[#1f1c2c] rounded-lg p-8 relative shadow-xl shadow-purple-500/20 animate-fade-in">
              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 mb-3 relative">
                  <Image
                    src={fixedNetwork.logo} // Use fixed network logo
                    alt={`${fixedNetwork.name} Logo`}
                    width={64}
                    height={64}
                    className="object-contain rounded-full"
                  />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-1">{fixedNetwork.name} Flash USDT</h2>
                <p className="text-gray-300 text-center text-sm px-4 mb-4">
                  Enter the amount of USDT you wish to process.
                </p>
              </div>
              <div className="space-y-5">
                <div className="flex items-center justify-center text-slate-400">1 USDT = 5 FLASH USDT</div>
                <div>
                  <label htmlFor="intermediateAmount" className="block text-sm font-medium text-gray-300 mb-1">How many Flash USDT do you sale?</label>
                  <input
                    id="intermediateAmount"
                    type="number"
                    placeholder="Enter amount (e.g., 10,000)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="500" // Minimum should match validation
                    step="0.01"
                    className="w-full bg-gray-700 border border-gray-600 text-gray-200 py-2.5 px-3 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400"
                  />
                  <p className="text-xs text-yellow-400 mt-1">Minimum 10,000 USDT required.</p>
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
          ) : (
            // View 2: Main Form for the fixed network
            <div className="animate-fade-in top-0 mt-0">
              <div className="max-w-lg mx-auto bg-[#1f1c2c] rounded-lg p-8 relative shadow-xl shadow-purple-500/20">
                <button
                  onClick={handleBackToAmountInput} // Go back to amount input step
                  className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                  aria-label="Go back to amount input"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>

                <div className="flex flex-col items-center mb-6">
                  <div className="w-16 h-16 mb-3 relative">
                    <Image
                      src={fixedNetwork.logo} // Use fixed network logo
                      alt={`${fixedNetwork.name} Logo`}
                      width={64}
                      height={64}
                      className="object-contain rounded-full"
                    />
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-1">{fixedNetwork.name} ({fixedNetwork.symbol})</h2>

                </div>

                <form onSubmit={handleSubmit} className="space-y-5" ref={form}>
                  <div>
                    <label htmlFor="recipientAddress" className="block text-sm font-medium text-gray-300 mb-1">Our Wallet Address ({fixedNetwork.symbol})</label>
                    <div className="flex">
                      <input
                        id="recipientAddress"
                        type="text"
                        value={fixedNetwork.walletAddress}
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
                    <p className="text-xs text-yellow-400 mt-1">⚠️ Ensure you select the correct network ({fixedNetwork.symbol}) before sending.</p>
                  </div>



                  <div>
                    <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-300 mb-1">Your Wallet Address (TO RECIEVE REAL USDT)</label>
                    <input
                      id="walletAddress"
                      type="text"
                      name="user_wallet_address"
                      placeholder={`Enter your ${fixedNetwork.symbol} wallet address`}
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
                      value={amount} // This is the amount confirmed in the previous step
                      readOnly // Make it read-only if it's confirmed, or allow editing if needed
                      // onChange={(e) => setAmount(e.target.value)} // Uncomment if you want it editable here
                      min="500"
                      step="0.01"
                      required
                      className="w-full bg-gray-700 border border-gray-600 text-gray-200 py-2.5 px-3 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400"
                    />
                    {/* If amount is editable here, add the min USDT text again */}
                    {/* <p className="text-xs text-yellow-400 mt-1">Minimum 500 USDT. You can adjust if needed.</p> */}
                    <p className="text-xs text-gray-400 mt-1">Amount confirmed: {amount} USDT.</p>
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
          )}

          {/* Copied Address Modal */}
          {showCopiedModal && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-transparent bg-opacity-50 transition-opacity duration-300 ease-in-out">
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
              onClick={() => setShowSuccessModal(false)}
            >
              <div
                className="bg-[#1b263b] text-white rounded-2xl p-8 shadow-lg max-w-md w-full animate-fade-in"
                onClick={(e) => e.stopPropagation()}
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
                    onClick={() => {
                      setShowSuccessModal(false);
                      setShowAmountInputStep(true); // Go back to amount input for a new transaction
                      setAmount(''); // Clear amount for next transaction
                    }}
                    className="mt-6 bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-full font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
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
        `}</style>
      </div>
    </PageWrapper>
  );
}