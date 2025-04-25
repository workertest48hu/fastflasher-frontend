"use client"

import { Button } from "@/components/ui/button"
import FeatureCard from "@/components/feature-card"
import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function FeaturesSection() {
  const [expanded, setExpanded] = useState(false)

  const features = [
    {
      title: "Low Fees, Scalability",
      description:
        "Fast Flasher offers low fees and high scalability as an EVM-compatible chain, ensuring swift transaction processing...",
    },
    {
      title: "Interoperability",
      description:
        "Fast Flasher consensus-free interoperability takes blockchain interoperability to the next level, ensuring consistency",
    },
    {
      title: "Blockchain Routing",
      description: "Our routing system helps future-proof dApps by monitoring the conditions of the underlying chain.",
    },
    {
      title: "Smart Contracts",
      description:
        "Our Reactive Smart Contracts have self-paying wallets, which can monitor, move, process, and sync data between blockchains without external payments.",
    },
    {
      title: "Unified Development",
      description:
        "Using WASM, we allow developers to create dApps using familiar languages like JavaScript, Python, Rust",
    },
    {
      title: "Gas Fee Abstraction",
      description:
        "Gas Fee Abstraction removes the complexity of paying fees across multiple chains. No need for users to hold L1 or L2 native tokens to use the dApp.",
    },
  ]

  const additionalFeatures = [
    {
      title: "Cross-Chain Messaging",
      description:
        "Enable seamless communication between different blockchain networks with our advanced cross-chain messaging protocol.",
    },
    {
      title: "Decentralized Identity",
      description:
        "Implement secure, user-controlled digital identities that work across multiple applications and platforms.",
    },
    {
      title: "Zero-Knowledge Proofs",
      description:
        "Leverage privacy-preserving technology to validate transactions without revealing sensitive information.",
    },
    {
      title: "Tokenization Framework",
      description:
        "Create and manage digital assets representing real-world value with our comprehensive tokenization tools.",
    },
    {
      title: "Governance System",
      description: "Implement decentralized decision-making with our flexible on-chain governance mechanisms.",
    },
    {
      title: "Developer Tooling",
      description:
        "Access a comprehensive suite of development tools, SDKs, and documentation to accelerate your blockchain project.",
    },
  ]

  return (
    <section id="features"  className="py-20">


      <div className="container mx-auto px-4 md:px-0">
        <div className="text-center mb-16">
          <h2 className="scroll-trigger section-title text-white">Core Features</h2>
          <p className="scroll-trigger text-gray-300 max-w-3xl mx-auto">
            At Layer 2b, we pride ourselves on offering a suite of core features designed to elevate your experience in
            the decentralized landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
          {features.map((feature, index) => (
            <div key={index} className="feature-card-container scroll-trigger">
              <FeatureCard title={feature.title} description={feature.description} animationDelay={index * 100} />
            </div>
          ))}
        </div>

        <div className={`expandable-content ${expanded ? "expanded" : ""}`}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16 mt-16">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="feature-card-container scroll-trigger">
                <FeatureCard title={feature.title} description={feature.description} animationDelay={index * 100} />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <Button
            variant="outline"
            className="scroll-trigger btn-outline inline-flex items-center border-indigo-500 text-white hover:bg-indigo-900"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show Less" : "Read More"}
            {expanded ? <ChevronDown className="ml-2" size={16} /> : <ChevronRight className="ml-2" size={16} />}
          </Button>
        </div>

        {/* <div className="text-center mt-8">
          <Link href="/learn">
            <Button className="scroll-trigger btn-primary btn-hover-effect">Learn About Blockchain</Button>
          </Link>
        </div> */}
      </div>
    </section>
  )
}