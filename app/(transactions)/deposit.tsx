import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ColorPalette } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header";
import { router } from "expo-router";
import CustomSolidButton from "@/components/CustomSolidButton";
import { SendCard2 } from "@/components/SendCard";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import InputField from "@/components/inputFieldSendCard";
import Images from "@/constants/Images";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axiosInstance from "@/utilities/axios";

interface FormValues {
  amount: number;
  selectedCard: boolean;
}

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .required("Amount is required")
    .min(1, "Amount must be greater than zero"),
  selectedCard: Yup.boolean().oneOf([true], "Payment method is required"),
});

const Deposit: React.FC = () =>  {
  const initialValues: FormValues = {
    amount: 0,
    selectedCard: false,
  };
  const [selectedCard, setSelectedCard] = useState(false);
  
  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    console.log(values);
    try {
      const response = await axiosInstance.put("/transaction/deposit", { amount: +values.amount });
      console.log("Hello ",response.data.wallet);
      actions.resetForm();
      router.push("/depositSuccessFull");
    } catch (error) {
      console.log(error);
    }
};

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Deposit" onPress={() => router.push("home")} />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <>
            <SendCard2
              BoxName="Payment Method"
              imageNoStyle={Images.stripe}
              onPress={() => {
                setSelectedCard(!selectedCard);
                setFieldValue("selectedCard", !selectedCard);
              }}
              selected={selectedCard}
            />
            {touched.selectedCard && errors.selectedCard && (
              <Text style={{ color: "red", marginBottom: 5 }}>
                {errors.selectedCard}
              </Text>
            )}

            <KeyboardAwareScrollView style={{ width: "100%" }}>
              <InputField
                name="Amount"
                placeholder="Enter amount"
                onChangeText={handleChange("amount")}
                onBlur={() => handleBlur("amount")}
                onFocus={() => console.log("Input focused")}
                value={values.amount}
                icon={"dollar"}
                keyType="numeric"
              />
              {touched.amount && errors.amount && (
                <Text style={{ color: "red", marginBottom: 5 }}>
                  {errors.amount}
                </Text>
              )}

              <View style={styles.buttonWrapper}>
                <CustomSolidButton
                  text={"Deposit"}
                  onPress={() => handleSubmit()}
                  gradientColors={[ColorPalette.g2, ColorPalette.secondary]}
                  textColor={ColorPalette.textBlack}
                />
              </View>
            </KeyboardAwareScrollView>
          </>
        )}
      </Formik>
      <StatusBar backgroundColor={ColorPalette.background} style="light" />
    </SafeAreaView>
  );
};

export default Deposit;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: ColorPalette.background,
    padding: 16,
  },
  buttonWrapper: {
    justifyContent: "center",
    alignContent: "flex-end",
    marginTop: 20,
  },
});
