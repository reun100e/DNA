// src/types/auth.types.ts
export interface AuthUser {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    is_phone_verified: boolean;
    is_email_verified: boolean;
    dna_id: string;
    profile_picture: string;
    payments: Payment[];
    events: Event[];
    awards: Award[];
    prizes: Prize[];
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

export interface VerificationResponse {
    message: string;
}

export interface VerificationError {
    message: string;
    code?: 'INVALID_OTP' | 'EXPIRED_OTP' | 'TOO_MANY_ATTEMPTS' | 'NETWORK_ERROR';
}


export interface Payment {
    id: string;
    date: string;
    amount: number;
    method: string;
}

export interface Event {
    id: string;
    name: string;
    date: string;
}

export interface Award {
    id: string;
    title: string;
    date: string;
}

export interface Prize {
    id: string;
    name: string;
    date: string;
}
