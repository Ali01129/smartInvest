import { ColorPalette } from "@/constants/Colors";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

interface NumpadProps {
  onPress: (button: string) => void;
}

const Numpad: React.FC<NumpadProps> = ({ onPress }) => {
  const buttons = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    [".", "0", "<"],
  ];

  return (
    <View style={styles.container}>
      {buttons.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((button) => (
            <TouchableOpacity
              key={button}
              style={styles.button}
              onPress={() => onPress(button)}
            >
              <Text style={styles.buttonText}>{button}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPalette.background,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    margin: 5,
    padding: 20,

    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 24,
    color: ColorPalette.text,
    fontWeight: "bold",
  },
});

export default Numpad;
