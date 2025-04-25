"use client"

import type React from "react"
import { useEffect, useRef } from "react"
// Assuming useTheme is still needed for other potential theme-related logic
// If not, you can remove it.
// import { useTheme } from "@/context/theme-context"
import { initScrollAnimations } from "@/lib/scroll-animation"

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
}

const LOGO_URL = "https://fastflasher.com/tronnew.png"; // Define logo URL
const NUM_LOGO_CIRCLES = 10; // How many floating logos

export default function PageWrapper({ children, className = "" }: PageWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  // const { theme } = useTheme(); // Keep if needed elsewhere

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const createdElements: HTMLElement[] = []; // To store refs for cleanup

    // --- Keep Circuit Pattern Creation ---
    const circuit = document.createElement("div")
    circuit.className = "circuit-pattern"
    wrapper.appendChild(circuit)
    createdElements.push(circuit)

    // --- Keep Particles Creation ---
    const particlesContainer = document.createElement("div")
    particlesContainer.className = "particles"
    wrapper.appendChild(particlesContainer)
    createdElements.push(particlesContainer) // Store container for potential removal if needed

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      const size = Math.random() * 3 + 1
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.opacity = `${Math.random() * 0.5 + 0.3}`
      particle.style.animation = `floating ${Math.random() * 10 + 5}s linear infinite`
      particlesContainer.appendChild(particle)
      // Individual particles don't need direct cleanup if container is removed
    }

    // --- Create Floating Logo Circles ---
    for (let i = 0; i < NUM_LOGO_CIRCLES; i++) {
      const circle = document.createElement("div")
      circle.className = "floating-logo-circle"

      // Random position
      circle.style.left = `${Math.random() * 100}%`
      circle.style.top = `${Math.random() * 100}%`

      // Random size
      const size = Math.random() * 50 + 30 // Size between 30px and 80px
      circle.style.width = `${size}px`
      circle.style.height = `${size}px`

      // Random animation properties
      const duration = Math.random() * 15 + 10 // Duration 10s to 25s
      const delay = Math.random() * 5        // Delay up to 5s
      // Use alternate direction for smoother back-and-forth
      circle.style.animation = `floatingLogo ${duration}s linear ${delay}s infinite alternate`

      // Create and append the logo image
      const img = document.createElement("img")
      img.src = LOGO_URL
      img.alt = "Floating Logo" // Add alt text for accessibility
      circle.appendChild(img)

      wrapper.appendChild(circle)
      createdElements.push(circle); // Store for cleanup
    }

    // --- Keep Scroll Animations Initialization ---
    initScrollAnimations()

    // --- Keep Section Background Logic ---
    const sections = document.querySelectorAll("section")
    const bgClasses = [
      "section-bg-blue",
      "section-bg-indigo",
      "section-bg-purple",
      "section-bg-dark",
      "section-bg-black",
    ]

    sections.forEach((section, index) => {
        // Check if it already has section-bg to avoid adding multiple times if component re-renders unexpectedly
        if (!section.classList.contains("section-bg")) {
            section.classList.add("section-bg")
            const bgClass = bgClasses[index % bgClasses.length]
            section.classList.add(bgClass)

            // Check if gradient/overlay already exist before adding
            if (!section.querySelector('.section-bg-gradient')) {
                const gradient = document.createElement("div")
                gradient.className = "section-bg-gradient"
                section.appendChild(gradient)
            }

            if (!section.querySelector('.section-bg-overlay')) {
                const overlay = document.createElement("div")
                overlay.className = "section-bg-overlay"
                section.appendChild(overlay)
            }
        }
    })


    // --- Cleanup Function ---
    return () => {
      createdElements.forEach(el => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el)
        }
      })
    }
  }, []) // Empty dependency array ensures this runs only once on mount

  return (
    // The main wrapper div
    <div ref={wrapperRef} className={`page-wrapper relative min-h-screen overflow-hidden ${className}`}>
      {/*
        Removed static abstract-bg and abstract-circle divs.
        The circuit, particles, and floating logos are added dynamically by useEffect.
      */}

      {/* Your page content, positioned above the background elements */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}