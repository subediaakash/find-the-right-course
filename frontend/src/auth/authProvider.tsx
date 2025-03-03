import React, { useEffect } from "react";
import { useAtom } from "jotai";
import {
  userAtom,
  isAuthenticatedAtom,
  isLoadingAtom,
  errorAtom,
  User,
} from "./atoms";
import { getToken } from "./authService";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  userId: string;
  email: string;
  name: string;
  exp: number;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [, setUser] = useAtom(userAtom);
  const [, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [, setError] = useAtom(errorAtom);

  useEffect(() => {
    const initializeAuth = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const token = getToken();

        if (!token) {
          setUser(null);
          setIsAuthenticated(false);
          return;
        }

        try {
          const decoded = jwtDecode<JwtPayload>(token);
          const currentTime = Date.now() / 1000;

          if (decoded.exp < currentTime) {
            setUser(null);
            setIsAuthenticated(false);
            return;
          }

          const userData: User = {
            id: decoded.userId,
            email: decoded.email,
            name: decoded.name,
          };

          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Token decoding error:", error);
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [setUser, setIsAuthenticated, setIsLoading, setError]);

  return <>{!isLoading && children}</>;
};
