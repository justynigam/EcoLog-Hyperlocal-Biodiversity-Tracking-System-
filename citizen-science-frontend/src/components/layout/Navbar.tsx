// src/components/layout/Navbar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MapPin, Camera, BarChart3, User, LogIn, LogOut } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function Navbar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  const navLinks = [
    { href: '/', label: 'Dashboard', icon: BarChart3 },
    { href: '/submit', label: 'Submit', icon: Camera },
    { href: '/map', label: 'Map', icon: MapPin },
    { href: '/profile', label: 'Profile', icon: User },
  ]

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <nav className="bg-primary-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold">
            🌿 EcoLog
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user && navLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    pathname === link.href
                      ? 'bg-primary-700'
                      : 'hover:bg-primary-500'
                  }`}
                >
                  <Icon size={18} />
                  <span>{link.label}</span>
                </Link>
              )
            })}
            
            {/* Auth buttons */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-primary-100">
                  {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-primary-500 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-primary-500 transition-colors"
              >
                <LogIn size={18} />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-primary-600 border-t border-primary-500">
        <div className="flex justify-around py-2">
          {user ? (
            <>
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex flex-col items-center py-2 px-4 rounded transition-colors ${
                      pathname === link.href
                        ? 'text-primary-100'
                        : 'text-primary-200 hover:text-white'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-xs mt-1">{link.label}</span>
                  </Link>
                )
              })}
              <button
                onClick={handleSignOut}
                className="flex flex-col items-center py-2 px-4 rounded transition-colors text-primary-200 hover:text-white"
              >
                <LogOut size={20} />
                <span className="text-xs mt-1">Sign Out</span>
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="flex flex-col items-center py-2 px-4 rounded transition-colors text-primary-200 hover:text-white"
            >
              <LogIn size={20} />
              <span className="text-xs mt-1">Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
