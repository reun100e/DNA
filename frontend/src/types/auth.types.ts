// src/types/auth.types.ts
export interface AuthUser {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    is_phone_verified: boolean;
    is_email_verified: boolean;
    is_registered: boolean;
    is_payment_complete: boolean;
    dna_id: string;
    profile_picture: string;
    bio: string | null;
}


export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterFormData {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
}

export interface VerificationError {
    message: string;
    code?: 'INVALID_OTP' | 'EXPIRED_OTP' | 'TOO_MANY_ATTEMPTS' | 'NETWORK_ERROR';
}

