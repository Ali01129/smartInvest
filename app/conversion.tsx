import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorPalette } from "@/constants/Colors";
import React, { useState } from "react";
import Numpad from "@/components/numpad";
import CustomSolidButton from "@/components/CustomSolidButton";
import Header from "@/components/header";
import { router } from "expo-router";
import ConversionInputField from "@/components/conversionInputField";
import SwapButton from "@/components/swapButton";

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
    setCoinValue("");
    setDollarValue("");
    if (isFirstField) {
      setIsFirstFocused(true);
      setIsSecondFocused(false);
    } else {
      setIsSecondFocused(true);
      setIsFirstFocused(false);
    }
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
  const fieldPromptValues = {
    icon: isFirstDollar ? "dollar-sign" : "coins",
    placeholder: isFirstDollar ? "Enter dollar amount" : "Enter coin amount",
    onChangeText: isFirstDollar ? setDollarValue : setCoinValue,
    value: calculateValue(isFirstDollar),
    focused: isFirstFocused,
    onFocus: () => handleInputFocus(true),
  };

  const fieldPromptValues2 = {
    icon: isFirstDollar ? "coins" : "dollar-sign",
    placeholder: isFirstDollar ? "Enter coin amount" : "Enter dollar amount",
    onChangeText: isFirstDollar ? setCoinValue : setDollarValue,
    value: calculateValue(!isFirstDollar),
    focused: isSecondFocused,
    onFocus: () => handleInputFocus(false),
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, marginBottom: 16 }}>
        <Header
          title="Convert"
          onPress={() => {
            router.replace("homeindex");
          }}
        />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ConversionInputField
            icon={fieldPromptValues.icon}
            placeholder={fieldPromptValues.placeholder}
            onChangeText={(text) => fieldPromptValues.onChangeText(text)}
            value={fieldPromptValues.value}
            onFocus={fieldPromptValues.onFocus}
            focused={fieldPromptValues.focused}
          />
          <SwapButton onPress={() => setIsFirstDollar(!isFirstDollar)} />
          <ConversionInputField
            icon={fieldPromptValues2.icon}
            placeholder={fieldPromptValues2.placeholder}
            onChangeText={(text) => fieldPromptValues2.onChangeText(text)}
            value={fieldPromptValues2.value}
            onFocus={fieldPromptValues2.onFocus}
            focused={fieldPromptValues2.focused}
          />
        </View>

        <Numpad onPress={handleNumpadPress} />

        <CustomSolidButton
          gradientColors={[ColorPalette.g2, ColorPalette.secondary]}
          text={"Convert"}
          textColor={ColorPalette.background}
          onPress={() => {}}
        />
      </View>
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
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Conversion;
