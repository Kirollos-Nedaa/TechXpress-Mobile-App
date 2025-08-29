import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  refreshToken: string;
}

interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: Date;
}

interface RegisterResponse {
  userId: string;
  message: string;
}

interface RefreshTokenRequest {
  token: string;
  refreshToken: string;
}

interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

interface VerifyCodeRequest {
  userId: string;
  code: string;
}

interface ResendCodeRequest {
  userId: string;
}

interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

interface LogoutRequest {
  refreshToken?: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: Constants.expoConfig?.extra?.apiBaseUrl as string,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // ✅ Login
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // ✅ Google login
    googleLogin: builder.mutation<any, { idToken: string }>({
      query: (body) => ({
        url: "auth/google-login",
        method: "POST",
        body,
      }),
    }),

    // ✅ Register
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (newUser) => ({
        url: "auth/register",
        method: "POST",
        body: newUser,
      }),
    }),

    // ✅ Verify email code
    verifyCode: builder.mutation<any, VerifyCodeRequest>({
      query: (body) => ({
        url: "auth/verify-code",
        method: "POST",
        body,
      }),
    }),

    // ✅ Resend code
    resendCode: builder.mutation<any, ResendCodeRequest>({
      query: (body) => ({
        url: "auth/resend-code",
        method: "POST",
        body,
      }),
    }),

    // ✅ Refresh token
    refreshToken: builder.mutation<RefreshTokenResponse, RefreshTokenRequest>({
      query: (body) => ({
        url: "auth/refresh-token",
        method: "POST",
        body,
      }),
    }),

    // ✅ Change password
    changePassword: builder.mutation<any, ChangePasswordRequest>({
      query: (body) => ({
        url: "auth/change-password",
        method: "POST",
        body,
      }),
    }),

    // ✅ Logout
    logout: builder.mutation<any, LogoutRequest>({
      query: (body) => ({
        url: "auth/logout",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGoogleLoginMutation,
  useRegisterMutation,
  useVerifyCodeMutation,
  useResendCodeMutation,
  useRefreshTokenMutation,
  useChangePasswordMutation,
  useLogoutMutation,
} = authApi;
