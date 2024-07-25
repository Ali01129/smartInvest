import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native"; // Import ScrollView
import React, { useState } from "react";
import { router } from "expo-router";
import { Fontisto } from "@expo/vector-icons";
import { ColorPalette } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { Formik, FormikHelpers } from "formik";

import InputField from "@/components/inputField";
import * as Yup from "yup";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import { login } from "@/actions/authActions";
import { AppDispatch, RootState } from "@/store/store";
import CustomSolidButton from "@/components/CustomSolidButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StatusBar } from "expo-status-bar";

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = (email: string, password: string) => {
    console.log("in handle login");
    dispatch(login(email, password))
      .then(() => {
        console.log("loading", loading);
        console.log("error", error);
        if (!loading && !error) {
          console.log("Login successful");
          // actions.resetForm();
          router.push("/home");
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    // console.log(values);
    handleLogin(values.email, values.password);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={{ width: "100%" }}>
            <View
              style={{
                alignSelf: "flex-start",
                flexDirection: "row",
                marginBottom: 50,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={styles.box}
                onPress={() => {
                  router.back();
                }}
              >
                <AntDesign name="left" size={26} color="white" />
              </TouchableOpacity>
              <Text style={styles.title}>Login</Text>
            </View>

            <InputField
              name="Email"
              placeholder="Enter your Email"
              onChangeText={handleChange("email")}
              onBlur={() => handleBlur("email")}
              onFocus={() => console.log("Input focused")}
              value={values.email}
              icon={"email"}
            />

            {touched.email && errors.email && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.email}
              </Text>
            )}
            <InputField
              name="Password"
              placeholder="Enter your Password"
              onChangeText={handleChange("password")}
              onBlur={() => handleBlur("password")}
              onFocus={() => console.log("Input focused")}
              value={values.password}
              icon={"locked"}
            />
            {touched.password && errors.password && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.password}
              </Text>
            )}

            <View>
              <Text
                style={{
                  color: "white",
                  alignSelf: "flex-end",
                  marginBottom: 20,
                }}
                onPress={() => {
                  router.push("forgetPassword");
                }}
              >
                Forgot Password?
              </Text>
            </View>
            <CustomSolidButton
              gradientColors={[ColorPalette.g2, ColorPalette.secondary]}
              text={loading ? "Loading..." : "Login"}
              textColor={ColorPalette.textBlack}
              onPress={() => handleSubmit()}
            />
            {/* if  there is any error */}
            {error && <Text style={{ color: "red" }}>{error}</Text>}
            <View>
              <Text
                style={{ color: "white", alignSelf: "center", marginTop: 20 }}
              >
                Don't have an account?
                <Text
                  style={{ color: ColorPalette.secondary }}
                  onPress={() => {
                    router.replace("signup");
                  }}
                >
                  {" "}
                  Sign Up
                </Text>
              </Text>
            </View>
          </View>
        )}
      </Formik>
      <StatusBar backgroundColor={ColorPalette.background} style="light" />
    </KeyboardAwareScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: ColorPalette.background,
    padding: 16,
    paddingTop: 80,
  },
  title: {
    marginLeft: 15,
    color: ColorPalette.text,
    fontSize: 30,
    fontWeight: "bold",
  },
  box: {
    borderWidth: 2,
    borderColor: "grey",
    padding: 10,
    borderRadius: 16,
    marginRight: 10,
  },
  logInText: {
    color: ColorPalette.background,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  gradient: {
    borderRadius: 16,
    marginTop: 10,
    padding: 15,
    width: "100%",
    backgroundColor: ColorPalette.secondary,
  },
});
