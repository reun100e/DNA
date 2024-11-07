import apiClient from "../interceptors/authInterceptor";
import { RegisterEventData } from "../types/auth.types";

export const registerForEvent = async (data: RegisterEventData): Promise<void> => {
    await apiClient.post('registrations/register/', data)
}