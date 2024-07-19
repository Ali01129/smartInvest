import React from "react";
import { View, Text, StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from "react-native";
import { ColorPalette } from "@/constants/Colors";

interface SendCardProps {
  title?: string;
  address?: string;
  image?: ImageSourcePropType;
  imageNoStyle?: ImageSourcePropType;
  BoxName?: string;
  onPress?: () => void;
  selected?: boolean;
}

export const SendCard: React.FC<SendCardProps> = ({ title, address, image, BoxName, imageNoStyle }) => {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ justifyContent: "flex-start", flexDirection: "column" }}>
          <Text style={{ color: ColorPalette.text, fontSize: 12 }}>{title}</Text>
          <Text style={{ color: ColorPalette.textGrey }}>
            {address}
          </Text>
        </View>
        <Image
          source={image}
          style={styles.pic}
        />
      </View>
    </View>
  );
};

export const SendCard2: React.FC<SendCardProps> = ({ title, address, image, BoxName, imageNoStyle, onPress, selected }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.card, selected && styles.selectedCard]}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ justifyContent: "flex-start" }}>
            <Text style={[styles.SendCard2Text,selected && styles.selectedText]}>{BoxName}</Text>
          </View>
          <Image
            source={imageNoStyle}
            style={styles.pic2}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SendCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: ColorPalette.greyNav,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  selectedCard: {
    backgroundColor: ColorPalette.secondary,
  },
  pic: {
    marginTop: 5,
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  pic2: {
    width: 65,
    height: 35,
  },
  SendCard2Text:{
     color: ColorPalette.text, fontSize: 15, fontWeight: "600" 
  },
  selectedText:{
    color: ColorPalette.textBlack
  }
});
