"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Wallet, Menu, X } from "lucide-react"
import logo from "./logo.png" // Ensure this path is correct relative to your component

// Placeholder CSS for wallet flip animation and other styles
// Add these styles to your global CSS file (e.g., globals.css)
/*
.nav-link {
  @apply text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 whitespace-nowrap;
  // On mobile, ensure links wrap if needed, consider removing whitespace-nowrap specifically for mobile if causing issues
}
.nav-link.block { // Style for mobile links
  @apply block rounded-md py-2 text-base break-words; // Allow word breaking
}

.btn-hover-effect {
  @apply transition-transform duration-200 hover:scale-105;
}

// Wallet Flip Animation CSS
.wallet-container {
  perspective: 1000px; // Needed for 3D flip effect
}
.wallet {
  width: 300px; // Adjust size as needed
  height: 180px; // Adjust size as needed
  position: relative;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  cursor: pointer;
}
.wallet-front, .wallet-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; // Hides the back side when facing away
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
}
.wallet-front {
  background: linear-gradient(135deg, #6d28d9, #4f46e5); // Example gradient
  color: white;
  justify-content: space-between; // Pushes content to top and bottom
}
.wallet-back {
  background: linear-gradient(135deg, #4f46e5, #6d28d9); // Example gradient
  color: white;
  transform: rotateY(180deg); // Starts flipped over
  align-items: center;
  justify-content: center;
}
.wallet.flipped {
  transform: rotateY(180deg); // Flips the whole card
}
// Content inside the wallet card
.wallet-chip {
  width: 40px;
  height: 30px;
  background: #d1d5db; // Example chip color
  border-radius: 4px;
}
.wallet-qr {
  width: 80px;
  height: 80px;
  background: white; // Placeholder for QR code image/SVG
  padding: 5px; // Optional padding around QR
  border-radius: 4px;
}
.wallet-number { font-size: 1.1rem; letter-spacing: 2px; margin-top: 1rem; font-family: monospace; }
.wallet-name { font-size: 0.9rem; }
.wallet-balance { font-size: 1rem; font-weight: bold; }
*/

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [walletFlipped, setWalletFlipped] = useState(false)

  // Effect to handle scroll detection for changing navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Effect to close mobile menu automatically if window resizes to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // 1024px is the default 'lg' breakpoint in Tailwind
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle mobile menu state
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  // Close mobile menu (used by links/buttons inside menu)
  const closeMobileMenu = () => {
     setMobileMenuOpen(false);
  }

  // Toggle wallet flip state
  const handleWalletToggle = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // Prevent event bubbling if needed
    setWalletFlipped(!walletFlipped);
    // Close mobile menu if opening the wallet
    if (!walletFlipped) {
        closeMobileMenu();
    }
  }

  // Close wallet when clicking the background overlay
  const handleWalletOverlayClick = () => {
      setWalletFlipped(false);
  }

  return (
    <>
      {/* Header: Fixed position, controls background/padding based on scroll/mobile menu state */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          // Relative positioning context for the absolute mobile menu panel
          "relative",
          // Background and shadow appear if scrolled OR mobile menu is open
          scrolled || mobileMenuOpen ? "bg-white dark:bg-gray-950 shadow-md" : "bg-transparent dark:bg-transparent",
          // Padding changes only based on scroll state
          scrolled ? "py-2" : "py-4"
        )}
      >
        {/* Container: Constrains content width and adds padding */}
        <div className="container w-full mx-auto px-4 sm:px-6 lg:px-8">
            {/* Flex Wrapper: Aligns Logo, Nav, and Buttons horizontally */}
            <div className="relative flex h-16 items-center  w-full justify-between">

              {/* ===== Left Side: Logo ===== */}
              <div className="flex flex-shrink-0 items-center">
                <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
                  {/* Use next/image for optimized images */}
                  <Image src={logo} alt="Fast Flasher logo" width={40} height={40} className="h-5 w-auto block rounded-full opacity-95 "/>
                  {/* Brand name hidden on very small screens */}
                  <span className="text-xl font-bold text-white  sm:inline">Fast Flasher</span>
                </Link>
              </div>

              {/* ===== Center: Desktop Navigation (Hidden below lg breakpoint) ===== */}
              <div className="hidden lg:block sm:ml-6 justify-evenly">
                 <nav className="flex space-x-5"> {/* Adjust space-x-* as needed */}
                    <Link href="#how-it-works" className="nav-link">How it works</Link>
                    <Link href="#features" className="nav-link">Features</Link>
                    <Link href="#partners" className="nav-link">Partners</Link>
                    <Link href="/usdt" className="nav-link">USDT</Link>
                    <Link href="/resale" className="nav-link">Resale</Link>
                    <Link href="/operator" className="nav-link">Operator</Link>
                    {/* <Link href="/converter" className="nav-link">Converter</Link> */}
                    {/* <Link href="#roadmap" className="nav-link">Roadmap</Link> */}
                 </nav>
              </div>


             {/* ===== Right Side: Desktop Buttons (Hidden below lg) & Mobile Menu Button ===== */}
              <div className="flex items-center">
                 {/* --- Desktop Action Buttons (Hidden below lg breakpoint) --- */}
              

                 {/* --- Mobile Menu Button (Only visible below lg breakpoint) --- */}
                <div className="flex items-center lg:hidden ml-2">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        aria-controls="mobile-menu"
                        aria-expanded={mobileMenuOpen}
                        onClick={handleMobileMenuToggle}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
                        {mobileMenuOpen ? (
                            <X className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                            <Menu className="block h-6 w-6" aria-hidden="true" />
                        )}
                    </button>
                </div>
              </div>

            </div>
        </div>

        {/* Mobile Menu Panel: Absolutely positioned below header, controlled by mobileMenuOpen state */}
        <div
            id="mobile-menu"
            className={cn(
                "lg:hidden", // Hidden on large screens and up
                // Positioning relative to the header
                "absolute top-full left-0 w-full max-w-full", // Takes full width below header
                // Animation classes
                "transition-all duration-300 ease-in-out transform origin-top", // Smooth transition, scales from top
                mobileMenuOpen ? "max-h-[80vh] opacity-100 scale-y-100" : "max-h-0 opacity-0 scale-y-95", // Animate height, opacity, scale
                // Styling and overflow control
                "bg-white dark:bg-gray-950 shadow-lg border-t border-gray-200 dark:border-gray-800",
                "overflow-y-auto overflow-x-hidden" // Allow vertical scroll if needed, prevent horizontal scroll
            )}
            // Optional: Set a dynamic max-height based on viewport if needed,
            // but max-h-[80vh] in className is often sufficient.
            // style={{ maxHeight: mobileMenuOpen ? 'calc(100vh - 4rem)' : '0' }} // Example using style prop
        >
             {/* Inner container for padding */}
             <div className="px-4 pt-2 pb-4">
                 {/* Mobile navigation links */}
                 <div className="space-y-1">
                    <Link href="#how-it-works" className="nav-link block" onClick={closeMobileMenu}>How it works</Link>
                    <Link href="#features" className="nav-link block" onClick={closeMobileMenu}>Features</Link>
                    <Link href="#partners" className="nav-link block" onClick={closeMobileMenu}>Partners</Link>
                    <Link href="/usdt" className="nav-link block" onClick={closeMobileMenu}>USDT</Link>
                    <Link href="/resale" className="nav-link block" onClick={closeMobileMenu}>Resale</Link>
                    <Link href="/operator" className="nav-link block" onClick={closeMobileMenu}>Operator</Link>
                    {/* <Link href="/converter" className="nav-link block" onClick={closeMobileMenu}>Converter</Link> */}
                    {/* <Link href="#roadmap" className="nav-link block" onClick={closeMobileMenu}>Roadmap</Link> */}
                 </div>

                {/* Buttons section in mobile menu */}
                
            </div>
        </div>
      </header>

      {/* Wallet Flip Animation Overlay: Shows when walletFlipped is true */}
      {walletFlipped && (
        <div
          // Full screen overlay with backdrop
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" // Higher z-index than header
          onClick={handleWalletOverlayClick} // Click outside the card closes it
        >
          {/* Container prevents click propagation */}
          <div className="wallet-container" onClick={(e) => e.stopPropagation()}>
            {/* The actual flipping card */}
            <div className={cn("wallet", walletFlipped ? "flipped" : "")}>
              {/* Front Side of Wallet */}
              <div className="wallet-front">
                <div className="flex justify-between items-start">
                  <div className="wallet-chip"></div>
                  <div className="text-xs text-white opacity-70">Fast Flasher</div>
                </div>
                <div className="wallet-number">0x8F3...7A2E</div> {/* Example Address */}
                <div className="flex justify-between items-end">
                  <div className="wallet-name">Blockchain Wallet</div>
                  <div className="wallet-balance">3.42 ETH</div> {/* Example Balance */}
                </div>
              </div>
              {/* Back Side of Wallet */}
              <div className="wallet-back">
                 <div className="flex flex-col items-center justify-center h-full">
                  {/* Placeholder for QR Code */}
                  <div className="wallet-qr mb-4"></div>
                  <div className="text-white text-sm">Scan to send crypto</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}