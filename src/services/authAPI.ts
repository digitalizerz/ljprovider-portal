import BaseAPI from './api';
import type { Doctor, ApiResponse } from '../types/api';

export class AuthAPI extends BaseAPI {
  // Simple login for doctors (without Firebase for now)
  static async doctorLogin(data: {
    email: string;
    password: string;
  }): Promise<ApiResponse<Doctor & { token: string }>> {
    console.log('🔑 AuthAPI.doctorLogin called with:', { email: data.email });
    return this.post('/doctorLogin', data);
  }

  // Refresh authentication
  static async refreshAuth(token: string): Promise<ApiResponse<Doctor>> {
    console.log('🔄 AuthAPI.refreshAuth called');
    return this.post('/refreshAuth', {}, token);
  }

  // Check if doctor profile exists
  static async checkDoctorProfile(data: {
    email: string;
  }): Promise<ApiResponse<{ exists: boolean; status?: string }>> {
    console.log('👤 AuthAPI.checkDoctorProfile called');
    return this.post('/checkDoctorProfile', data);
  }
}