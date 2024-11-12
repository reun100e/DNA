import apiClient from "../interceptors/authInterceptor";
import { Otp } from "../types/otp.types";

export const sendOtp = async (data: Otp): Promise<Otp> => {
    const response = await apiClient.post<Otp>(
        '/verification/send-otp/', data
    );
    return response.data;
};

export const verifyOtp = async (data: Otp): Promise<Otp> => {
    const response = await apiClient.post<Otp>(
        '/verification/verify-otp/',
        data
    );
    return response.data;
};