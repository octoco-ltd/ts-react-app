/**
 * @module AuthService
 * @description
 * This module defines the `AuthService` class and the `AppAuthProvider` interface,
 * which provides authentication-related methods for your application.
 */

import { AppThunk } from 'src/store/store';
import { IUserSlice } from 'src/store/user/userSlice.contracts';
import { AppAuthProvider } from './AuthenticationServiceInterface';

/**
 * @class AuthService
 * @description
 * The `AuthService` class provides an abstraction for handling user authentication
 * and integrates with different authentication providers.
 */
export class AuthService {
    private activeAuthProvider: AppAuthProvider;

    /**
     * Create a new instance of the `AuthService`.
     * @param provider - The authentication provider to use.
     */
    constructor(provider: AppAuthProvider) {
        this.activeAuthProvider = provider;
    }

    /**
     * Get the custom authentication hook.
     * @returns A custom authentication hook if provided by the authentication provider.
     */
    useAuthHook() {
        return this.activeAuthProvider.useAuthHook;
    }

    /**
     * Persist user authentication data.
     * @param userAuth - User authentication data.
     * @returns A function that persists user authentication data.
     */
    persistAuth(userAuth: IUserSlice) {
        return async () => {
            try {
                await this.activeAuthProvider.persistAuth(userAuth);
                // Dispatch login success action if needed
            } catch (error) {
                // Dispatch login failure action if needed
                this.signOut();
            }
        };
    }

    /**
     * Refresh the user's access token.
     * @returns A promise that resolves with new access and refresh tokens.
     */
    async refreshToken() {
        const refreshData = await this.activeAuthProvider.refreshToken();
        return refreshData;
    }

    /**
     * Register a new user.
     * @param email - User's email.
     * @param password - User's password.
     * @returns A function to register a new user.
     */
    register(email: string, password: string) {
        return async () => {
            try {
                await this.activeAuthProvider.register(email, password);
                // Dispatch login success action if needed
            } catch (error) {
                // Dispatch login failure action if needed
            }
        };
    }

    /**
     * Sign in a user with an email and password.
     * @param email - User's email.
     * @param password - User's password.
     * @returns A thunk function to sign in a user.
     */
    signInWithEmailAndPassword(email: string, password: string): AppThunk {
        return async () => {
            try {
                await this.activeAuthProvider.signInWithEmailAndPassword(email, password);
                // Dispatch login success action if needed
            } catch (error) {
                // Dispatch login failure action if needed
            }
        };
    }

    /**
     * Sign in a user with Google.
     * @returns A function to sign in a user with Google.
     */
    async signInWithGoogle() {
        return async () => {
            try {
                await this.activeAuthProvider.signInWithGoogle();
                // Dispatch login success action if needed
            } catch (error) {
                // Dispatch login failure action if needed
            }
        };
    }

    /**
     * Sign out the current user.
     */
    async signOut() {
        await this.activeAuthProvider.signOut();
    }

    /**
     * Get the current user.
     * @returns The user object or data. TODO: Add user type.
     */
    getUser() {
        return this.activeAuthProvider.getUser();
    }

    /**
     * Verify the user's email.
     */
    async verifyEmail() {
        await this.activeAuthProvider.verifyEmail();
    }

    /**
     * Reset the user's password.
     * @returns A promise that resolves when the password is reset.
     */
    async resetPassword() {
        return await this.activeAuthProvider.resetPassword();
    }

    /**
     * Check if the user's email is verified.
     * @returns `true` if the email is verified, `false` otherwise.
     */
    async getEmailVerified() {
        return this.activeAuthProvider.getEmailVerified();
    }
}