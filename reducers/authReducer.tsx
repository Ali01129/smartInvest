import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  user: any | null;
  loading: boolean;
  error: string | null;
}

interface IPayload {
  token: string | null;
  user: any | null;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<IPayload>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.loading = false;
    },
    loginFailure(state, action: PayloadAction<string>) {
      console.log("Error in login failure: ", action.payload);
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
      state.user = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
