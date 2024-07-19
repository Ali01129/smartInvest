import { StyleSheet, Text, TextInput, View,TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorPalette } from "@/constants/Colors";
import Header from "@/components/header";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SendCard2 } from "@/components/SendCard";
import Images from "@/constants/Images";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import InputField from "@/components/inputFieldSendCard";
import CustomSolidButton from "@/components/CustomSolidButton";

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  amount: Yup.string()
    .required("Amount is required")
    .min(1, "Amount must be greater than zero"),
  selectedCard: Yup.boolean().oneOf([true], "Payment method is required"),
});

const WithDraw = () => {
  const [selectedCard, setSelectedCard] = useState(false);

  const handleSubmit = (
    values: { amount: string; selectedCard: boolean },
    actions: FormikHelpers<{ amount: string; selectedCard: boolean }>
  ) => {
    console.log(values);
    actions.resetForm();
    router.push("/withdrawSuccessFull"); // Update this route as needed
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Withdraw" onPress={() => router.push("homeindex")} />

      <Formik
        initialValues={{ amount: "", selectedCard: false }}
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
            <Text style={styles.Text}> Amount</Text>
            <TextInput
              placeholder="Enter Amount"
              placeholderTextColor={ColorPalette.textGrey}
              style={styles.InputField}
              onChangeText={handleChange("amount")}
              onBlur={() => handleBlur("amount")}
              value={values.amount}
            />
            {touched.amount && errors.amount && (
              <Text style={{ color: "red", marginBottom: 5 }}>
                {errors.amount}
              </Text>
            )}

            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{
                  color: ColorPalette.text,
                  fontSize: 20,
                  fontWeight: "500",
                }}
              >
                $480.00
              </Text>
              <Text style={{ color: ColorPalette.text }}>
                AVAILABLE BALANCE
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 90,
              }}
            >
              <MaterialCommunityIcons
                name="cash-plus"
                size={26}
                color={ColorPalette.secondary}
              />
              <Text style={{ color: ColorPalette.text, marginLeft: 10 }}>
                Withdraw Money To
              </Text>
              
              <TouchableOpacity>

              <View
                style={{
                  backgroundColor: ColorPalette.secondary,
                  borderRadius: 5,
                  padding: 3.8,
                }}
              >
                <Text>+ Add Beneficiary</Text>
              </View>
              </TouchableOpacity>
            </View>

            {/* Add SendCard2 here */}
            <View style={{marginTop:16}}>
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
            </View>

            <View style={styles.buttonWrapper}>
              <CustomSolidButton
                text={"Withdraw".toUpperCase()}
                onPress={() => handleSubmit()}
                gradientColors={[ColorPalette.g2, ColorPalette.secondary]}
                textColor={ColorPalette.textBlack}
              />
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default WithDraw;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: ColorPalette.background,
    padding: 16,
  },
  Text: {
    marginTop: 70,
    color: ColorPalette.textGrey,
    alignSelf: "center",
  },
  InputField: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 40,
    color: ColorPalette.text,
    textAlign: "center",
    marginBottom: 40,
  },
  buttonWrapper: {
    justifyContent: "center",
    alignContent: "flex-end",
    marginTop: 20,
  },
});
