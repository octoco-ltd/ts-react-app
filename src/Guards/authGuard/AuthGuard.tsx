import { Suspense, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useAuth } from 'src/features/authentication/context/AuthContext';
import { useAppSelector } from 'src/hooks/hooks';
import store from 'src/store/store';
import { IUserSlice } from 'src/store/user/userSlice.contracts';
import { NetworkStatusEnums } from 'src/utils/enums/networkSTatusEnums';

export default function AuthGuard({ children }: { children: JSX.Element }) {
    const userSlice: IUserSlice = useAppSelector((state) => state.user);
    const location = useLocation();
    const isLoading = NetworkStatusEnums.LOADING === userSlice.status
    const isAuthenticated = NetworkStatusEnums.SUCCESS === userSlice.status;
    const authService = useAuth()
    const authHook = authService.useAuthHook()
    const [user, loading, error] = authHook && authHook()

    useEffect(() => {
        const prep = async () => {
            try {
                store.dispatch(authService.persistAuth(user))
            } catch (error) {
                toast.error(
                    'There has been an error getting authentication details. Please try logging in',
                );
            }
        };
        if (!loading && user) {
            prep();
        }
        if (error) {
            toast.error(
                'There has been an error getting authentication details. Please try logging in',
            );
        }
    }, [user, loading, error]);
   

    if(isLoading || loading){
        return <Suspense fallback={<SuspenseLoader/>}>
          <SuspenseLoader message='Getting User...'/>
        </Suspense>
    }

    if (!isAuthenticated && !user && !isLoading && !loading) {
        // Redirect users to the login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        if(!userSlice || !userSlice?.user){
            return (<Navigate to='/auth/login' state = {{ from: location }} replace />);
        }
    }

    if ((!isLoading || !loading) && !authService.getEmailVerified()) {
        return (<Navigate to='/status/unverified' state = {{ from: location }} replace />);
    }



    return children;
};