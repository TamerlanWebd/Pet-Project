import type { ReactNode } from 'react'
import './globals.css'
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata = {
  title: 'Christmas Users List',
  description: 'Pet project with Next.js and Drizzle',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
