"use client"

import FeatureCard from "@/components/feature-card"

export default function FeaturesSection() {

  const features = [
    {
      // title: "Low Fees, Scalability",
      title:
        "Our infrastructure is optimized to execute Flash USDT buying and selling orders instantly, without any delays.",
    },
    {
      // title: "Interoperability",
      title:
        "Upon purchase, Flash USDT is immediately deposited within 15 to 30 min. into your wallet.",
    },
    {
      title: "Flash USDT expiry 130 to 150 days.",
      // description: "Our routing system helps future-proof dApps by monitoring the conditions of the underlying chain.",
    },
    {
      title: "You can resell your Flash back to us.",
      // description:
      //   "Our Reactive Smart Contracts have self-paying wallets, which can monitor, move, process, and sync data between blockchains without external payments.",
    },
    {
      title: "You can transfer our Flash to any Trust Wallet and other decentralize exchange.t",
      // description:
      //   "Using WASM, we allow developers to create dApps using familiar languages like JavaScript, Python, Rust",
    },
    {
      title: "You can trade with our Flash USDT to any wallet, wow exchange, that's it, you can't do P2P in any way, it can't do P2P.",
      // description:
      //   "Gas Fee Abstraction removes the complexity of paying fees across multiple chains. No need for users to hold L1 or L2 native tokens to use the dApp.",
    },
  ]

  

  return (
    <section id="features"  className="py-20">


      <div className="container mx-auto px-4 md:px-0">
        <div className="text-center mb-16">
          <h2 className="scroll-trigger section-title text-white">Features of our Flash USDT.</h2>
          <p className="scroll-trigger text-gray-300 max-w-3xl mx-auto">
          
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
          {features.map((feature, index) => (
            <div key={index} className="feature-card-container scroll-trigger">
            <FeatureCard
         // If feature.title is null or undefined, use "" instead
         title={feature.title ?? ""}
         description={feature.description ?? ""}
         animationDelay={index * 100}
       />
            </div>
          ))}
        </div>

        

        {/* <div className="text-center mt-16">
          <Button
            variant="outline"
            className="scroll-trigger btn-outline inline-flex items-center border-indigo-500 text-white hover:bg-indigo-900"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show Less" : "Read More"}
            {expanded ? <ChevronDown className="ml-2" size={16} /> : <ChevronRight className="ml-2" size={16} />}
          </Button>
        </div> */}

        {/* <div className="text-center mt-8">
          <Link href="/learn">
            <Button className="scroll-trigger btn-primary btn-hover-effect">Learn About Blockchain</Button>
          </Link>
        </div> */}
      </div>
    </section>
  )
}