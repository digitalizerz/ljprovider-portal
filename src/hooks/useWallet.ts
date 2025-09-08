import { useState, useEffect } from 'react';
import { AppointmentAPI } from '../services/appointmentAPI';
import { useAuth } from './useAuth';
import type { Appointment, PaginatedResponse } from '../types/api';

export const useWallet = () => {
  const { token } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointmentRequests = async (filters?: {
    page?: number;
    limit?: number;
    status?: 'pending' | 'accepted' | 'declined';
  }) => {
    if (!token) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const response = await AppointmentAPI.fetchAppointmentRequests(filters || {}, token);
      
      if (response.success) {
        setAppointments(response.data.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch appointments');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAppointmentsByDate = async (date: string) => {
    if (!token) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const response = await AppointmentAPI.fetchAcceptedAppointsByDate({ date }, token);
      
      if (response.success) {
        setAppointments(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch appointments');
    } finally {
      setIsLoading(false);
    }
  };

  const acceptAppointment = async (appointmentId: number) => {
    if (!token) return;
    
    try {
      const response = await AppointmentAPI.acceptAppointment({ appointment_id: appointmentId }, token);
      
      if (response.success) {
        // Update local state
        setAppointments(prev => 
          prev.map(apt => 
            apt.id === appointmentId 
              ? { ...apt, status: 'accepted' }
              : apt
          )
        );
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to accept appointment');
      throw err;
    }
  };

  const declineAppointment = async (appointmentId: number, reason?: string) => {
    if (!token) return;
    
    try {
      const response = await AppointmentAPI.declineAppointment({ 
        appointment_id: appointmentId,
        reason 
      }, token);
      
      if (response.success) {
        // Update local state
        setAppointments(prev => 
          prev.map(apt => 
            apt.id === appointmentId 
              ? { ...apt, status: 'declined' }
              : apt
          )
        );
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to decline appointment');
      throw err;
    }
  };

  const completeAppointment = async (appointmentId: number) => {
    if (!token) return;
    
    try {
      const response = await AppointmentAPI.completeAppointment({ appointment_id: appointmentId }, token);
      
      if (response.success) {
        // Update local state
        setAppointments(prev => 
          prev.map(apt => 
            apt.id === appointmentId 
              ? { ...apt, status: 'completed' }
              : apt
          )
        );
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete appointment');
      throw err;
    }
  };

  return {
    appointments,
    isLoading,
    error,
    fetchAppointmentRequests,
    fetchAppointmentsByDate,
    fetchAppointmentsByDate,
    acceptAppointment,
    declineAppointment,
    completeAppointment,
  };
};
