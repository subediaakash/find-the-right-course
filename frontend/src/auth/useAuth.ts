import { useAtom } from "jotai";
import {
  userAtom,
  isAuthenticatedAtom,
  isLoadingAtom,
  errorAtom,
  User,
} from "./atoms";
import { authService } from "./authService";

export const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [error, setError] = useAtom(errorAtom);

  const signIn = async (email: string, password: string): Promise<User> => {
    try {
      setIsLoading(true);
      setError(null);

      const userData = await authService.signIn(email, password);

      setUser(userData);
      setIsAuthenticated(true);

      return userData;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    name: string
  ): Promise<User> => {
    try {
      setIsLoading(true);
      setError(null);

      const userData = await authService.signUp(email, password, name);

      setUser(userData);
      setIsAuthenticated(true);

      return userData;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await authService.logout();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    signIn,
    signUp,
    logout,
  };
};
