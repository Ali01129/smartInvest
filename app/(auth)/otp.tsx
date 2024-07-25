import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Formik, FormikHelpers } from "formik";
import InputField from "@/components/inputField";
import * as Yup from "yup";
import { LinearGradient } from "expo-linear-gradient";
import { ColorPalette } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import CustomSolidButton from "@/components/CustomSolidButton";

interface FormValues {
  otp: string;
}

const Otp: React.FC = () => {
  const initialValues: FormValues = {
    otp: "",
  };

  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .length(6, "OTP must be 6 digits")
      .required("OTP is required"),
  });

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    console.log(values);
    actions.resetForm();
    router.push("/homeindex");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
                  onPress={() => router.back()}
                >
                  <AntDesign name="left" size={26} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Verification</Text>
              </View>
              <InputField
                name="OTP"
                placeholder="Enter 6-digit OTP"
                onChangeText={handleChange("otp")}
                onBlur={() => handleBlur("otp")} // Directly pass field name
                onFocus={() => console.log("Input focused")}
                value={values.otp}
                icon="key"
              />
              {touched.otp && errors.otp && (
                <Text style={styles.errorText}>{errors.otp}</Text>
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
    </ScrollView>
  );
};

export default Otp;

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
