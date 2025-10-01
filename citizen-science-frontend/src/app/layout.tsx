// src/app/layout.tsx
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import { AuthProvider } from '@/contexts/AuthContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'EcoLog - Community Wildlife Observation',
  description: 'Track and document biodiversity in your community',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <AuthProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-8 mb-20 md:mb-0">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
