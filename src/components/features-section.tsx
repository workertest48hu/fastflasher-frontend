"use client"

import FeatureCard from "@/components/feature-card"

export default function FeaturesSection() {

const features = [
  {
    title:
      "You can trade with our Flash USDT to any wallet, any exchange. That's it — P2P trading is not supported in any way.",
  },
  {
    title:
      "Upon purchase, Flash USDT is deposited within 15 to 30 minutes into your wallet.",
  },
  {
    title: "Validity – Lifetime (No Expiry).",
  },
  {
    title: "You can resell your Flash USDT back to us.",
  },
  {
    title:
      "You can transfer our Flash USDT to any Trust Wallet and other decentralized exchanges (100% trusted).",
  },
  {
    title:
      "Our infrastructure is optimized to execute Flash USDT buying and selling orders instantly, without any delays.",
  },
];

  

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