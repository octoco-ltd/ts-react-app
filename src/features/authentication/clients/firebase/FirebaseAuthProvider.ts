import * as firebase from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { AuthStateHook, useAuthState } from 'react-firebase-hooks/auth';
import { env } from 'src/env';
import store from 'src/store/store';
import { IUserSlice } from 'src/store/user/userSlice.contracts';
import { AppAuthProvider } from '../../services/AuthenticationService';
import { persistAuth } from '../../services/persistAuth';
import { loginWithEmailAndPassword } from './actions/loginWithEmailAndPassword';
import { signInWithGoogle } from './actions/loginWithGoogle';
import { registerWithEmailAndPassword } from './actions/registerWithEmailAndPassword';
import firebaseConfig from './config/firebaseConfig';

export class FirebaseAuthProvider implements AppAuthProvider {
    private firebaseApp: firebase.FirebaseApp;
  
    constructor() {
        //initialize firebase
        this.firebaseApp = firebase.initializeApp(firebaseConfig[env.REACT_APP_DEPLOYMENT_ENV]);
    }

    async persistAuth(userAuth: any): Promise<void> {
        const userSlice: IUserSlice = {
            user: userAuth,
            status: 'authenticated',
            accessToken: await userAuth.getIdToken(),
            refreshToken: userAuth.refreshToken,
            error: null,
        }
        store.dispatch(persistAuth({userAuth: userSlice}))
        
    }

    useAuthHook(): AuthStateHook {
        const auth = getAuth()
        return useAuthState(auth);
    }
    
    async signInWithEmailAndPassword(email: string, password:string): Promise<void> {
        store.dispatch(loginWithEmailAndPassword({email: email, password: password}))
    }

    async signInWithGoogle(): Promise<void> {
        store.dispatch(signInWithGoogle({}))
    }

    async register(email: string, password:string): Promise<void> {
        store.dispatch(registerWithEmailAndPassword({email: email, password: password}));
    }

    resetPassword(): Promise<void> {
        throw new Error('Method not implemented.');
    }

    verifyEmail(): Promise<void> {
        throw new Error('Method not implemented.');
    }

    getEmailVerified(): boolean {
        return true; //TODO: Implement
    }

    signOut(): void {
        const auth = getAuth()
        signOut(auth);
        window.location.href = '/auth/login';
    }
    
    getUser(): Promise<any> {
        throw new Error('Method not implemented.');
    }
}