// src/components/forms/ObservationForm.tsx
// src/components/forms/ObservationForm.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Camera, MapPin, Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useGeolocation } from '@/hooks/useGeolocation'
import { useObservationStore } from '@/store/observationStore'
import { observationAPI } from '@/lib/api'
import type { Observation } from '@/lib/supabase'


export default function ObservationForm() {
  const router = useRouter()
  const { latitude, longitude, loading: locationLoading, error: locationError } = useGeolocation()
  const { addObservation, loading } = useObservationStore()
  
  const [formData, setFormData] = useState({
    species_name: '',
    notes: '',
  })
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhoto(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.species_name || !latitude || !longitude) {
      alert('Please fill in species name and ensure location is available')
      return
    }

    try {
      let photo_url = null
      
      if (photo) {
        photo_url = await observationAPI.uploadPhoto(photo)
      }

      await addObservation({
        ...formData,
        user_id: 'anonymous-user',        // Must be present!
        latitude,                        // Use correct variables
        longitude,
        photo_url, // Replace with actual user ID when auth is implemented
      })

      router.push('/')
    } catch (error) {
      console.error('Error submitting observation:', error)
      alert('Failed to submit observation')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Camera size={24} />
          <span>New Observation</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Species Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Species Name *
            </label>
            <input
              type="text"
              value={formData.species_name}
              onChange={(e) => setFormData(prev => ({ ...prev, species_name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., Blue Jay, Oak Tree, Monarch Butterfly"
              required
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo
            </label>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handlePhotoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {photoPreview && (
              <div className="mt-4">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
              <MapPin size={18} className="text-gray-500" />
              {locationLoading ? (
                <span className="text-gray-500">Getting location...</span>
              ) : locationError ? (
                <span className="text-red-500">{locationError}</span>
              ) : latitude && longitude ? (
                <span className="text-gray-700">
                  {latitude.toFixed(6)}, {longitude.toFixed(6)}
                </span>
              ) : (
                <span className="text-gray-500">Location unavailable</span>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Describe the observation, behavior, habitat, etc."
            />
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/')}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || locationLoading}
              className="flex-1"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin mr-2" />
              ) : null}
              Submit Observation
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
