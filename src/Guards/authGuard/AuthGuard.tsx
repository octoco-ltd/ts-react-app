import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { getAuthStorage } from 'src/features/authentication/services/setAuthStorage';
import { NetworkStatusEnums } from 'src/helpers/authHelper';
import { IUserSlice } from 'src/store/user/userSlice.contracts';

export default function AuthGuard({ children }: { children: JSX.Element }) {
    const user: IUserSlice = useSelector((state: IUserSlice) => state.user);
    const location = useLocation();
    const isLoading = NetworkStatusEnums.LOADING === user.status
    const isAuthenticated = NetworkStatusEnums.SUCCESS === user.status;

    const auth: string | null = getAuthStorage();
    const authSlice: IUserSlice | null = auth ? JSON.parse(auth) : null

    if(isLoading){
        return <Suspense fallback={<SuspenseLoader/>}>
            {children}
        </Suspense>
    }

    if (!isAuthenticated) {
        console.log(authSlice)
        // Redirect users to the login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        if(!authSlice || !authSlice?.user){
            return (<Navigate to='/auth/login' state = {{ from: location }} replace />);
        }
        
    }

    if (!isLoading && !user.user?.emailVerified) {
        if(auth === null){
            return (<Navigate to='/status/unverified' state = {{ from: location }} replace />);
        }
    }



    return children;
};