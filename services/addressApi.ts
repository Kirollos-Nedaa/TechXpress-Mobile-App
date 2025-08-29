import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";

// Extract base URL from Expo config
const baseURL = Constants.expoConfig?.extra?.apiBaseUrl as string;

export const addressesApi = createApi({
  reducerPath: "addressesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}`,
    prepareHeaders: (headers, { getState }) => {
      // Assuming you store token in auth slice (state.auth.token)
      const token = (getState() as any).auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // GET /api/addresses
    getAddresses: builder.query<any[], void>({
      query: () => "addresses",
    }),

    // GET /api/addresses/{id}
    getAddress: builder.query<any, number>({
      query: (id) => `addresses/${id}`,
    }),

    // POST /api/addresses
    createAddress: builder.mutation<any, any>({
      query: (body) => ({
        url: "addresses",
        method: "POST",
        body,
      }),
    }),

    // PUT /api/addresses/{id}
    updateAddress: builder.mutation<any, { id: number; data: any }>({
      query: ({ id, data }) => ({
        url: `addresses/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    // DELETE
    deleteAddress: builder.mutation<any, number>({
      query: (id) => ({
        url: `addresses/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useGetAddressQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressesApi;
