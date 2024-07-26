import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { ColorPalette } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { Formik, FormikHelpers } from "formik";
import InputField from "@/components/inputField";
import * as Yup from "yup";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomSolidButton from "@/components/CustomSolidButton";
import axiosInstance from "@/utilities/axios";

interface FormValues {
  email: string;
}

const ForgetPassword: React.FC = () => {
  const initialValues: FormValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      const response = await axiosInstance.post("/auth/forget-password", values);
      console.log(response.data.packages);
      actions.resetForm();
      router.push("otp");
    } catch (error) {
      console.log(error);
    }
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
          <View
            style={{ flex: 1, width: "100%", justifyContent: "space-between" }}
          >
            <View>
              <View style={styles.header}>
                <TouchableOpacity
                  style={styles.box}
                  onPress={() => {
                    router.back();
                  }}
                >
                  <AntDesign name="left" size={26} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Forget Password</Text>
              </View>
              <InputField
                name="Email"
                placeholder="Enter your Email"
                onChangeText={handleChange("email")}
                onBlur={() => {
                  handleBlur("email");
                }}
                onFocus={() => console.log("Input focused")}
                value={values.email}
                icon={"email"}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>
            <CustomSolidButton
              text={"Forget Password"}
              onPress={() => handleSubmit()}
              textColor={ColorPalette.textBlack}
              gradientColors={[ColorPalette.g2, ColorPalette.secondary]}
            />
          </View>
        )}
      </Formik>
      <StatusBar backgroundColor={ColorPalette.background} style="light" />
    </KeyboardAwareScrollView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: ColorPalette.background,
    padding: 16,
    paddingBottom: 20,
    paddingTop: 80,
  },
  header: {
    alignSelf: "flex-start",
    flexDirection: "row",
    marginBottom: 50,
    alignItems: "center",
  },
  title: {
    marginLeft: 15,
    color: ColorPalette.text,
    fontSize: 25,
    fontWeight: "bold",
  },
  box: {
    borderWidth: 2,
    borderColor: "grey",
    padding: 10,
    borderRadius: 16,
    marginRight: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
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
    alignSelf: "flex-end",
  },
});
