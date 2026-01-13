import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { tourAPI } from '../api/client';

interface Tour {
  _id: string;
  slug: string;
  title: string;
  description: string;
  images: string[];
  location: string;
  costFrom: number;
  startDate: string;
  endDate: string;
  tourType: any;
  included: string[];
  excluded: string[];
  amenities: string[];
  tourPlan: string[];
}

interface TourContextType {
  tours: Tour[];
  totalTours: number;
  isLoading: boolean;
  error: string | null;
  fetchTours: (skip?: number, limit?: number) => Promise<void>;
  searchTours: (query: string, skip?: number, limit?: number) => Promise<void>;
  getTourById: (id: string) => Promise<Tour>;
  getTourBySlug: (slug: string) => Promise<Tour>;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export const TourProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [totalTours, setTotalTours] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTours = useCallback(async (skip = 0, limit = 10) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await tourAPI.getAllTours(skip, limit);
      setTours(response.data.tours);
      setTotalTours(response.data.total);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tours');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchTours = useCallback(async (query: string, skip = 0, limit = 10) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await tourAPI.searchTours(query, skip, limit);
      setTours(response.data.tours);
      setTotalTours(response.data.total);
    } catch (err: any) {
      setError(err.message || 'Failed to search tours');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getTourById = useCallback(async (id: string) => {
    try {
      const response = await tourAPI.getTourById(id);
      return response.data.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tour');
      throw err;
    }
  }, []);

  const getTourBySlug = useCallback(async (slug: string) => {
    try {
      const response = await tourAPI.getTourBySlug(slug);
      return response.data.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tour');
      throw err;
    }
  }, []);

  return (
    <TourContext.Provider
      value={{ tours, totalTours, isLoading, error, fetchTours, searchTours, getTourById, getTourBySlug }}
    >
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error('useTour must be used within TourProvider');
  }
  return context;
};
