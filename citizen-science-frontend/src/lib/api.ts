// src/lib/api.ts
import type { Observation } from '@/lib/supabase'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';

export const observationAPI = {
  // Fetch all observations from the backend API
  async getAll(): Promise<Observation[]> {
    const response = await fetch(`${API_BASE_URL}/observations/`);
    if (!response.ok) {
      throw new Error('Failed to fetch observations');
    }
    const data = await response.json();
    // If using Django Rest Framework pagination, the list will be in data.results
    return data.results || data;
  },

  // Create a new observation entry on the backend
  async create(observation: Omit<Observation, 'id' | 'created_at'>): Promise<Observation> {
    const response = await fetch(`${API_BASE_URL}/observations/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(observation),
    });
    if (!response.ok) {
      throw new Error('Failed to create observation');
    }
    return response.json();
  },

  // Upload a photo file and receive its URL from backend
  async uploadPhoto(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('photo', file);

    const response = await fetch(`${API_BASE_URL}/observations/upload_photo/`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Failed to upload photo');
    }
    const data = await response.json();
    return data.photo_url;
  },
};
