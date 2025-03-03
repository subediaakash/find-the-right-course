import { LoginUserSchema } from "../zod/userSignupSchema";
import axios from "axios";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  user: {
    email: string;
    name: string;
    token: string;
  };
}

async function loginUser(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  try {
    const validatedData = LoginUserSchema.parse(credentials);

    const response = await axios.post<LoginResponse>(
      "http://localhost:4000/api/auth/login",
      validatedData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "ZodError") {
        throw new Error((error as any).errors[0].message);
      }
      throw error;
    }
    throw new Error("An unknown error occurred");
  }
}

export { loginUser };
