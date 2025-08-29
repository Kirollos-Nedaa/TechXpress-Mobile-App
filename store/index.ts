// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/services/authApi";
import { userApi } from "@/services/userApi";
import { productApi } from "@/services/productApi";
import { categoryApi } from "@/services/categoryApi";
import { addressesApi } from "@/services/addressApi";
import authReducer from "@/slices/authSlice";

export const store = configureStore({
  reducer: {
    // ✅ APIs
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [addressesApi.reducerPath]: addressesApi.reducer,

    // ✅ App state
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      productApi.middleware,
      categoryApi.middleware,
      addressesApi.middleware
    ),
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
