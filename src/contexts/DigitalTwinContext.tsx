import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './AuthContext';
import { DigitalTwinProfile } from '@/types/digitalTwin';

interface DigitalTwinContextType {
  digitalTwin: DigitalTwinProfile | null;
  isLoading: boolean;
  saveDigitalTwin: (data: DigitalTwinProfile) => Promise<void>;
  loadDigitalTwin: () => Promise<void>;
  updateSection: (section: string, data: any) => Promise<void>;
  deleteTwin: () => Promise<void>;
}

const DigitalTwinContext = createContext<DigitalTwinContextType | undefined>(undefined);

export const useDigitalTwin = () => {
  const context = useContext(DigitalTwinContext);
  if (context === undefined) {
    throw new Error('useDigitalTwin must be used within a DigitalTwinProvider');
  }
  return context;
};

interface DigitalTwinProviderProps {
  children: ReactNode;
}

export const DigitalTwinProvider: React.FC<DigitalTwinProviderProps> = ({ children }) => {
  const [digitalTwin, setDigitalTwin] = useState<DigitalTwinProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { token } = useAuth();

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/digital-twin`;


  const saveDigitalTwin = async (data: DigitalTwinProfile) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save digital twin');
      }

      const result = await response.json();
      setDigitalTwin(result.data);

      toast({
        title: 'Success!',
        description: 'Your digital twin has been saved successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Save failed',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loadDigitalTwin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/get`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          setDigitalTwin(null);
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to load digital twin');
      }

      const result = await response.json();
      setDigitalTwin(result.data);
    } catch (error: any) {
      console.error('Load digital twin error:', error);
      toast({
        title: 'Load failed',
        description: error.message || 'Failed to load digital twin',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateSection = async (section: string, data: any) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/update/${section}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update section');
      }

      const result = await response.json();
      setDigitalTwin(result.data);

      toast({
        title: 'Updated!',
        description: `${section} section updated successfully.`,
      });
    } catch (error: any) {
      toast({
        title: 'Update failed',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTwin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/delete`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete digital twin');
      }

      setDigitalTwin(null);

      toast({
        title: 'Success!',
        description: 'Digital twin deleted successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Delete failed',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    digitalTwin,
    isLoading,
    saveDigitalTwin,
    loadDigitalTwin,
    updateSection,
    deleteTwin,
  };

  return (
    <DigitalTwinContext.Provider value={value}>
      {children}
    </DigitalTwinContext.Provider>
  );
};