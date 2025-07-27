// src/store/observationStore.ts
import { create } from 'zustand'
import { observationAPI } from '@/lib/api'
import type { Observation } from '@/lib/supabase'

interface ObservationStore {
  observations: Observation[]
  loading: boolean
  error: string | null
  fetchObservations: () => Promise<void>
  addObservation: (observation: Omit<Observation, 'id' | 'created_at'>) => Promise<void>
  clearError: () => void
}

export const useObservationStore = create<ObservationStore>((set) => ({
  observations: [],
  loading: false,
  error: null,

  fetchObservations: async () => {
    set({ loading: true, error: null })
    try {
      const observations = await observationAPI.getAll()
      set({ observations, loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  addObservation: async (observation) => {
    set({ loading: true, error: null })
    try {
      const newObservation = await observationAPI.create(observation as any)
      set((state) => ({
        observations: [newObservation, ...state.observations],
        loading: false,
      }))
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  clearError: () => set({ error: null }),
}))
