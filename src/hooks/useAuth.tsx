import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import React from 'react';
import { AuthAPI } from '../services/authAPI';
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
      
      // For demo purposes, simulate authentication
      // In production, this would call your Laravel API with Firebase token
      if (email.includes('@') && password.length >= 6) {
        // Mock doctor data
        const mockDoctor: Doctor = {
          id: 1,
          first_name: 'Dr. Sarah',
          last_name: 'Smith',
          email: email,
          mobile: '+1 (555) 123-4567',
          category_id: 1,
          category_name: 'Clinical Psychology',
          experience_years: 8,
          consultation_fee: 150,
          rating: 4.9,
          total_reviews: 127,
          bio: 'Experienced clinical psychologist specializing in anxiety, depression, and trauma therapy.',
          education: 'PhD in Clinical Psychology, Harvard University',
          languages: ['English', 'Spanish'],
          specializations: ['Anxiety', 'Depression', 'Trauma'],
          is_online: true,
          is_verified: true,
          wallet_balance: 2450.75,
          created_at: '2024-01-15T00:00:00Z',
          updated_at: '2024-12-20T00:00:00Z'
        };
        
        const mockToken = 'mock-jwt-token-' + Date.now();
        
        setDoctor(mockDoctor);
        setToken(mockToken);
        
        // Store in localStorage
        localStorage.setItem('doctor_token', mockToken);
        localStorage.setItem('doctor_profile', JSON.stringify(mockDoctor));
      } else {
        throw new Error('Invalid email or password');
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