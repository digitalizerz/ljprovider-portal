import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import React from 'react';
import { DoctorAPI } from '../services/doctorAPI';
import { DoctorAPI } from '../services/doctorAPI';
import type { Doctor } from '../types/api';

interface AuthContextType {
  doctor: Doctor | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<Doctor>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!(doctor && token);

  useEffect(() => {
    // Check for stored token on app load
    const storedToken = localStorage.getItem('doctor_token');
    const storedDoctor = localStorage.getItem('doctor_profile');
    
    if (storedToken && storedDoctor) {
      setToken(storedToken);
      setDoctor(JSON.parse(storedDoctor));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Call Laravel API for authentication
      const response = await DoctorAPI.doctorLogin({ email, password });
      
      if (response.success && response.data) {
        const { token, ...doctorData } = response.data;
        
        setDoctor(doctorData);
        setToken(token);
        
        // Store in localStorage
        localStorage.setItem('doctor_token', token);
        localStorage.setItem('doctor_profile', JSON.stringify(doctorData));
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setDoctor(null);
    setToken(null);
    localStorage.removeItem('doctor_token');
    localStorage.removeItem('doctor_profile');
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      
      // In production, call Laravel API to logout
      if (token) {
        try {
          await DoctorAPI.logOutDoctor(token);
        } catch (error) {
          console.error('Laravel logout error:', error);
          // Continue with logout even if API call fails
        }
      }
      
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      handleLogout();
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<Doctor>) => {
    if (!token) throw new Error('No authentication token');
    
    try {
      const response = await DoctorAPI.updateDoctorDetails(data, token);
      if (response.success) {
        const updatedDoctor = { ...doctor, ...response.data };
        setDoctor(updatedDoctor);
        localStorage.setItem('doctor_profile', JSON.stringify(updatedDoctor));
      } else {
        throw new Error(response.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  const value = {
    doctor,
    token,
    isLoading,
    isAuthenticated,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};