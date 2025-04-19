"use client"

import { useEffect, useRef } from "react"

interface StatCardProps {
  value: string
  label: string
  description: string
  animationDelay?: number
}

export default function StatCard({ value, label, description, animationDelay = 0 }: StatCardProps) {
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
    <div ref={cardRef} className="animate-fade-in border-l-2 border-slate-200 pl-6">
      <div className="text-4xl font-bold text-slate-800 mb-2">{value}</div>
      <h3 className="text-lg font-medium text-slate-700 mb-2">{label}</h3>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
  )
}
