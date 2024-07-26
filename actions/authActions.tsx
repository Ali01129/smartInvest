import { AppDispatch } from "../store/store";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout as logoutAction,
} from "../reducers/authReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "@/utilities/axios";

export const login = (email: string, password: string) => {
  console.log("in login");
  // thunk function to handle async actions using redux
  return async (dispatch: AppDispatch) => {
    // sets loading true
    dispatch(loginRequest());
    console.log("EMAIL", email);
    console.log("PASWORD", password);
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      console.log("response", response);
      if (response.status !== 200) {
        dispatch(loginFailure("Invalid credentials"));
      } else {
        const token = response.data.token;
        const user = JSON.stringify(response.data.user);

        const payload = {
          token,
          user,
          error: null,
        };

        // for setting state
        dispatch(loginSuccess(payload));
        // for setting token and user in AsyncStorage
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user", user);
      }
    } catch (error: any) {
      console.log("error", error);
      dispatch(loginFailure(error.message));
    }
  };
};

export const logout = () => {
  return async (dispatch: AppDispatch) => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    dispatch(logoutAction());
  };
};
