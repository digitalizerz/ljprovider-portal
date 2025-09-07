import BaseAPI from './api';
import type {
  Appointment,
  AppointmentRequest,
  Prescription,
  PrescriptionRequest,
  ApiResponse,
  PaginatedResponse
} from '../types/api';

export class AppointmentAPI extends BaseAPI {
  // Appointment Management (Doctor Side)
  static async fetchAppointmentRequests(data: {
    page?: number;
    limit?: number;
    status?: 'pending' | 'accepted' | 'declined';
  }, token: string): Promise<ApiResponse<PaginatedResponse<Appointment>>> {
    return this.post('/fetchAppointmentRequests', data, token);
  }

  static async fetchAppointmentDetails(data: { appointment_id: number }, token: string): Promise<ApiResponse<Appointment>> {
    return this.post('/fetchAppointmentDetails', data, token);
  }

  static async fetchAcceptedAppointsByDate(data: { date: string }, token: string): Promise<ApiResponse<Appointment[]>> {
    return this.post('/fetchAcceptedAppointsByDate', data, token);
  }

  static async acceptAppointment(data: { appointment_id: number }, token: string): Promise<ApiResponse<Appointment>> {
    return this.post('/acceptAppointment', data, token);
  }

  static async declineAppointment(data: { 
    appointment_id: number;
    reason?: string;
  }, token: string): Promise<ApiResponse<Appointment>> {
    return this.post('/declineAppointment', data, token);
  }

  static async completeAppointment(data: { appointment_id: number }, token: string): Promise<ApiResponse<Appointment>> {
    return this.post('/completeAppointment', data, token);
  }

  static async fetchAppointmentHistory(data: {
    page?: number;
    limit?: number;
    from_date?: string;
    to_date?: string;
    status?: string;
  }, token: string): Promise<ApiResponse<PaginatedResponse<Appointment>>> {
    return this.post('/fetchAppointmentHistory', data, token);
  }

  // Prescription Management
  static async addPrescription(data: PrescriptionRequest, token: string): Promise<ApiResponse<Prescription>> {
    return this.post('/addPrescription', data, token);
  }

  static async editPrescription(data: PrescriptionRequest & { prescription_id: number }, token: string): Promise<ApiResponse<Prescription>> {
    return this.post('/editPrescription', data, token);
  }

  // Patient Side Appointments (for reference)
  static async addAppointment(data: AppointmentRequest, token: string): Promise<ApiResponse<Appointment>> {
    return this.post('/user/addAppointment', data, token);
  }

  static async rescheduleAppointment(data: {
    appointment_id: number;
    new_date: string;
    new_time: string;
  }, token: string): Promise<ApiResponse<Appointment>> {
    return this.post('/user/rescheduleAppointment', data, token);
  }

  static async cancelAppointment(data: {
    appointment_id: number;
    reason?: string;
  }, token: string): Promise<ApiResponse<Appointment>> {
    return this.post('/user/cancelAppointment', data, token);
  }

  static async fetchMyAppointments(data: {
    page?: number;
    limit?: number;
    status?: string;
  }, token: string): Promise<ApiResponse<PaginatedResponse<Appointment>>> {
    return this.post('/user/fetchMyAppointments', data, token);
  }

  static async fetchMyPrescriptions(data: {
    page?: number;
    limit?: number;
  }, token: string): Promise<ApiResponse<PaginatedResponse<Prescription>>> {
    return this.post('/user/fetchMyPrescriptions', data, token);
  }

  static async addRating(data: {
    appointment_id: number;
    rating: number;
    review?: string;
  }, token: string): Promise<ApiResponse<any>> {
    return this.post('/user/addRating', data, token);
  }

  // Utility Functions
  static async fetchAcceptedPendingAppointmentsOfDoctorByDate(data: {
    doctor_id: number;
    date: string;
  }, token: string): Promise<ApiResponse<Appointment[]>> {
    return this.post('/user/fetchAcceptedPendingAppointmentsOfDoctorByDate', data, token);
  }

  static async fetchCoupons(token: string): Promise<ApiResponse<any[]>> {
    return this.post('/user/fetchCoupons', {}, token);
  }

  static async sendMobileNotification(data: {
    user_id?: number;
    doctor_id?: number;
    title: string;
    message: string;
    type?: string;
  }, token: string): Promise<ApiResponse<any>> {
    return this.post('/sendMobileNotification', data, token);
  }
}