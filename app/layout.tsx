import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
})

export const metadata: Metadata = {
  title: 'Tamilarasan | Senior Software Engineer',
  description: 'Cinematic portfolio of Tamilarasan - Senior Software Engineer specializing in React, Next.js, and AI-driven products. Building scalable, high-performance web applications.',
  keywords: ['Tamilarasan', 'Software Engineer', 'React', 'Next.js', 'Portfolio', 'Frontend Developer'],
  authors: [{ name: 'Tamilarasan' }],
  openGraph: {
    title: 'Tamilarasan | Senior Software Engineer',
    description: 'Cinematic portfolio - Building scalable, high-performance web applications.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
        <div className="grain" />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
