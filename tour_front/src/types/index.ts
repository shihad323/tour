// User Types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User';
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted: boolean;
  isActive: 'Active' | 'Inactive';
  isVerified: boolean;
  auths?: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Tour Types
export interface TourType {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Tour {
  _id: string;
  slug: string;
  title: string;
  description: string;
  images: string[];
  location: string;
  costFrom: number;
  startDate: string;
  endDate: string;
  tourType: TourType;
  included: string[];
  excluded: string[];
  amenities: string[];
  tourPlan: string[];
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Booking Types
export interface Payment {
  _id: string;
  booking: string;
  transactionId: string;
  status: 'Paid' | 'Unpaid' | 'Refunded';
  amount: number;
  paymentGatewayData?: any;
  invoiceUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Booking {
  _id: string;
  user: User | string;
  tour: Tour | string;
  guestCount: number;
  phone: string;
  address: string;
  status: 'Pending' | 'Completed' | 'Cancelled';
  payment?: Payment;
  createdAt?: string;
  updatedAt?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  total?: number;
  users?: T[];
  tours?: T[];
  bookings?: T[];
}

export interface LoginResponse {
  user: User;
  token: string;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

export interface BookingFormData {
  guestCount: number;
  phone: string;
  address: string;
}
