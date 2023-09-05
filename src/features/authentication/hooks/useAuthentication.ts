import { useEffect, useState } from 'react';
import { AuthService } from '../services/AuthenticationService';

export const useAuthentication = (authProvider: AuthService) => {
  //TODO: IMPLEMENT ALL AUTH SERVICE METHODS HERE
  const [user, setUser] = useState<any | null>(null); // TODO: Replace 'any' with your user type
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await authProvider.getUser();
      setUser(userData);
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data when the hook is initialized
  }, [authProvider]);

  // const signInWithEmailAndPassword = async (email: string, password: string) => {
  //   // ... your signInWithEmailAndPassword implementation
  // };

  // const signInWithGoogle = async () => {
  //   // ... your signInWithGoogle implementation
  // };

  // const signOut = async () => {
  //   // ... your signOut implementation
  // };

  const useAuthHook = authProvider.useAuthHook ? authProvider.useAuthHook() : null;

  return {
    user,
    loading,
    error,
    // signInWithEmailAndPassword,
    // signInWithGoogle,
    // signOut,
    useAuthHook,
  };
};
