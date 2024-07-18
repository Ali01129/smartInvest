import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ColorPalette } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header";
import { router } from "expo-router";
import CustomSolidButton from "@/components/CustomSolidButton";
const Deposit = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Deposit" onPress={() => router.push("homeindex")} />
      <CustomSolidButton
        text={"Deposit".toUpperCase()}
        onPress={() => router.push("depositSuccessFull")}
        gradientColors={[ColorPalette.secondary, ColorPalette.primary]}
        textColor={ColorPalette.text}
      />
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
});
