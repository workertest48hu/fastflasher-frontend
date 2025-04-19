import { Button } from "@/components/ui/button"

export default function AboutSection() {
  return (
    <section id="" className="py-20">
      
      <div className="container mx-auto px-4 md:px-0">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="scroll-trigger-left order-2 md:order-1">
              {/* Blockchain symbols */}
             <div className="w-full">
              <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjJ6cHg5cDVwcnYydGYzbW5wbTlpejA0ZHZja2U0anIxbzR1cG91bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/trN9ht5RlE3Dcwavg2/giphy.gif" alt="blochain boost"  className="w-full "/>
             </div>

            

              {/* Data flow lines */}
          </div>

          <div className="scroll-trigger-right order-1 md:order-2">
            <div className="text-sm font-medium text-blue-400 mb-2">ABOUT OXHASH</div>
            <h2 className="section-title">Empowering Your Portfolio with OxHash</h2>
            <p className="text-gray-300 mb-8">
              At OxHash, we take pride in offering a comprehensive asset ecosystem that empowers users to diversify and
              optimize their portfolios effortlessly. Our Layer 2 solution provides unparalleled speed, security, and
              scalability for all your blockchain needs.
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-900 flex items-center justify-center mr-3 mt-0.5">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-medium text-white">Opportunities for Growth</h3>
                  <p className="text-gray-300 text-sm mt-1">
                    Access a wide range of investment opportunities across multiple blockchains, all from a single
                    platform.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-900 flex items-center justify-center mr-3 mt-0.5">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-medium text-white">Flexibility and Accessibility</h3>
                  <p className="text-gray-300 text-sm mt-1">
                    Trade, stake, and manage your assets with ease, thanks to our intuitive interface and cross-chain
                    compatibility.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-900 flex items-center justify-center mr-3 mt-0.5">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-medium text-white">Empowerment, Control and Reliability</h3>
                  <p className="text-gray-300 text-sm mt-1">
                    Maintain full control of your assets while benefiting from our secure infrastructure and 24/7
                    support.
                  </p>
                </div>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary btn-hover-effect">Build on OxHash</Button>
              <Button variant="outline" className="btn-outline">
                Apply for OxHash Grant
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
