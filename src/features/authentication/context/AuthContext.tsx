// AuthContext.tsx
import React, { createContext, useContext } from 'react';
import { AuthService } from '../services/AuthenticationService';

// Create the AuthContext
const AuthContext = createContext<AuthService | undefined>(undefined);

// Export the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
    authService: AuthService;
    children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ authService, children }) => {
    return <AuthContext.Provider value={authService}>{children}</AuthContext.Provider>;
};

export {AuthProvider, AuthContext};