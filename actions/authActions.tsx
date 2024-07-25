import { AppDispatch } from "../store/store";
import axios from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout as logoutAction,
} from "../reducers/authReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = (email: string, password: string) => {
  console.log("in login");
  // thunk function to handle async actions using redux
  return async (dispatch: AppDispatch) => {
    // sets loading true
    dispatch(loginRequest());
    console.log("EMAIL", email);
    console.log("PASWORD", password);
    try {
      const response = await axios.post(
        "http://192.168.7.121:5000/auth/login",
        {
          email,
          password,
        }
      );
      console.log("response", response);
      const token = response.data.token;
      // const user = response.data.user;
      console.log("token", token);
      // console.log("user", user);
      const payload = {
        token,
        user: null,
        error: null,
      };

      // for setting state
      dispatch(loginSuccess(payload));
      // for setting token and user in AsyncStorage
      await AsyncStorage.setItem("token", token);
      // await AsyncStorage.setItem("user", user);
    } catch (error: any) {
      console.log("error", error);
      dispatch(loginFailure(error.message));
    }
  };
};

export const logout = () => {
  return async (dispatch: AppDispatch) => {
    await AsyncStorage.removeItem("userToken");
    dispatch(logoutAction());
  };
};
