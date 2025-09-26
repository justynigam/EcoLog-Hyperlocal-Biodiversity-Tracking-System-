// src/app/submit/page.tsx
'use client'

import ObservationForm from '@/components/forms/ObservationForm'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

export default function Submit() {
  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Add New Observation
          </h1>
          <p className="text-gray-600">
            Share your wildlife discoveries with the community
          </p>
        </div>
        <ObservationForm />
      </div>
    </ProtectedRoute>
  )
}
