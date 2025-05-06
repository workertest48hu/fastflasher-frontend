import Link from "next/link"
import { Instagram, Facebook,Twitter } from "lucide-react"

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
              <span className="text-xl font-bold text-white">Fast Flasher</span>
            </div>
            <p className="text-gray-300 mb-6">
            Here you get superfast speed and easy convenience in the world of Flash USDT. Buy and sell quickly now, anytime, anywhere, because we understand that your time is the most valuable. Come, experience the future of Flash USDT exchange!"
            </p>
            <div className="text-lg font-semibold mb-4 text-white">Join the community</div>
            <div className="flex flex-row gap-5 space-x-4">
             
             
              <Link
                href="https://www.instagram.com/"
                className="h-10 w-10 bg-blue-800 rounded-md flex items-center justify-center text-gray-300 hover:bg-blue-600 hover:text-white transition-colors"
              >
             <Instagram className="h-5 w-5" />
             <span className="sr-only">Instagram</span>
              </Link>

             
             
              <Link
                href="https://x.com/"
                className="h-10 w-10 bg-blue-800 rounded-md flex items-center justify-center text-gray-300 hover:bg-blue-600 hover:text-white transition-colors"
              >
             <Twitter className="h-5 w-5" />
             <span className="sr-only">Twitter</span>
              </Link>
             
             
              <Link
                href="https://www.facebook.com/"
                className="h-10 w-10 bg-blue-800 rounded-md flex items-center justify-center text-gray-300 hover:bg-blue-600 hover:text-white transition-colors"
              >
             <Facebook className="h-5 w-5" />
             <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>

          <div>
            <ul className="space-y-2">
            <li>
                <Link href="#stats" className="text-gray-300 hover:text-white transition-colors">
                How it works
                </Link>
              </li>
              
              <li>
                <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#part" className="text-gray-300 hover:text-white transition-colors">
                  Partners
                </Link>
              </li>
             
              <li>
                <Link href="/resale" className="text-gray-300 hover:text-white transition-colors">
                  Resale
                </Link>
              </li>
              <li>
                <Link href="/converter" className="text-gray-300 hover:text-white transition-colors">
                  Convertor
                </Link>
              </li>
              

              <li>
                <Link href="#stats" className="text-gray-300 hover:text-white transition-colors">
                  Roadmap
                </Link>
              </li>

            </ul>
          </div>





        </div>

        <div className="mt-12 pt-8 border-t border-black text-center">
          <p className="text-gray-300">&copy; {new Date().getFullYear()} Fast Flasher. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
