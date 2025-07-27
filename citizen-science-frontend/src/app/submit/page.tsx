// src/app/submit/page.tsx
import ObservationForm from '@/components/forms/ObservationForm'

export default function Submit() {
  return (
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
  )
}
