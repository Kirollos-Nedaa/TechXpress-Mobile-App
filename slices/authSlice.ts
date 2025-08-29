import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth: string;
  gender: string;
  emailConfirmed: boolean;
}

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; refreshToken: string }>
    ) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearCredentials: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
    },
  },
});

export const { setCredentials, setUser, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
