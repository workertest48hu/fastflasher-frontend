"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { initAnimations } from "@/lib/animation"
import PageWrapper from "@/components/page-wrappper"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

interface TopicProps {
  title: string
  description: string
  content: string
  isExpanded: boolean
  onToggle: () => void
}

const Topic = ({ title, description, content, isExpanded, onToggle }: TopicProps) => {
  return (
    <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6 cursor-pointer flex justify-between items-center" onClick={onToggle}>
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </div>
        <ChevronDown
          className={`text-gray-500 dark:text-gray-400 transition-transform duration-300 ${isExpanded ? "transform rotate-180" : ""}`}
          size={24}
        />
      </div>

      <div className={`expandable-content ${isExpanded ? "expanded" : ""}`}>
        <div className="p-6 pt-0 border-t border-gray-200 dark:border-gray-700">
          <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  )
}

export default function LearnPage() {
  useEffect(() => {
    initAnimations()
  }, [])

  const [expandedTopic, setExpandedTopic] = useState<string | null>(null)

  const toggleTopic = (topicId: string) => {
    if (expandedTopic === topicId) {
      setExpandedTopic(null)
    } else {
      setExpandedTopic(topicId)
    }
  }

  const topics = [
    {
      id: "blockchain-basics",
      title: "Blockchain Basics",
      description: "Learn the fundamental concepts of blockchain technology",
      content: `
        <p>Blockchain is a distributed ledger technology that enables secure, transparent, and immutable record-keeping without the need for a central authority.</p>
        
        <h4 class="text-lg font-semibold mt-4 mb-2">Key Components:</h4>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Blocks:</strong> Containers for batches of validated transactions.</li>
          <li><strong>Chain:</strong> Blocks linked together chronologically using cryptographic hashes.</li>
          <li><strong>Consensus Mechanisms:</strong> Rules that determine how the network reaches agreement (e.g., Proof of Work, Proof of Stake).</li>
          <li><strong>Nodes:</strong> Computers that maintain copies of the blockchain and validate transactions.</li>
        </ul>
        
        <h4 class="text-lg font-semibold mt-4 mb-2">Benefits of Blockchain:</h4>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Decentralization:</strong> No single point of failure or control.</li>
          <li><strong>Transparency:</strong> All transactions are visible to network participants.</li>
          <li><strong>Immutability:</strong> Once recorded, data cannot be altered without consensus.</li>
          <li><strong>Security:</strong> Cryptographic techniques protect data integrity.</li>
        </ul>
      `,
    },
    {
      id: "cryptocurrencies",
      title: "Cryptocurrencies",
      description: "Understand digital currencies and how they work",
      content: `
        <p>Cryptocurrencies are digital or virtual currencies that use cryptography for security and operate on blockchain networks.</p>
        
        <h4 class="text-lg font-semibold mt-4 mb-2">Popular Cryptocurrencies:</h4>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Bitcoin (BTC):</strong> The first and most valuable cryptocurrency, created in 2009.</li>
          <li><strong>Ethereum (ETH):</strong> A platform for decentralized applications and smart contracts.</li>
          <li><strong>Tether (USDT):</strong> A stablecoin pegged to the US dollar.</li>
          <li><strong>Fast Flasher (OXH):</strong> Our native token for the Fast Flasher ecosystem.</li>
        </ul>
        
        <h4 class="text-lg font-semibold mt-4 mb-2">Key Concepts:</h4>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Wallets:</strong> Software that stores private keys to access and manage cryptocurrencies.</li>
          <li><strong>Mining:</strong> The process of validating transactions and adding them to the blockchain.</li>
          <li><strong>Staking:</strong> Holding funds in a cryptocurrency wallet to support network operations.</li>
          <li><strong>Market Capitalization:</strong> Total value of a cryptocurrency (price × circulating supply).</li>
        </ul>
      `,
    },
    {
      id: "smart-contracts",
      title: "Smart Contracts",
      description: "Explore self-executing contracts with the terms directly written into code",
      content: `
        <p>Smart contracts are self-executing contracts with the terms directly written into code. They automatically execute when predefined conditions are met.</p>
        
        <h4 class="text-lg font-semibold mt-4 mb-2">Characteristics:</h4>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Automation:</strong> Execute automatically when conditions are met.</li>
          <li><strong>Transparency:</strong> All parties can see the contract terms.</li>
          <li><strong>Immutability:</strong> Once deployed, cannot be changed (unless specifically designed to be upgradable).</li>
          <li><strong>Efficiency:</strong> Reduce the need for intermediaries.</li>
        </ul>
        
        <h4 class="text-lg font-semibold mt-4 mb-2">Use Cases:</h4>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>DeFi (Decentralized Finance):</strong> Lending, borrowing, and trading without intermediaries.</li>
          <li><strong>NFTs (Non-Fungible Tokens):</strong> Unique digital assets representing ownership.</li>
          <li><strong>Supply Chain:</strong> Tracking products from manufacturer to consumer.</li>
          <li><strong>Voting Systems:</strong> Secure and transparent election processes.</li>
        </ul>
        
        <h4 class="text-lg font-semibold mt-4 mb-2">Example Smart Contract (Solidity):</h4>
        <pre class="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto">
<code>// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private value;
    
    function setValue(uint256 _value) public {
        value = _value;
    }
    
    function getValue() public view returns (uint256) {
        return value;
    }
}</code></pre>
      `,
    },
    {
      id: "defi",
      title: "Decentralized Finance (DeFi)",
      description: "Discover financial applications built on blockchain technology",
      content: `
        <p>Decentralized Finance (DeFi) refers to financial applications built on blockchain technology that aim to recreate and improve upon traditional financial systems without intermediaries.</p>
        
        <h4 class="text-lg font-semibold mt-4 mb-2">Key DeFi Components:</h4>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Lending and Borrowing:</strong> Platforms that allow users to lend assets and earn interest or borrow against collateral.</li>
          <li><strong>Decentralized Exchanges (DEXs):</strong> Platforms for trading cryptocurrencies without a central authority.</li>
          <li><strong>Stablecoins:</strong> Cryptocurrencies designed to minimize price volatility, often pegged to a fiat currency.</li>
          <li><strong>Yield Farming:</strong> Strategies to maximize returns by providing liquidity to various protocols.</li>
        </ul>
        
        <h4 class="text-lg font-semibold mt-4 mb-2">Benefits of DeFi:</h4>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Accessibility:</strong> Available to anyone with an internet connection.</li>
          <li><strong>Transparency:</strong> All transactions and rules are visible on the blockchain.</li>
          <li><strong>Interoperability:</strong> Different DeFi protocols can work together seamlessly.</li>
          <li><strong>Innovation:</strong> Rapid development of new financial products and services.</li>
        </ul>
        
        <h4 class="text-lg font-semibold mt-4 mb-2">Risks:</h4>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Smart Contract Vulnerabilities:</strong> Code bugs can lead to loss of funds.</li>
          <li><strong>Market Volatility:</strong> Cryptocurrency price fluctuations can affect DeFi investments.</li>
          <li><strong>Regulatory Uncertainty:</strong> Evolving regulations may impact DeFi operations.</li>
          <li><strong>Impermanent Loss:</strong> Risk associated with providing liquidity to trading pools.</li>
        </ul>
      `,
    },
    {
      id: "layer2",
      title: "Layer 2 Solutions",
      description: "Learn about scaling solutions built on top of existing blockchains",
      content: `
        <p>Layer 2 solutions are scaling solutions built on top of existing blockchains (Layer 1) to improve transaction speed and reduce costs while maintaining the security of the underlying blockchain.</p>
        
        <h4 class="text-lg font-semibold mt-4 mb-2">Types of Layer 2 Solutions:</h4>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Rollups:</strong> Process transactions off-chain and post transaction data to the main chain.
            <ul class="list-disc pl-6 mt-2">
              <li><strong>Optimistic Rollups:</strong> Assume transactions are valid by default and only verify them if challenged.</li>
              <li><strong>ZK-Rollups:</strong> Use zero-knowledge proofs to validate transactions off-chain.</li>
            </ul>
          </li>
          <li><strong>State Channels:</strong> Allow participants to conduct transactions off-chain and only settle the final state on-chain.</li>
          <li><strong>Sidechains:</strong> Separate blockchains that run parallel to the main chain with their own consensus mechanisms.</li>
          <li><strong>Plasma:</strong> Creates a hierarchy of chains that process transactions independently.</li>
        </ul>
        
        <h4 class="text-lg font-semibold mt-4 mb-2">Benefits of Layer 2:</h4>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Scalability:</strong> Significantly higher transaction throughput.</li>
          <li><strong>Lower Fees:</strong> Reduced transaction costs compared to Layer 1.</li>
          <li><strong>Speed:</strong> Faster transaction confirmation times.</li>
          <li><strong>Inherited Security:</strong> Leverages the security of the underlying blockchain.</li>
        </ul>
        
        <h4 class="text-lg font-semibold mt-4 mb-2">Fast Flasher Layer 2 Solution:</h4>
        <p>Fast Flasher provides a Layer 2 solution that offers high throughput, low fees, and seamless interoperability with multiple blockchains, making it ideal for building decentralized applications at scale.</p>
      `,
    },
  ]

  return (
    <PageWrapper>
      <div className="min-h-screen pt-32 pb-20 px-4 md:px-0">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="animate-fade-in text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
              Blockchain Education
            </h1>
            <p className="animate-fade-in text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
              Learn about blockchain technology, cryptocurrencies, and the future of finance
            </p>

            {/* Bitcoin animation */}
            <div className="bitcoin-animation mb-10">
              <div className="bitcoin-logo">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="white">
                  <path d="M23.638 14.904c-1.602 6.425-8.113 10.343-14.542 8.743C2.67 22.05-1.244 15.542.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.349-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.415-.614.32.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.52 2.75 2.084v.006z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-12">
            {topics.map((topic) => (
              <Topic
                key={topic.id}
                title={topic.title}
                description={topic.description}
                content={topic.content}
                isExpanded={expandedTopic === topic.id}
                onToggle={() => toggleTopic(topic.id)}
              />
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Ready to Start Building?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Apply your blockchain knowledge by building on Fast Flasher's Layer 2 solution
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary btn-hover-effect">Start Building</Button>
              <Link href="/converter">
                <Button variant="outline" className="btn-outline">
                  Try Converter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
