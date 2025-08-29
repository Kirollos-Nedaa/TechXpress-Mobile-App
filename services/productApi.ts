import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "baseURL" }),
  endpoints: (builder) => ({
    getProducts: builder.query<any[], void>({
      query: () => "/products",
    }),
    getProductById: builder.query<any, string>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
