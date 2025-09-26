// src/app/profile/page.tsx
'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useState, useEffect } from 'react'
import { User, Mail, Calendar, Award, Camera, MapPin } from 'lucide-react'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

function ProfileContent() {
  const { user } = useAuth()
  const [userStats, setUserStats] = useState({
    observations: 0,
    species: 0,
    contributions: 0
  })

  // Mock data for now - this would come from your backend
  useEffect(() => {
    if (user) {
      // Simulate loading user stats
      setTimeout(() => {
        setUserStats({
          observations: 12,
          species: 8,
          contributions: 24
        })
      }, 1000)
    }
  }, [user])

  if (!user) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        👤 Your Profile
      </h1>
      
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow p-8 mb-6">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-primary-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">
              {user.user_metadata?.display_name || 'EcoLog User'}
            </h2>
            <div className="flex items-center text-gray-600 mt-2">
              <Mail className="w-4 h-4 mr-2" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center text-gray-600 mt-1">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Joined {formatDate(user.created_at)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Camera className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{userStats.observations}</p>
              <p className="text-gray-600">Observations</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <MapPin className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{userStats.species}</p>
              <p className="text-gray-600">Species Found</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Award className="w-8 h-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{userStats.contributions}</p>
              <p className="text-gray-600">Points Earned</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="text-center text-gray-500 py-8">
            <Camera className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg">No recent observations</p>
            <p className="text-sm">Start exploring and documenting wildlife in your area!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Profile() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  )
}
  