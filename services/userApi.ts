import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Response model for user profile
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  emailConfirmed: boolean;
  wishlistCount: number;
  cartCount: number;
}

// Request model for updating user
interface UpdateUserRequest {
  name?: string;
  phoneNumber?: string;
  gender?: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://techxpress.runasp.net/api/users", // 👈 usersController
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // ✅ Get profile
    getProfile: builder.query<UserProfile, void>({
      query: () => "/profile",
    }),

    // ✅ Update profile
    updateProfile: builder.mutation<{ message: string }, UpdateUserRequest>({
      query: (data) => ({
        url: "/profile",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = userApi;
