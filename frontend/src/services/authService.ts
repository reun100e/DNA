import apiClient from '../interceptors/authInterceptor';
import { LoginCredentials, RegisterFormData, AuthUser, VerificationResponse } from '../types/auth.types';
import { Payment, Event, Award } from '../types/auth.types';

export const registerUser = async (formData: RegisterFormData): Promise<{ data: { user: AuthUser } }> => {
  const response = await apiClient.post('/accounts/users/register/', formData);
  return response.data;
};

export const loginUser = async (credentials: LoginCredentials): Promise<{ data: { user: AuthUser } }> => {
  const response = await apiClient.post('/accounts/users/login/', credentials);
  return response.data;
};

export const logoutUser = async (): Promise<{ data: { user: AuthUser } }> => {
  const response = await apiClient.post('/accounts/users/logout/');
  return response.data;
};

export const fetchUserProfile = async (): Promise<AuthUser> => {
  const response = await apiClient.get('/accounts/me/');
  return response.data;
};

export const patchUserProfile = async (updatedUser: Partial<AuthUser>): Promise<AuthUser> => {
  try {
    const response = await apiClient.patch('/accounts/me/', updatedUser);
    return response.data;
  } catch (error: any) {
    console.error('Failed to update user profile:', error);
    // Re-throw error to be handled by the caller (React component)
    throw error.response?.data || new Error('Something went wrong');
  }
};

export const refreshToken = async (): Promise<void> => {
  await apiClient.post('/accounts/users/refresh/')
};

export const verifyEmailOtp = async (otp: string): Promise<VerificationResponse> => {
  const response = await apiClient.post<VerificationResponse>(
    '/accounts/users/verify-email/',
    { otp }
  );
  return response.data;
};

export const verifyPhoneOtp = async (otp: string): Promise<VerificationResponse> => {
  const response = await apiClient.post<VerificationResponse>(
    '/accounts/users/verify-phone/',
    { otp }
  );
  return response.data;
};

export const resendEmailOtp = async (): Promise<void> => {
  await apiClient.post('/accounts/users/resend-email-otp/')
};

export const resendPhoneOtp = async (): Promise<void> => {
  await apiClient.post('/accounts/users/resend-phone-otp/');
};

// Function to fetch payments
export const MyPayments = async (): Promise<Payment[]> => {
  const response = await apiClient.get('/payments/my-payments/');
  return response.data.results;
};

// Function to fetch events
export const MyEvents = async (): Promise<Event[]> => {
  const response = await apiClient.get('/programs/my-programs/');
  return response.data.results;
};

// Function to fetch awards
export const MyBadges = async (): Promise<Award[]> => {
  const response = await apiClient.get('/badges/my-badges/');
  return response.data.results.map((result: { id: string; badge: { name: string; }; awarded_date: string; }) => ({
    id: result.id,
    title: result.badge.name,
    date: result.awarded_date
  }));
};

// // Function to fetch prizes
// export const MyPrizes = async (): Promise<Prize[]> => {
//   const response = await apiClient.get('/prizes/my-prizes/');
//   return response.data;
// };