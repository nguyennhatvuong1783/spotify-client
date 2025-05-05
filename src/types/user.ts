export interface User {
    id?: number;
    username: string;
    email?: string;
    profile_picture?: string | null;
    password?: string;
    is_superuser?: boolean;
    is_premium?: boolean;
    gender?: string;
    lastMessage?: string;
    lastMessageTime?: string;
}

// For user login (public facing)
export interface LoginUserDto {
    username: string;
    password: string;
}

// For user registration (public facing)
export interface RegisterUserDto {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
}

// For user profile updates (excluding sensitive fields)
export interface UpdateProfileDto {
    email?: string;
    profile_picture?: string | null;
}

// For admin user management
export interface AdminUpdateUserDto {
    username?: string;
    email?: string;
    is_superuser?: boolean;
}

// Safe user representation for API responses
export interface SafeUser {
    id: number;
    username: string;
    email: string;
    profile_picture: string | null;
    email_verified_at: string | Date | null;
    is_superuser?: boolean;
    created_at: string | Date;
    updated_at: string | Date;
}

// For login responses (extends SafeUser with token)
export interface AuthUser extends SafeUser {
    user?: User;
    access: string;
    errors?: {
        [key: string]: string;
    };
}

// For password reset/change operations
export interface PasswordChangeDto {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
}

export interface Message {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
}
