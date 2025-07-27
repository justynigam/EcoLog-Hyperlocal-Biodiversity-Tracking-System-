// src/hooks/useGeolocation.ts
import { useState, useEffect } from 'react'

interface GeolocationState {
  latitude: number | null
  longitude: number | null
  error: string | null
  loading: boolean
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true
  })

  useEffect(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: 'Geolocation not supported',
        loading: false
      }))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loading: false
        })
      },
      (error) => {
        setState(prev => ({
          ...prev,
          error: error.message,
          loading: false
        }))
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    )
  }, [])

  return state
}
