import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorPalette } from "@/constants/Colors";
import SendCard from "@/components/SendCard";
import Header from "@/components/header";
import Send from "./send";
import { router } from "expo-router";
import CustomSolidButton from "@/components/CustomSolidButton";
import profile from "@/assets/pic/profile.png"


const SendConfirmation = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Confirmation" onPress={() => router.push("send")} />
      <SendCard title="From" address="0x4564848..656" image={profile}/>
      <SendCard title="To" address="0x4564848..656" image={profile}/>
      <Text style={styles.AmountText}>Amount :$300</Text>
      <View style={{ justifyContent: "center", alignContent: "flex-end" }}>
        <CustomSolidButton
          text={"Confirm".toUpperCase()}
          onPress={() => router.push("homeindex")}
          gradientColors={[ColorPalette.g2, ColorPalette.secondary]}
          textColor={ColorPalette.textBlack}
        />
      </View>
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
