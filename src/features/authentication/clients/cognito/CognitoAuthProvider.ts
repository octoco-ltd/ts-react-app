import { CognitoUserSession } from 'amazon-cognito-identity-js';
import store from 'src/store/store';
import { IUserSlice } from 'src/store/user/userSlice.contracts';
import { persistAuth } from '../../services/persistAuth';
import { _getCognitoPool } from './actions/_getCognitoPool';
import { _getCurrentUser } from './actions/_getCurrentUser';
import { _getCognitoUserSession } from './actions/_getSession';
import { loginWithEmailAndPassword } from './actions/loginWithEmailAndPassword';
import refreshAccessToken from './actions/refreshToken';
import { AppAuthProvider } from '../../services/AuthenticationServiceInterface';

export class CognitoAuthProvider implements AppAuthProvider {
    private userPool: any;

    constructor() {
        this.userPool = _getCognitoPool();
    }

    //############################ PERSIST AUTH ############################
    async persistAuth(userAuth: any): Promise<void> {
        const userSlice: IUserSlice = {
            user: userAuth.idToken.payload,
            status: 'authenticated',
            accessToken: userAuth.accessToken.jwtToken,
            refreshToken: userAuth.refreshToken.token,
            error: null,
        }
        store.dispatch(persistAuth({ userAuth: userSlice }))
    }

    //############################ REFRESH TOKEN ############################
    async refreshToken(): Promise<{ accessToken: string; refreshToken: string; } | null> {
        try {
            const refreshData = await refreshAccessToken();
            const userSlice: IUserSlice = {
                ...store.getState().user,
                ...refreshData
            }
            await store.dispatch(persistAuth({ userAuth: userSlice }))
            return refreshData
        } catch (error) {
            console.log(error)
            this.signOut()
            return null;
        }
    }

    //############################ SIGN IN ################################
    async signInWithEmailAndPassword(email: string, password: string): Promise<void> {
        store.dispatch(loginWithEmailAndPassword({ email: email, password: password }))
    }

    //############################ SIGN IN GOOGLE ##########################
    signInWithGoogle(): Promise<void> {
        throw new Error('Method not implemented.');
    }

    //############################ GET USER ################################
    async getUser(): Promise<CognitoUserSession> {
        return await _getCognitoUserSession()
    }

    //############################ LOG OUT #################################
    signOut(): void {
        _getCurrentUser()?.signOut()
        window.location.href = '/auth/login';
    }

    //############################ REGISTER #################################
    register(): Promise<void> {
        throw new Error('Method not implemented.');
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
    useAuthHook?() {
        //cognito does not have a custom sdk with a hook
        throw new Error('Method not implemented.');
    }
}