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

/**
 * Sends a PATCH request to update the user profile.
 * @param updatedUser - Object containing the fields to be updated.
 * @returns Updated user profile or throws an error.
 */
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