import * as firebase from 'firebase/app';
import { User, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { AuthStateHook, useAuthState } from 'react-firebase-hooks/auth';
import store from 'src/store/store';
import { IUserSlice } from 'src/store/user/userSlice.contracts';
import { persistAuth } from '../../services/persistAuth';
import { loginWithEmailAndPassword } from './actions/loginWithEmailAndPassword';
import { signInWithGoogle } from './actions/loginWithGoogle';
import { registerWithEmailAndPassword } from './actions/registerWithEmailAndPassword';
import firebaseConfig from './config/firebaseConfig';
import { AppAuthProvider } from '../../services/AuthenticationServiceInterface';

export class FirebaseAuthProvider implements AppAuthProvider {
    private firebaseApp: firebase.FirebaseApp;

    constructor() {
        //initialize firebase
        this.firebaseApp = firebase.initializeApp(firebaseConfig.config);
    }

    //############################ PERSIST AUTH ############################
    async persistAuth(userAuth: User): Promise<void> {
        const userSlice: IUserSlice = {
            user: userAuth,
            status: 'authenticated',
            accessToken: await userAuth.getIdToken(),
            refreshToken: userAuth.refreshToken,
            error: null,
        }
        store.dispatch(persistAuth({ userAuth: userSlice }))
    }

    //############################ REFRESH TOKEN ############################
    async refreshToken(): Promise<{ accessToken: string; refreshToken: string; } | null> {
        try {
            const auth = getAuth()
            const newAccessToken = await auth.currentUser?.getIdToken(/*force refresh*/ true);
            const newRefreshToken = auth.currentUser?.refreshToken;
            if (newAccessToken && newRefreshToken) {
                const userSlice: IUserSlice = {
                    user: auth.currentUser,
                    status: 'authenticated',
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken,
                    error: null,
                }
                store.dispatch(persistAuth({ userAuth: userSlice }))
                return { accessToken: newAccessToken, refreshToken: newRefreshToken }
            } else {
                throw new Error('Refresh Token Error');
            }
        } catch (error) {
            this.signOut()
            return null;
        }
    }

    //############################ SIGN IN ################################
    async signInWithEmailAndPassword(email: string, password: string): Promise<void> {
        store.dispatch(loginWithEmailAndPassword({ email: email, password: password }))
    }

    //############################ SIGN IN GOOGLE ##########################
    async signInWithGoogle(): Promise<void> {
        store.dispatch(signInWithGoogle({}))
    }

    //############################ GET USER ################################
    async getUser(): Promise<any> {
        const auth = getAuth()
        return new Promise((resolve, reject) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    resolve(user);
                } else {
                    reject(null);
                }
            });
        });
    }

    //############################ LOG OUT #################################
    signOut(): void {
        const auth = getAuth()
        signOut(auth);
        window.location.href = '/auth/login';
    }

    //############################ REGISTER #################################
    async register(email: string, password: string): Promise<void> {
        store.dispatch(registerWithEmailAndPassword({ email: email, password: password }));
    }

    //############################ RESET PASS ###############################
    resetPassword(): Promise<void> {
        throw new Error('Method not implemented.');
    }

    //############################ VERIFY EMAIL #############################
    verifyEmail(): Promise<void> {
        throw new Error('Method not implemented.');
    }

    //############################ GET VERIFY EMAIL #########################
    getEmailVerified(): boolean {
        return true; //TODO: Implement
    }

    //############################ AUTH HOOK ################################
    useAuthHook(): AuthStateHook {
        const auth = getAuth()
        return useAuthState(auth);
    }
}