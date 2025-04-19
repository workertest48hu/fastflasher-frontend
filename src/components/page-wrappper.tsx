"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { useTheme } from "@/context/theme-context"
import { initScrollAnimations } from "@/lib/scroll-animation"

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
}

export default function PageWrapper({ children, className = "" }: PageWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    // Create animated background elements
    const wrapper = wrapperRef.current
    if (!wrapper) return

    // Create circuit pattern
    const circuit = document.createElement("div")
    circuit.className = "circuit-pattern"
    wrapper.appendChild(circuit)

    // Create particles
    const particles = document.createElement("div")
    particles.className = "particles"
    wrapper.appendChild(particles)

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"

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

      particles.appendChild(particle)
    }

    // Create abstract circles
    for (let i = 0; i < 3; i++) {
      const circle = document.createElement("div")
      circle.className = "abstract-circle"

      // Random position
      circle.style.top = `${Math.random() * 100}%`
      circle.style.left = `${Math.random() * 100}%`

      // Random size
      const size = Math.random() * 300 + 100
      circle.style.width = `${size}px`
      circle.style.height = `${size}px`

      // Random color - blue theme
      const hue = Math.random() * 60 + 220 // Blue to purple range
      circle.style.background = `hsla(${hue}, 70%, 50%, 0.05)`

      // Random animation delay
      circle.style.animationDelay = `${Math.random() * 5}s`

      wrapper.appendChild(circle)
    }

    // Initialize scroll animations
    initScrollAnimations()

    // Add background colors to sections
    const sections = document.querySelectorAll("section")
    const bgClasses = [
      "section-bg-blue",
      "section-bg-indigo",
      "section-bg-purple",
      "section-bg-dark",
      "section-bg-black",
    ]

    sections.forEach((section, index) => {
      if (!section.classList.contains("section-bg")) {
        section.classList.add("section-bg")

        // Add alternating background colors
        const bgClass = bgClasses[index % bgClasses.length]
        section.classList.add(bgClass)

        // Add gradient overlay
        const gradient = document.createElement("div")
        gradient.className = "section-bg-gradient"
        section.appendChild(gradient)

        // Add overlay
        const overlay = document.createElement("div")
        overlay.className = "section-bg-overlay"
        section.appendChild(overlay)
      }
    })

    return () => {
      // Cleanup
      if (circuit && circuit.parentNode) {
        circuit.parentNode.removeChild(circuit)
      }
      if (particles && particles.parentNode) {
        particles.parentNode.removeChild(particles)
      }
    }
  }, [])

  return (
    <div ref={wrapperRef} className={`relative min-h-screen ${className}`}>
      <div className="abstract-bg">
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
