// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://portal.lovejoy.health/api',
  CUSTOM_HEADER: import.meta.env.VITE_CUSTOM_HEADER || 'lovejoy-health-portal',
  TIMEOUT: 30000, // 30 seconds
};

// Appointment Status
export const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  DECLINED: 'declined',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

// Consultation Types
export const CONSULTATION_TYPES = {
  VIDEO: 'video',
  AUDIO: 'audio',
  CHAT: 'chat',
  IN_PERSON: 'in_person',
} as const;

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  REFUNDED: 'refunded',
} as const;

// Transaction Types
export const TRANSACTION_TYPES = {
  CREDIT: 'credit',
  DEBIT: 'debit',
} as const;

// Withdraw Request Status
export const WITHDRAW_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

// Gender Options
export const GENDER_OPTIONS = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other',
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  APPOINTMENT: 'appointment',
  PAYMENT: 'payment',
  GENERAL: 'general',
  REMINDER: 'reminder',
} as const;

// Doctor Specialties (matching your backend categories)
export const DOCTOR_SPECIALTIES = [
  { id: 'PSYCHIATRIST', name: 'Psychiatrist', icon: '🧠' },
  { id: 'NURSE_PRACTITIONER', name: 'Nurse Practitioner', icon: '👩‍⚕️' },
  { id: 'SOCIAL_WORKER', name: 'Social Worker', icon: '🤝' },
  { id: 'ADDICTION_COUNSELOR', name: 'Addiction Counselor', icon: '🔄' },
  { id: 'THERAPIST', name: 'Therapist (LPC, LCSW, LMFT)', icon: '💬' },
  { id: 'MENTAL_HEALTH_COACH', name: 'Mental Health Coach', icon: '🎯' },
  { id: 'PROFESSIONAL_COUNSELOR', name: 'Professional Counselor', icon: '👥' },
  { id: 'PEER_SUPPORT_SPECIALIST', name: 'Peer Support Specialist', icon: '🤲' },
  { id: 'PASTORAL_COUNSELOR', name: 'Pastoral Counselor', icon: '⛪' },
  { id: 'PSYCHOLOGIST', name: 'Psychologist', icon: '🧠' },
  { id: 'ART_MUSIC_THERAPIST', name: 'Art/Music Therapist', icon: '🎨' },
] as const;

// Time Slots (common appointment times)
export const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
] as const;

// Languages
export const LANGUAGES = [
  'English', 'Spanish', 'French', 'German', 'Italian', 
  'Portuguese', 'Mandarin', 'Arabic', 'Hindi', 'Other'
] as const;

// Certifications
export const CERTIFICATIONS = [
  'CBT', 'DBT', 'EMDR', 'Trauma-Informed Care', 
  'Family Therapy', 'Group Therapy', 'Addiction Counseling', 'Other'
] as const;

// Date/Time Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  API: 'YYYY-MM-DD',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
} as const;

// Pagination Defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;