// src/components/features/ObservationCard.tsx
import Image from 'next/image'
import { MapPin, Calendar, User } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import type { Observation } from '@/lib/supabase'

interface ObservationCardProps {
  observation: Observation
}

export default function ObservationCard({ observation }: ObservationCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      {observation.photo_url &&
          observation.photo_url.match(/\.(jpg|jpeg|png|gif|webp)$/i) && (
        <div className="relative h-48 w-full">
          <Image
            src={observation.photo_url}
            alt={observation.species_name}
            fill
          />
        </div>
      )}
      
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {observation.species_name}
        </h3>
        
        {observation.notes && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {observation.notes}
          </p>
        )}
        
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <MapPin size={14} />
            <span>
              {Number(observation.latitude).toFixed(4)}, {Number(observation.longitude).toFixed(4)}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Calendar size={14} />
            <span>{formatDate(observation.created_at)}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <User size={14} />
            <span>Observer #{observation.user_id.slice(-6)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
