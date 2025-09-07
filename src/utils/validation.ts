// Form validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateRequired = (value: string | number | null | undefined): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

export const validateAge = (age: number): boolean => {
  return age >= 0 && age <= 150;
};

export const validateConsultationFee = (fee: number): boolean => {
  return fee >= 0 && fee <= 10000; // Reasonable range for consultation fees
};

export const validateExperience = (years: number): boolean => {
  return years >= 0 && years <= 70; // Reasonable range for experience
};

export const validateDate = (date: string): boolean => {
  const dateObj = new Date(date);
  return !isNaN(dateObj.getTime()) && dateObj > new Date('1900-01-01');
};

export const validateFutureDate = (date: string): boolean => {
  const dateObj = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return dateObj >= today;
};

export const validateTime = (time: string): boolean => {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

export const validateFileSize = (file: File, maxSizeMB: number = 5): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

export const validateImageFile = (file: File): {
  isValid: boolean;
  error?: string;
} => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  const maxSize = 5; // 5MB
  
  if (!validateFileType(file, allowedTypes)) {
    return {
      isValid: false,
      error: 'Please upload a valid image file (JPEG, PNG, or GIF)'
    };
  }
  
  if (!validateFileSize(file, maxSize)) {
    return {
      isValid: false,
      error: `File size must be less than ${maxSize}MB`
    };
  }
  
  return { isValid: true };
};

export const validateDocumentFile = (file: File): {
  isValid: boolean;
  error?: string;
} => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/jpg',
    'image/png'
  ];
  const maxSize = 10; // 10MB
  
  if (!validateFileType(file, allowedTypes)) {
    return {
      isValid: false,
      error: 'Please upload a valid document (PDF, DOC, DOCX, or image)'
    };
  }
  
  if (!validateFileSize(file, maxSize)) {
    return {
      isValid: false,
      error: `File size must be less than ${maxSize}MB`
    };
  }
  
  return { isValid: true };
};