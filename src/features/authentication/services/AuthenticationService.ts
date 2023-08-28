import { AppThunk } from 'src/store/store';
import { IUserSlice } from 'src/store/user/userSlice.contracts';

export interface AppAuthProvider {
    signInWithEmailAndPassword(email: string, password:string): Promise<void>;
    signInWithGoogle(): Promise<void>;
    signOut(): void;
    register(email: string, password:string): Promise<void>;
    resetPassword(): Promise<void>;
    verifyEmail(): Promise<void>;
    getUser(): any; //TODO: add user type
    getEmailVerified(): boolean;
    useAuthHook?(): any; //TODO: think about this
    persistAuth(userAuth: any): Promise<void>; //how to set this type UserCredential dynamically per client?
}

export class AuthService {
    private activeAuthProvider: AppAuthProvider;
  
    constructor(provider: AppAuthProvider) {
      this.activeAuthProvider = provider;
    }

    useAuthHook() {
        return this.activeAuthProvider.useAuthHook;
    }

    persistAuth(userAuth: IUserSlice) {
        return async () => {
            try {
                await this.activeAuthProvider.persistAuth(userAuth);
                // Dispatch login success action if needed
            } catch (error) {
                // Dispatch login failure action if needed
            }
        };
    }

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
  
    async signOut() {
      await this.activeAuthProvider.signOut();
    }
  
    getUser() {
      return this.activeAuthProvider.getUser();
    }

    async verifyEmail() {
        await this.activeAuthProvider.verifyEmail();
    }
    
    async resetPassword() {
        return await this.activeAuthProvider.resetPassword();
    }

    async getEmailVerified() {
        return this.activeAuthProvider.getEmailVerified();
    }
}