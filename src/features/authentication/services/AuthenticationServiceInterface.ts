/**
 * @interface AppAuthProvider
 * @description
 * Interface for authentication providers. This interface defines the methods
 * required for authentication and user management.
 */
export interface AppAuthProvider {
    /**
     * Sign in a user with an email and password.
     * @param email - User's email.
     * @param password - User's password.
     * @returns A promise that resolves when the sign-in is successful.
     */
    signInWithEmailAndPassword(email: string, password: string): Promise<void>;

    /**
     * Sign in a user with Google.
     * @returns A promise that resolves when the sign-in is successful.
     */
    signInWithGoogle(): Promise<void>;

    /**
     * Sign out the current user.
     */
    signOut(): void;

    /**
     * Register a new user with an email and password.
     * @param email - User's email.
     * @param password - User's password.
     * @returns A promise that resolves when the registration is successful.
     */
    register(email: string, password: string): Promise<void>;

    /**
     * Reset the user's password.
     * @returns A promise that resolves when the password reset is successful.
     */
    resetPassword(): Promise<void>;

    /**
     * Verify the user's email.
     * @returns A promise that resolves when the email is verified.
     */
    verifyEmail(): Promise<void>;

    /**
     * Get the current user.
     * @returns The user object or data. TODO: Add user type.
     */
    getUser(): any; // TODO: Add user type.

    /**
     * Check if the user's email is verified.
     * @returns `true` if the email is verified, `false` otherwise.
     */
    getEmailVerified(): boolean;

    /**
     * Custom hook for handling authentication. TODO: Consider the purpose of this hook.
     * @returns A custom hook for authentication.
     */
    useAuthHook?(): any; // TODO: Consider the purpose of this hook.

    /**
     * Persist user authentication data.
     * @param userAuth - User authentication data.
     * @returns A promise that resolves when authentication data is persisted.
     */
    persistAuth(userAuth: any): Promise<void>;

    /**
     * Refresh the user's access token.
     * @returns A promise that resolves with new access and refresh tokens.
     */
    refreshToken(): Promise<{ accessToken: string; refreshToken: string; } | null>;
}