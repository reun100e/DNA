import apiClient from '../interceptors/authInterceptor';
import { LoginCredentials, RegisterFormData, AuthUser} from '../types/auth.types';

export const registerUser = async (formData: RegisterFormData): Promise<{ data: { user: AuthUser } }> => {
  const response = await apiClient.post('/accounts/users/register/', formData);
  if (response.data.redirect_url) {
    window.location.href = response.data.redirect_url;  // Navigate to the redirect URL
  }
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

export const fetchUserMe = async (): Promise<AuthUser> => {
  const response = await apiClient.get('/accounts/users/me/');
  return response.data;
};

export const refreshToken = async (): Promise<void> => {
  await apiClient.post('/accounts/users/refresh/')
};


export const fetchUserProfile = async (): Promise<AuthUser> => {
  try {
    const response = await apiClient.get('/accounts/users/profile/');
    return response.data;
  } catch (error: any) {
    console.error('Failed to get user profile:', error);
    // Re-throw error to be handled by the caller (React component)
    throw error.response?.data || new Error('Something went wrong');
  }
};

export const patchUserProfile = async (updatedUser: Partial<AuthUser>): Promise<AuthUser> => {
  try {
    const response = await apiClient.patch('/accounts/users/profile/', updatedUser);
    return response.data;
  } catch (error: any) {
    console.error('Failed to update user profile:', error);
    // Re-throw error to be handled by the caller (React component)
    throw error.response?.data || new Error('Something went wrong');
  }
};

// export const uploadProfilePicture = async (file: File): Promise<string> => {
//   try {
//     const formData = new FormData();
//     formData.append("profile_picture", file);

//     const response = await apiClient.patch('/accounts/users/profile/', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     // Assuming the server response includes the updated profile picture URL
//     return response.data.profile_picture;
//   } catch (error: any) {
//     console.error("Failed to upload profile picture:", error);
//     throw error.response?.data || new Error("Something went wrong");
//   }
// };






// // Function to fetch prizes
// export const MyPrizes = async (): Promise<Prize[]> => {
//   const response = await apiClient.get('/prizes/my-prizes/');
//   return response.data;
// };