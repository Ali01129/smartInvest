import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorPalette } from "@/constants/Colors";
import React, { useCallback, useState } from "react";
import Numpad from "@/components/numpad";
import CustomSolidButton from "@/components/CustomSolidButton";
import Header from "@/components/header";
import { router } from "expo-router";
import ConversionInputField from "@/components/conversionInputField";
import SwapButton from "@/components/swapButton";
import { StatusBar } from "expo-status-bar";

const Conversion = () => {
  const [dollarValue, setDollarValue] = useState<string>("");
  const [coinValue, setCoinValue] = useState<string>("");
  const [isFirstDollar, setIsFirstDollar] = useState<boolean>(true);
  const [isFirstFocused, setIsFirstFocused] = useState<boolean>(false);
  const [isSecondFocused, setIsSecondFocused] = useState<boolean>(false);
  const dollarToCoinRate = 0.22;
  const coinToDollar = 22;

  const handleNumpadPress = (button: string) => {
    if (isFirstFocused && isFirstDollar) {
      if (button === "<") {
        setDollarValue(dollarValue.slice(0, -1));
      } else {
        setDollarValue(dollarValue + button);
      }
    } else if (isFirstFocused && !isFirstDollar) {
      if (button === "<") {
        setCoinValue(coinValue.slice(0, -1));
      } else {
        setCoinValue(coinValue + button);
      }
    } else if (isSecondFocused && isFirstDollar) {
      if (button === "<") {
        setCoinValue(coinValue.slice(0, -1));
      } else {
        setCoinValue(coinValue + button);
      }
    } else if (isSecondFocused && !isFirstDollar) {
      if (button === "<") {
        setDollarValue(dollarValue.slice(0, -1));
      } else {
        setDollarValue(dollarValue + button);
      }
    }
  };

  // to handle focus on input fields
  const handleInputFocus = (isFirstField: boolean) => {
    // to handle dynamic conversion
    setCoinValue("");
    setDollarValue("");

    setIsFirstFocused(isFirstField);
    setIsSecondFocused(!isFirstField);
  };

  // to convert dynamically
  const calculateValue = (bool: boolean): string => {
    if (bool) {
      if (coinValue) {
        console.log(coinValue);
        return (+coinValue * coinToDollar).toString();
      } else {
        return dollarValue;
      }
    } else {
      if (dollarValue) {
        return (+dollarValue * dollarToCoinRate).toString();
      } else {
        return coinValue;
      }
    }
  };

  // setting field values dynamically
  const createFieldProps = useCallback(
    (isFirst: boolean) => ({
      icon: isFirstDollar === isFirst ? "dollar-sign" : "coins",
      placeholder:
        isFirstDollar === isFirst ? "Enter dollar amount" : "Enter coin amount",
      onChangeText: isFirstDollar === isFirst ? setDollarValue : setCoinValue,
      value: calculateValue(isFirstDollar === isFirst),
      focused: isFirst ? isFirstFocused : isSecondFocused,
      onFocus: () => handleInputFocus(isFirst),
    }),
    [isFirstDollar, isFirstFocused, isSecondFocused, calculateValue]
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Convert"
        onPress={() => {
          router.replace("home");
        }}
      />
      <View style={styles.formBox}>
        <ConversionInputField {...createFieldProps(true)} />
        <SwapButton onPress={() => setIsFirstDollar(!isFirstDollar)} />
        <ConversionInputField {...createFieldProps(false)} />
      </View>

      <Numpad onPress={handleNumpadPress} />

      <CustomSolidButton
        gradientColors={[ColorPalette.g2, ColorPalette.secondary]}
        text={"Convert"}
        textColor={ColorPalette.background}
        onPress={() => { }}
      />
      <StatusBar backgroundColor={ColorPalette.background} style="light" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: ColorPalette.text,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 16,
  },
  container: {
    flex: 1,
    backgroundColor: ColorPalette.background,
    padding: 16,
    paddingBottom: 16,
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formBox: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export default Conversion;
