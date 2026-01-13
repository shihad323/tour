export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: 'Admin' | 'User';
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted: boolean;
  isActive: 'Active' | 'Inactive';
  isVerified: boolean;
  auths?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITourType {
  _id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITour {
  _id?: string;
  slug: string;
  title: string;
  description: string;
  images: string[];
  location: string;
  costFrom: number;
  startDate: Date;
  endDate: Date;
  tourType: string;
  included: string[];
  excluded: string[];
  amenities: string[];
  tourPlan: string[];
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBooking {
  _id?: string;
  user: string;
  tour: string;
  guestCount: number;
  phone: string;
  address: string;
  status: 'Pending' | 'Completed' | 'Cancelled';
  payment?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPayment {
  _id?: string;
  booking: string;
  transactionId: string;
  status: 'Paid' | 'Unpaid' | 'Refunded';
  amount: number;
  paymentGatewayData?: any;
  invoiceUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
