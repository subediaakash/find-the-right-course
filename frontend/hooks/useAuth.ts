import { useAtom } from "jotai";
import {
  userAtom,
  authLoadingAtom,
  authErrorAtom,
} from "../src/atoms/authAtom";
import { loginUser } from "../src/servives/authService";
export function useAuth() {
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useAtom(authLoadingAtom);
  const [error, setError] = useAtom(authErrorAtom);

  async function login(credentials: { email: string; password: string }) {
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser(credentials);
      setUser(response.user);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  }

  // Check if user is logged in (from cookie)
  async function checkAuthStatus() {
    // You would implement a similar function to get current user
    // by checking cookies/session
  }

  // Logout function
  async function logout() {
    // Implement logout logic
    setUser(null);
  }

  return {
    user,
    loading,
    error,
    login,
    logout,
    checkAuthStatus,
    isAuthenticated: !!user,
  };
}
