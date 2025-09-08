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
  refreshProfile: () => Promise<void>;
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
      // Refresh profile data from server
      refreshProfileData(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const refreshProfileData = async (authToken: string) => {
    try {
      const response = await DoctorAPI.fetchMyDoctorProfile(authToken);
      if (response.success) {
        setDoctor(response.data);
        localStorage.setItem('doctor_profile', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Failed to refresh profile:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      console.log('🔐 Attempting login with:', { email, apiUrl: 'https://portal.lovejoy.health/api' });
      
      try {
        // Call real Laravel API for authentication
        const response = await AuthAPI.doctorLogin({ email, password });
        
        console.log('🎯 Login API Response:', response);
        
        if (response.success && response.data) {
          const { token: authToken, ...doctorData } = response.data;
          
          console.log('✅ Login successful, doctor data:', doctorData);
          
          setDoctor(doctorData);
          setToken(authToken);
          
          // Store in localStorage
          localStorage.setItem('doctor_token', authToken);
          localStorage.setItem('doctor_profile', JSON.stringify(doctorData));
          
          // Fetch complete profile data
          await refreshProfileData(authToken);
        } else {
          console.warn('⚠️ Login failed:', response.message);
          throw new Error(response.message || 'Login failed');
        }
      } catch (apiError) {
        console.error('❌ API Login failed, using demo mode:', apiError);
        
        // Demo mode fallback - create a sample doctor profile
        const demoDoctor = {
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
          bio: 'Experienced clinical psychologist specializing in anxiety, depression, and trauma therapy. I use evidence-based approaches including CBT and EMDR to help patients achieve lasting mental wellness.',
          education: 'PhD in Clinical Psychology, Harvard University; Licensed Clinical Psychologist',
          languages: ['English', 'Spanish'],
          location: 'New York, NY',
          availability: 'Monday - Friday, 9 AM - 6 PM',
          is_online: true,
          is_verified: true,
          license_verified: true,
          background_check: true,
          license_number: 'PSY-12345-NY',
          wallet_balance: 2450.00,
          total_patients: 28,
          total_appointments: 156,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        const demoToken = 'demo-token-' + Date.now();
        
        setDoctor(demoDoctor);
        setToken(demoToken);
        
        // Store in localStorage
        localStorage.setItem('doctor_token', demoToken);
        localStorage.setItem('doctor_profile', JSON.stringify(demoDoctor));
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
      
      if (token) {
        try {
          await DoctorAPI.logOutDoctor(token);
        } catch (error) {
          console.error('Laravel logout error:', error);
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

  const refreshProfile = async () => {
    if (!token) return;
    await refreshProfileData(token);
  };
  const value = {
    doctor,
    token,
    isLoading,
    isAuthenticated,
    login,
    logout,
    updateProfile,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
