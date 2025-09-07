import BaseAPI from './api';
import type {
  Patient,
  Doctor,
  WalletTransaction,
  WithdrawRequest,
  Notification,
  ApiResponse,
  PaginatedResponse
} from '../types/api';

export class UserAPI extends BaseAPI {
  // User Authentication & Profile
  static async registerUser(data: {
    name: string;
    email: string;
    mobile: string;
    password: string;
    device_token?: string;
  }, token?: string): Promise<ApiResponse<any>> {
    return this.post('/user/registerUser', data, token);
  }

  static async updateUserDetails(data: {
    name?: string;
    email?: string;
    mobile?: string;
    profile_image?: File;
  }, token: string): Promise<ApiResponse<any>> {
    return this.post('/user/updateUserDetails', data, token);
  }

  static async fetchMyUserDetails(token: string): Promise<ApiResponse<any>> {
    return this.post('/user/fetchMyUserDetails', {}, token);
  }

  static async deleteUserAccount(token: string): Promise<ApiResponse<any>> {
    return this.post('/user/deleteUserAccount', {}, token);
  }

  static async logOut(token: string): Promise<ApiResponse<any>> {
    return this.post('/user/logOut', {}, token);
  }

  // Patient Management
  static async addPatient(data: {
    name: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    mobile?: string;
    email?: string;
    address?: string;
    medical_history?: string;
    allergies?: string;
    current_medications?: string;
    emergency_contact?: string;
    insurance_provider?: string;
  }, token: string): Promise<ApiResponse<Patient>> {
    return this.post('/user/addPatient', data, token);
  }

  static async editPatient(data: Partial<Patient> & { patient_id: number }, token: string): Promise<ApiResponse<Patient>> {
    return this.post('/user/editPatient', data, token);
  }

  static async deletePatient(data: { patient_id: number }, token: string): Promise<ApiResponse<any>> {
    return this.post('/user/deletePatient', data, token);
  }

  static async fetchPatients(data: {
    page?: number;
    limit?: number;
  }, token: string): Promise<ApiResponse<PaginatedResponse<Patient>>> {
    return this.post('/user/fetchPatients', data, token);
  }

  // Doctor Discovery
  static async fetchHomePageData(token: string): Promise<ApiResponse<{
    featured_doctors: Doctor[];
    categories: any[];
    banners: any[];
  }>> {
    return this.post('/user/fetchHomePageData', {}, token);
  }

  static async searchDoctor(data: {
    search_term?: string;
    category_id?: number;
    city?: string;
    consultation_type?: string;
    min_rating?: number;
    max_fee?: number;
    page?: number;
    limit?: number;
  }, token: string): Promise<ApiResponse<PaginatedResponse<Doctor>>> {
    return this.post('/user/searchDoctor', data, token);
  }

  static async fetchDoctorProfile(data: { doctor_id: number }, token: string): Promise<ApiResponse<Doctor>> {
    return this.post('/user/fetchDoctorProfile', data, token);
  }

  static async fetchDoctorReviews(data: {
    doctor_id: number;
    page?: number;
    limit?: number;
  }, token: string): Promise<ApiResponse<PaginatedResponse<any>>> {
    return this.post('/user/fetchDoctorReviews', data, token);
  }

  static async fetchFavoriteDoctors(data: {
    page?: number;
    limit?: number;
  }, token: string): Promise<ApiResponse<PaginatedResponse<Doctor>>> {
    return this.post('/user/fetchFavoriteDoctors', data, token);
  }

  // Wallet Management
  static async addMoneyToUserWallet(data: {
    amount: number;
    payment_method: string;
    transaction_id?: string;
  }, token: string): Promise<ApiResponse<WalletTransaction>> {
    return this.post('/user/addMoneyToUserWallet', data, token);
  }

  static async fetchWalletStatement(data: {
    page?: number;
    limit?: number;
    from_date?: string;
    to_date?: string;
  }, token: string): Promise<ApiResponse<PaginatedResponse<WalletTransaction>>> {
    return this.post('/user/fetchWalletStatement', data, token);
  }

  static async submitUserWithdrawRequest(data: {
    amount: number;
    bank_account_details: string;
  }, token: string): Promise<ApiResponse<WithdrawRequest>> {
    return this.post('/user/submitUserWithdrawRequest', data, token);
  }

  static async fetchUserWithdrawRequests(data: {
    page?: number;
    limit?: number;
  }, token: string): Promise<ApiResponse<PaginatedResponse<WithdrawRequest>>> {
    return this.post('/user/fetchUserWithdrawRequests', data, token);
  }

  // Notifications
  static async fetchNotification(data: {
    page?: number;
    limit?: number;
  }, token: string): Promise<ApiResponse<PaginatedResponse<Notification>>> {
    return this.post('/user/fetchNotification', data, token);
  }
}