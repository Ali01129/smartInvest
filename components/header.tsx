import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import { ColorPalette } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

interface PromptProps {
  title: string;
  onPress: () => void;
}

const Header: React.FC<PromptProps> = ({ title, onPress }) => {
  return (
    <View
      style={{
        alignSelf: "flex-start",
        flexDirection: "row",
        marginBottom: 16,
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={styles.box}
        onPress={() => {
          onPress();
        }}
      >
        <AntDesign name="left" size={26} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: 15,
    color: ColorPalette.text,
    fontSize: 35,
    fontWeight: "bold",
  },
  box: {
    borderWidth: 2,
    borderColor: "grey",
    padding: 10,
    borderRadius: 16,
    marginRight: 10,
  },
});

export default Header;

