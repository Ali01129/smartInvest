import { TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorPalette } from "../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import img from "../assets/pic/phone.png";

const Index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={img}
          style={{ width: 400, height: 500, resizeMode: "contain" }}
        />
      </View>
      <View style={{ width: "100%", justifyContent: "space-between", flex: 1 }}>
        <Text style={styles.text}>Your Personal crypto Wallet</Text>
        <TouchableOpacity
          style={styles.logInButton}
          onPress={() => {
            router.push("login");
          }}
        >
          <Text style={styles.logInText}>Get Started</Text>
          <AntDesign name="arrowright" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: ColorPalette.background,
    padding: 30,
  },
  text: {
    color: ColorPalette.text,
    fontSize: 30,
    fontWeight: "bold",
  },
  logInButton: {
    padding: 15,
    width: "100%",
    borderRadius: 16,
    backgroundColor: ColorPalette.secondary,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logInText: {
    color: ColorPalette.background,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
