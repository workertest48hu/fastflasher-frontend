import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/context/theme-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fast Flasher - A better way to build blockchain products",
  description: "Fast Flasher is a better way to build blockchain products with Layer 2 technology",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
