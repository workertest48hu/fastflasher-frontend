"use client"

import { useEffect, useRef } from "react"

interface RoadmapCardProps {
  quarter: string
  title: string
  items: string[]
  animationDelay?: number
}

export default function RoadmapCard({ quarter, title, items, animationDelay = 0 }: RoadmapCardProps) {
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
    <div ref={cardRef} className="animate-fade-in border rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
      <div className="text-sm font-medium text-slate-500 mb-4">{quarter}</div>
      <h3 className="text-xl font-bold text-slate-800 mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-slate-200 flex items-center justify-center mr-3 mt-0.5">
              <div className="h-1.5 w-1.5 bg-slate-500 rounded-full"></div>
            </div>
            <span className="text-sm text-slate-600">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
