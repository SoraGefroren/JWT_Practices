export type PageType = 'login'|'dashboard';

export interface UserLogin {
    username: string;
    password: string;
    remember: string;
    time_zone: string;
    previous: PageType;
    language: string | null;
}

export interface UserResponse {
    token: string;
    message: string;
}


