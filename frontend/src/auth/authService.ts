import Cookies from "js-cookie";

interface User {
  name?: string;
  email: string;
  id?: string;
}

interface AuthResponse {
  message: string;
  data: {
    name: string;
    email: string;
    token: string;
  };
}

const TOKEN_COOKIE_NAME = "auth_token";
const COOKIE_OPTIONS = {
  expires: 7,
  path: "/",
  sameSite: "strict" as const,
};

export const getToken = (): string | undefined => {
  return Cookies.get(TOKEN_COOKIE_NAME);
};

export const setToken = (token: string): void => {
  Cookies.set(TOKEN_COOKIE_NAME, token, COOKIE_OPTIONS);
};

export const removeToken = (): void => {
  Cookies.remove(TOKEN_COOKIE_NAME, { path: "/" });
};

const API_URL = "http://localhost:3000/api/auth";

export const authService = {
  async signIn(email: string, password: string): Promise<User> {
    const response = await fetch(`${API_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to sign in");
    }

    const data = (await response.json()) as AuthResponse;

    setToken(data.data.token);

    return {
      name: data.data.name,
      email: data.data.email,
    };
  },

  async signUp(email: string, password: string, name: string): Promise<User> {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to sign up");
    }

    const data = (await response.json()) as AuthResponse;

    setToken(data.data.token);

    return {
      name: data.data.name,
      email: data.data.email,
    };
  },

  async logout(): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to logout");
      }

      removeToken();
    } catch (error) {
      removeToken();
      throw error;
    }
  },

  isAuthenticated(): boolean {
    return !!getToken();
  },
};
