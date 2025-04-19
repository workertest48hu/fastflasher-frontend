import Link from "next/link"

export default function Footer() {
  return (
    <footer className="blue-footer py-16 border-t border-black">
      <div className="container mx-auto px-4 md:px-0">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <div className="relative h-10 w-10 mr-2">
                <div className="absolute inset-0 bg-blue-500 rounded-md flex items-center justify-center text-white font-bold text-xl">
                  #
                </div>
              </div>
              <span className="text-xl font-bold text-white">OxHash</span>
            </div>
            <p className="text-gray-300 mb-6">
              OxHash is a blockchain ecosystem powered by OxHash Ethereum L2 scaling solution.
            </p>
            <div className="text-lg font-semibold mb-4 text-white">Join the community</div>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="h-10 w-10 bg-blue-800 rounded-md flex items-center justify-center text-gray-300 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8.4 10.6a2.5 2.5 0 1 0 0 2.8" />
                  <path d="M9.5 8.4a4.5 4.5 0 1 0 0 7.2" />
                  <path d="M15.5 8.4a4.5 4.5 0 1 0 0 7.2" />
                  <path d="M16.6 10.6a2.5 2.5 0 1 0 0 2.8" />
                </svg>
              </Link>
              <Link
                href="#"
                className="h-10 w-10 bg-blue-800 rounded-md flex items-center justify-center text-gray-300 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="h-10 w-10 bg-blue-800 rounded-md flex items-center justify-center text-gray-300 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </Link>
              <Link
                href="#"
                className="h-10 w-10 bg-blue-800 rounded-md flex items-center justify-center text-gray-300 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
            </div>
          </div>

          <div>
  <h3 className="text-lg font-semibold mb-4 text-white">Ecosystem</h3>
  <ul className="space-y-2">
    <li>
      <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
        How it works
      </Link>
    </li>
    <li>
      <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
        Features
      </Link>
    </li>
    <li>
      <Link href="#partners" className="text-gray-300 hover:text-white transition-colors">
        Partners
      </Link>
    </li>
    <li>
      <Link href="/usdt" className="text-gray-300 hover:text-white transition-colors">
        USDT
      </Link>
    </li>
    <li>
      <Link href="/resale" className="text-gray-300 hover:text-white transition-colors">
        Resale
      </Link>
    </li>
    <li>
      <Link href="/operator" className="text-gray-300 hover:text-white transition-colors">
        Operator
      </Link>
    </li>
    <li>
      <Link href="/converter" className="text-gray-300 hover:text-white transition-colors">
        Converter
      </Link>
    </li>
    <li>
      <Link href="#roadmap" className="text-gray-300 hover:text-white transition-colors">
        Roadmap
      </Link>
    </li>
    <li>
      <Link href="/learn" className="text-gray-300 hover:text-white transition-colors">
        Learn
      </Link>
    </li>
  </ul>
</div>


          

          
        </div>

        <div className="mt-12 pt-8 border-t border-black text-center">
          <p className="text-gray-300">&copy; {new Date().getFullYear()} OxHash. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
