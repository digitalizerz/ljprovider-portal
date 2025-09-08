import BaseAPI from './api';
import type {
  Doctor,
  DoctorRegistrationRequest,
  AppointmentSlot,
  AppointmentSlotRequest,
  Service,
  Award,
  Experience,
  ServiceLocation,
  Holiday,
  WithdrawRequest,
  WithdrawRequestData,
  WalletTransaction,
  DoctorCategory,
  Notification,
  ApiResponse,
  PaginatedResponse
} from '../types/api';

export class DoctorAPI extends BaseAPI {
  // Authentication & Profile
  static async doctorLogin(data: {
    email: string;
    password: string;
  }): Promise<ApiResponse<Doctor & { token: string }>> {
    return this.post('/doctorLogin', data);
  }

  static async registerDoctor(data: DoctorRegistrationRequest, token?: string): Promise<ApiResponse<Doctor>> {
    return this.post('/doctorRegistration', data, token);
  }

  static async updateDoctorDetails(data: Partial<Doctor>, token: string): Promise<ApiResponse<Doctor>> {
    return this.post('/updateDoctorDetails', data, token);
  }

  static async fetchMyDoctorProfile(token: string): Promise<ApiResponse<Doctor>> {
    return this.post('/fetchMyDoctorProfile', {}, token);
  }

  static async deleteDoctorAccount(token: string): Promise<ApiResponse<any>> {
    return this.post('/deleteDoctorAccount', {}, token);
  }

  static async logOutDoctor(token: string): Promise<ApiResponse<any>> {
    return this.post('/logOutDoctor', {}, token);
  }

  static async updateDoctorStates(data: { is_online?: boolean; is_available?: boolean }, token: string): Promise<ApiResponse<any>> {
    return this.post('/updateDoctorStates', data, token);
  }

  // Categories & Specializations
  static async fetchDoctorCategories(token?: string): Promise<ApiResponse<DoctorCategory[]>> {
    return this.post('/fetchDoctorCategories', {}, token);
  }

  static async suggestDoctorCategory(data: { category_name: string }, token: string): Promise<ApiResponse<any>> {
    return this.post('/suggestDoctorCategory', data, token);
  }

  // Services Management
  static async addEditService(data: Partial<Service>, token: string): Promise<ApiResponse<Service>> {
    return this.post('/addEditService', data, token);
  }

  // Awards Management
  static async addEditAwards(data: Partial<Award>, token: string): Promise<ApiResponse<Award>> {
    return this.post('/addEditAwards', data, token);
  }

  // Expertise Management
  static async addEditExpertise(data: { expertise: string[] }, token: string): Promise<ApiResponse<any>> {
    return this.post('/addEditExpertise', data, token);
  }

  // Experience Management
  static async addEditExperience(data: Partial<Experience>, token: string): Promise<ApiResponse<Experience>> {
    return this.post('/addEditExperience', data, token);
  }

  // Service Locations
  static async addEditServiceLocations(data: Partial<ServiceLocation>, token: string): Promise<ApiResponse<ServiceLocation>> {
    return this.post('/addEditServiceLocations', data, token);
  }

  // Appointment Slots Management
  static async addAppointmentSlots(data: AppointmentSlotRequest, token: string): Promise<ApiResponse<AppointmentSlot[]>> {
    return this.post('/addAppointmentSlots', data, token);
  }

  static async deleteAppointmentSlot(data: { slot_id: number }, token: string): Promise<ApiResponse<any>> {
    return this.post('/deleteAppointmentSlot', data, token);
  }

  // Holiday Management
  static async addHoliday(data: { date: string; reason?: string }, token: string): Promise<ApiResponse<Holiday>> {
    return this.post('/addHoliday', data, token);
  }

  static async deleteHoliday(data: { holiday_id: number }, token: string): Promise<ApiResponse<any>> {
    return this.post('/deleteHoliday', data, token);
  }

  // Bank Account Management
  static async manageDrBankAccount(data: { 
    account_holder_name: string;
    account_number: string;
    bank_name: string;
    ifsc_code: string;
    branch_name?: string;
  }, token: string): Promise<ApiResponse<any>> {
    return this.post('/manageDrBankAccount', data, token);
  }

  // Wallet & Earnings
  static async fetchDoctorWalletStatement(data: { 
    page?: number;
    limit?: number;
    from_date?: string;
    to_date?: string;
  }, token: string): Promise<ApiResponse<PaginatedResponse<WalletTransaction>>> {
    return this.post('/fetchDoctorWalletStatement', data, token);
  }

  static async fetchDoctorEarningHistory(data: {
    page?: number;
    limit?: number;
    from_date?: string;
    to_date?: string;
  }, token: string): Promise<ApiResponse<PaginatedResponse<WalletTransaction>>> {
    return this.post('/fetchDoctorEarningHistory', data, token);
  }

  static async submitDoctorWithdrawRequest(data: WithdrawRequestData, token: string): Promise<ApiResponse<WithdrawRequest>> {
    return this.post('/submitDoctorWithdrawRequest', data, token);
  }

  static async fetchDoctorPayoutHistory(data: {
    page?: number;
    limit?: number;
  }, token: string): Promise<ApiResponse<PaginatedResponse<WithdrawRequest>>> {
    return this.post('/fetchDoctorPayoutHistory', data, token);
  }

  // Notifications
  static async fetchDoctorNotifications(data: {
    page?: number;
    limit?: number;
  }, token: string): Promise<ApiResponse<PaginatedResponse<Notification>>> {
    return this.post('/fetchDoctorNotifications', data, token);
  }

  // Reviews
  static async fetchDoctorReviews(data: {
    doctor_id?: number;
    page?: number;
    limit?: number;
  }, token?: string): Promise<ApiResponse<PaginatedResponse<any>>> {
    return this.post('/fetchDoctorReviews', data, token);
  }

  // Utility
  static async fetchUserDetails(data: { user_id: number }, token: string): Promise<ApiResponse<any>> {
    return this.post('/fetchUserDetails', data, token);
  }

  static async checkMobileNumberExists(data: { mobile: string }, token?: string): Promise<ApiResponse<{ exists: boolean }>> {
    return this.post('/checkMobileNumberExists', data, token);
  }

  static async fetchFaqCats(token?: string): Promise<ApiResponse<any[]>> {
    return this.post('/fetchFaqCats', {}, token);
  }
}