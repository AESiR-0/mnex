import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mnex - Industrial Solutions',
  description: 'MNex provides innovative industrial solutions and services',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Root layout - Next.js App Router requires html and body tags at root level
  // Child layouts should NOT include html/body tags
  // Lang will be set dynamically by locale layout script
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
