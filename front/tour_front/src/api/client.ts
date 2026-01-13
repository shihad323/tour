/// <reference types="vite/client" />
import axios, { AxiosRequestConfig } from 'axios';

const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
    config.headers = config.headers || {};
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export const authAPI = {
  register: (data: any) => apiClient.post('/users/register', data),
  login: (data: any) => apiClient.post('/users/login', data),
  getProfile: () => apiClient.get('/users/profile'),
};

export const tourAPI = {
  getAllTours: (skip = 0, limit = 10) =>
    apiClient.get(`/tours?skip=${skip}&limit=${limit}`),
  getTourById: (id: string) => apiClient.get(`/tours/${id}`),
  getTourBySlug: (slug: string) => apiClient.get(`/tours/slug/${slug}`),
  searchTours: (query: string, skip = 0, limit = 10) =>
    apiClient.get(`/tours/search?q=${query}&skip=${skip}&limit=${limit}`),
  createTour: (data: any) => apiClient.post('/tours', data),
  updateTour: (id: string, data: any) => apiClient.put(`/tours/${id}`, data),
  deleteTour: (id: string) => apiClient.delete(`/tours/${id}`),
  getTourTypes: () => apiClient.get('/tours/types'),
};

export const bookingAPI = {
  createBooking: (data: any) => apiClient.post('/bookings', data),
  getBookings: (skip = 0, limit = 10) =>
    apiClient.get(`/bookings?skip=${skip}&limit=${limit}`),
  getUserBookings: (userId: string, skip = 0, limit = 10) =>
    apiClient.get(`/bookings/user/${userId}?skip=${skip}&limit=${limit}`),
  getBookingById: (id: string) => apiClient.get(`/bookings/${id}`),
  updateBooking: (id: string, data: any) =>
    apiClient.put(`/bookings/${id}`, data),
  cancelBooking: (id: string) => apiClient.post(`/bookings/${id}/cancel`),
};

export const paymentAPI = {
  createPayment: (data: any) => apiClient.post('/bookings/payment', data),
  getPaymentById: (id: string) =>
    apiClient.get(`/bookings/payment/${id}`),
  updatePaymentStatus: (id: string, status: string) =>
    apiClient.put(`/bookings/payment/${id}/status`, { status }),
};

export default apiClient;
