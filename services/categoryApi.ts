import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "baseURL" }),
  endpoints: (builder) => ({
    getCategories: builder.query<any[], void>({
      query: () => "/categories",
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
