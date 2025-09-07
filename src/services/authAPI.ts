import BaseAPI from './api';
import type { Doctor, ApiResponse } from '../types/api';

export class AuthAPI extends BaseAPI {
  // Simple login for doctors (without Firebase for now)
  static async doctorLogin(data: {
    email: string;
    password: string;
  }): Promise<ApiResponse<Doctor & { token: string }>> {
    return this.post('/doctorLogin', data);
  }

  // Refresh authentication
  static async refreshAuth(token: string): Promise<ApiResponse<Doctor>> {
    return this.post('/refreshAuth', {}, token);
  }

  // Check if doctor profile exists
  static async checkDoctorProfile(data: {
    email: string;
  }): Promise<ApiResponse<{ exists: boolean; status?: string }>> {
    return this.post('/checkDoctorProfile', data);
  }
}