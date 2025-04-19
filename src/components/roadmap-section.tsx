"use client"

import { Button } from "@/components/ui/button"
import { useRef } from "react"

interface RoadmapCardProps {
  quarter: string
  title: string
  items: string[]
  animationDelay?: number
}

function RoadmapCard({ quarter, title, items, animationDelay = 0 }: RoadmapCardProps) {
  return (
    <div
      className="roadmap-card rounded-lg p-6 hover:shadow-md transition-shadow duration-300 scroll-trigger"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="text-sm font-medium text-blue-400 mb-4">{quarter}</div>
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-900 flex items-center justify-center mr-3 mt-0.5">
              <div className="h-1.5 w-1.5 bg-blue-500 rounded-full"></div>
            </div>
            <span className="text-sm text-white">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function RoadmapSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const roadmapItems = [
    {
      quarter: "Q1 2023",
      title: "Start Mint Blockchain",
      items: [
        "NFTScan Labs and MintCore jointly launched the L2, Mint Blockchain",
        "Launch the internal testnet",
        "Initial security audits and protocol optimization",
        "Early developer onboarding program",
      ],
    },
    {
      quarter: "Q2 2023",
      title: "Launch MintPass",
      items: [
        "Mint will issue MintPass in Q1 for early-stage Mint Blockchain advocates",
        "Everyone is welcome to mint a MintPass",
        "Exclusive governance rights for MintPass holders",
        "Early access to ecosystem projects",
      ],
    },
    {
      quarter: "Q3 2023",
      title: "Launch NIP Platform",
      items: [
        "NIP (NFT Improvement Proposal) is an innovative NFT asset protocol on Mint blockchain",
        "Cross-chain NFT bridging capabilities",
        "Developer tools for NFT creation and management",
      ],
    },
    {
      quarter: "Q4 2023",
      title: "Launch Testnet",
      items: [
        "Mint will be open to all developers deploying smart contracts",
        "Public testnet with faucet for developers",
        "Bug bounty program for security researchers",
        "Documentation and SDK release",
      ],
    },
   
   
    
  ]

  return (
    <section id="roadmap" className="py-20">
      <div className="container mx-auto px-4 md:px-0">
        <div className="max-w-3xl">
          <h2 className="scroll-trigger section-title">Plan Your Journey</h2>
          <p className="scroll-trigger text-gray-300 mb-12">
            Chart your course for success with our concise, actionable roadmap. Our strategic timeline outlines key
            milestones in OxHash's evolution, providing a clear vision for the future of our ecosystem.
          </p>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="roadmap-scroll"
            style={{
              display: "flex",
              overflowX: "auto",
              scrollBehavior: "smooth",
              padding: "20px 0",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
            }}
          >
            {roadmapItems.map((item, index) => (
              <div key={index} className="flex-shrink-0 w-[280px] mr-6">
                <RoadmapCard
                  quarter={item.quarter}
                  title={item.title}
                  items={item.items}
                  animationDelay={index * 100}
                />
              </div>
            ))}
          </div>
{/* 
          <div className="flex justify-center mt-8">
            <Button onClick={scrollLeft} variant="ghost" className="mr-2 rounded-full p-3 text-white hover:bg-blue-900">
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
                className="lucide lucide-arrow-left"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
            </Button>
            <Button onClick={scrollRight} variant="ghost" className="rounded-full p-3 text-white hover:bg-blue-900">
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
                className="lucide lucide-arrow-right"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Button>
          </div> */}
        </div>
      </div>
    </section>
  )
}
