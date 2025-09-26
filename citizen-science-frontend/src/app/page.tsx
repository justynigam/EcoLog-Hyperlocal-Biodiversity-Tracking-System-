// src/app/page.tsx
'use client'

import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import ObservationCard from '@/components/features/ObservationCard'
import { useObservationStore } from '@/store/observationStore'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function Dashboard() {
  const { observations, loading, fetchObservations } = useObservationStore()

  useEffect(() => {
    fetchObservations()
  }, [fetchObservations])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 size={32} className="animate-spin text-primary-600" />
      </div>
    )
  }

  // Ensure observations is always an array
  const observationsList = Array.isArray(observations) ? observations : []

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🌿 Community Observations
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover and document wildlife in your neighborhood
        </p>
        <Link href="/submit">
          <Button size="lg" className="px-8">
            Add Your Observation
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-primary-600">
            {observationsList.length}
          </div>
          <div className="text-gray-600">Total Observations</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-primary-600">
            {new Set(observationsList.map(obs => obs.species_name)).size}
          </div>
          <div className="text-gray-600">Species Documented</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-primary-600">
            {new Set(observationsList.map(obs => obs.user_id)).size}
          </div>
          <div className="text-gray-600">Active Contributors</div>
        </div>
      </div>

      {/* Recent Observations */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Recent Observations
        </h2>
        {observationsList.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔬</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No observations yet
            </h3>
            <p className="text-gray-600 mb-6">
              Be the first to document wildlife in your area!
            </p>
            <Link href="/submit">
              <Button>Add First Observation</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {observationsList.map((observation) => (
              <ObservationCard
                key={observation.id}
                observation={observation}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
