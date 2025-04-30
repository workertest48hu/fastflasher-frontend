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
            <div className="text-sm font-medium text-blue-400 mb-2">ABOUT Fast Flasher</div>
            <h2 className="section-title">Empowering Your Portfolio with Fast Flasher</h2>
            <p className="text-gray-300 mb-8">
            At FASTFLASHER our goal is to provide people with a lightning-fast and reliable platform for the Flash USDT market. We understand how valuable time is, which is why we've designed our website to allow you to buy and sell Flash USDT quickly and easily. Our team is made up of experts in the financial market and technology, who ensure that you get the best possible experience. We are constantly working to improve our technology and add new features so that you always stay ahead in the market. Trust and security are paramount to us. We use strict security measures to keep your data and transactions safe. If you want to trade in the Flash USDT market in a blazing-fast and better way, then FASTFLASHER is the right partner for you. Join us today and see the difference!
            </p>

            <ul className="space-y-4 mb-8">
  <li className="flex items-start">
    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-900 flex items-center justify-center mr-3 mt-0.5">
      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
    </div>
    <div>
      <h3 className="font-medium text-white">What your mission and values are?</h3>
      <p className="text-gray-300 text-sm mt-1">
        lightning-fast execution for Flash USDT, low fees, etc.
      </p>
    </div>
  </li>
  <li className="flex items-start">
    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-900 flex items-center justify-center mr-3 mt-0.5">
      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
    </div>
    <div>
      <h3 className="font-medium text-white">What if my wallet address is wrong or the transfer fails?</h3>
      <p className="text-gray-300 text-sm mt-1">
        We'll notify you via email within 20 minutes and refund your USDT.
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
        Maintain full control of your assets while benefiting from our secure infrastructure and 24/7 support.
      </p>
    </div>
  </li>
</ul>

           
          </div>
        </div>
      </div>
    </section>
  )
}
