import apiClient from '../interceptors/authInterceptor';
import { LoginCredentials, RegisterFormData, AuthUser, VerificationResponse } from '../types/auth.types';

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