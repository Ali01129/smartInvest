import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorPalette } from "@/constants/Colors";
import Header from "@/components/header";
import { router } from "expo-router";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import InputField from "@/components/inputFieldSendCard";
import Images from "@/constants/Images";
import SendCard from "@/components/SendCard";
import CustomSolidButton from "@/components/CustomSolidButton";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const validationSchema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  amount: Yup.string().required("Amount is required"),
});


const Send = () => {
  const handleSubmit = (
    values: { address: string; amount: string },
    actions: FormikHelpers<{ address: string; amount: string }>
  ) => {
    console.log(values);
    actions.resetForm();
    router.push("/SendConfirmation");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Send" onPress={() => router.push("homeindex")} />
      <SendCard title="From" address="0x4564879848..7878" image={Images.amongus} />
      <Formik
        initialValues={{ address: "", amount: "" }}
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
          <KeyboardAwareScrollView style={{ width: "100%" }}>
            <InputField
              name="Address"
              placeholder="Enter recipient's address"
              onChangeText={handleChange("address")}
              onBlur={() => handleBlur("address")}
              onFocus={() => console.log("Input focused")}
              value={values.address}
              icon={"person"}
            />
            {touched.address && errors.address && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.address}
              </Text>
            )}

            <InputField
              name="Amount"
              placeholder="Enter amount"
              onChangeText={handleChange("amount")}
              onBlur={() => handleBlur("amount")}
              onFocus={() => console.log("Input focused")}
              value={values.amount.toString()}
              icon={"dollar"}
              keyType="numeric"
            />
            {touched.amount && errors.amount && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.amount}
              </Text>
            )}

            <View
              style={{
                justifyContent: "center",
                alignContent: "flex-end",
              }}
            >
              <CustomSolidButton
                text={"Send".toUpperCase()}
                onPress={() => handleSubmit()}
                gradientColors={[ColorPalette.g2, ColorPalette.secondary]}
                textColor={ColorPalette.textBlack}
              />
            </View>
          </KeyboardAwareScrollView>
        )}
      </Formik>
      <StatusBar backgroundColor={ColorPalette.background} style="light" />
    </SafeAreaView>
  );
};

export default Send;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: ColorPalette.background,
    padding: 16,
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
