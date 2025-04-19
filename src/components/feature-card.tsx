"use client"

import { useEffect, useRef } from "react"

interface FeatureCardProps {
  title: string
  description: string
  animationDelay?: number
}

export default function FeatureCard({ title, description, animationDelay = 0 }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-visible")
            }, animationDelay)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [animationDelay])

  return (
    <div
      ref={cardRef}
      className="animate-fade-in feature-card bg-black bg-opacity-30 rounded-lg p-6 relative border border-indigo-900 border-opacity-30 h-full"
    >
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
        <div className="h-16 w-16 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg glow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
      </div>
      <div className="pt-8">
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  )
}
