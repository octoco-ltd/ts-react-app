export interface IUserSlice {
    user: IUser | null,
    status: 'authenticated' | 'error' | 'idle' | 'loading'
    authType: 'firebase' | 'cognito' | null
    accessToken: string | null,
    refreshToken: string | null,
}

export interface IUser {
    id: string;
}