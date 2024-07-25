import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorPalette } from "@/constants/Colors";
import SendCard from "@/components/SendCard";
import Header from "@/components/header";
import { router } from "expo-router";
import CustomSolidButton from "@/components/CustomSolidButton";
import Images from "@/constants/Images";
import axios from "axios";
import { StatusBar } from "expo-status-bar";

axios.interceptors.request.use(
  function (config) {
    config.headers["auth-token"] =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWY4ODkxYWNlNDM3NDViNzE1OTRmYSIsImlhdCI6MTcyMTg0NzEyNywiZXhwIjoxNzIxODUwNzI3fQ.lkLasApy3khyFmjiDjBw5kfl-BykLe8851qzAq87Etk";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const SendConfirmation = () => {
  const onSubmit = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.9:5000/transaction/send",
        {
          address: "66a08eb1ccf6e4f785bcdebc",
          amount: 300,
        }
      );
      if (response.status === 200) {
        Alert.alert("Success", "Transaction confirmed");
        router.push("homeindex");
      } else {
        Alert.alert("Error", "Something went wrong");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred");
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Confirmation" onPress={() => router.push("send")} />
      <SendCard title="From" address="0x4564848..656" image={Images.amongus} />
      <SendCard title="To" address="0x4564848..656" image={Images.amongus} />
      <Text style={styles.AmountText}>Amount :$300</Text>
      <View style={{ justifyContent: "center", alignContent: "flex-end" }}>
        <CustomSolidButton
          text={"Confirm"}
          onPress={onSubmit}
          gradientColors={[ColorPalette.g2, ColorPalette.secondary]}
          textColor={ColorPalette.textBlack}
        />
      </View>
      <StatusBar backgroundColor={ColorPalette.background} style="light" />
    </SafeAreaView>
  );
};

export default SendConfirmation;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: ColorPalette.background,
    padding: 16,
  },
  AmountText: {
    color: ColorPalette.text,
    marginTop: -15,
    marginBottom: 20,
    fontSize: 12,
    marginLeft: 5,
  },
});
