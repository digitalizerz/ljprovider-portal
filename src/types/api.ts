// TypeScript interfaces matching your Laravel backend

export interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  profile_image?: string;
  category_id: number;
  category_name?: string;
  experience_years: number;
  consultation_fee: number;
  rating: number;
  total_reviews: number;
  bio?: string;
  education?: string;
  languages?: string[];
  specializations?: string[];
  is_online: boolean;
  is_verified: boolean;
  wallet_balance: number;
  license_number?: string;
  license_verified?: boolean;
  background_check?: boolean;
  location?: string;
  availability?: string;
  total_patients?: number;
  total_appointments?: number;
  created_at: string;
  updated_at: string;
}

export interface Patient {
  id: number;
  user_id: number;
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
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: number;
  doctor_id: number;
  patient_id: number;
  user_id: number;
  appointment_date: string;
  appointment_time: string;
  consultation_type: 'video' | 'audio' | 'chat' | 'in_person';
  status: 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled';
  consultation_fee: number;
  coupon_discount?: number;
  total_amount: number;
  payment_status: 'pending' | 'paid' | 'refunded';
  symptoms?: string;
  notes?: string;
  prescription?: string;
  rating?: number;
  review?: string;
  created_at: string;
  updated_at: string;
  
  // Relationships
  patient?: Patient;
  doctor?: Doctor;
}

export interface AppointmentSlot {
  id: number;
  doctor_id: number;
  date: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
  consultation_type: 'video' | 'audio' | 'chat' | 'in_person';
  created_at: string;
  updated_at: string;
}

export interface WalletTransaction {
  id: number;
  user_id: number;
  doctor_id?: number;
  transaction_type: 'credit' | 'debit';
  amount: number;
  description: string;
  reference_id?: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface WithdrawRequest {
  id: number;
  doctor_id: number;
  amount: number;
  bank_account_details: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  processed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface DoctorCategory {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: number;
  doctor_id: number;
  name: string;
  description?: string;
  price: number;
  duration_minutes: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Award {
  id: number;
  doctor_id: number;
  title: string;
  description?: string;
  year: number;
  institution?: string;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: number;
  doctor_id: number;
  position: string;
  hospital_clinic: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceLocation {
  id: number;
  doctor_id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  phone?: string;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface Holiday {
  id: number;
  doctor_id: number;
  date: string;
  reason?: string;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: number;
  user_id?: number;
  doctor_id?: number;
  title: string;
  message: string;
  type: 'appointment' | 'payment' | 'general' | 'reminder';
  is_read: boolean;
  data?: any;
  created_at: string;
  updated_at: string;
}

export interface Prescription {
  id: number;
  appointment_id: number;
  doctor_id: number;
  patient_id: number;
  medications: PrescriptionMedication[];
  diagnosis?: string;
  notes?: string;
  follow_up_date?: string;
  created_at: string;
  updated_at: string;
}

export interface PrescriptionMedication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface Review {
  id: number;
  doctor_id: number;
  patient_id: number;
  appointment_id: number;
  rating: number;
  comment?: string;
  created_at: string;
  updated_at: string;
  
  // Relationships
  patient?: Patient;
}

export interface GlobalSettings {
  id: number;
  key: string;
  value: string;
  type: 'string' | 'number' | 'boolean' | 'json';
  description?: string;
  created_at: string;
  updated_at: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

// Request Types
export interface DoctorRegistrationRequest {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  password: string;
  category_id: number;
  experience_years: number;
  consultation_fee: number;
  bio?: string;
  education?: string;
  profile_image?: File;
}

export interface AppointmentRequest {
  doctor_id: number;
  patient_id: number;
  appointment_date: string;
  appointment_time: string;
  consultation_type: 'video' | 'audio' | 'chat' | 'in_person';
  symptoms?: string;
  coupon_code?: string;
}

export interface AppointmentSlotRequest {
  date: string;
  slots: {
    start_time: string;
    end_time: string;
    consultation_type: 'video' | 'audio' | 'chat' | 'in_person';
  }[];
}

export interface WithdrawRequestData {
  amount: number;
  bank_account_details: string;
}

export interface PrescriptionRequest {
  appointment_id: number;
  medications: PrescriptionMedication[];
  diagnosis?: string;
  notes?: string;
  follow_up_date?: string;
}