import { StyleSheet, Text, View, Dimensions } from "react-native";
import { ColorPalette } from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
const { height } = Dimensions.get("window");

import { endOfMonth, differenceInDays, startOfDay } from "date-fns";

interface SubscriptionProps {
  name: string;
  profit: number;
  coins: number;
  validity: string;
}

const getRemainingDaysOfMonth = () => {
  const today = new Date();
  const endOfThisMonth = endOfMonth(today);

  // Calculate the remaining days
  const remainingDays = differenceInDays(endOfThisMonth, startOfDay(today));

  return remainingDays;
};

const PackCard: React.FC<SubscriptionProps> = ({
  name,
  profit,
  coins,
  validity,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>{name}</Text>
      <View style={styles.row}>
        <Text style={styles.profit}>Profit: {profit}%</Text>
        <View style={{ flexDirection: "row" }}>
          <FontAwesome6
            name="coins"
            style={{ marginRight: 8 }}
            size={18}
            color={ColorPalette.primary}
          />
          <Text style={styles.coins}>{coins} coins</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.validity}>Validity: {validity}</Text>
        <LinearGradient
          colors={[ColorPalette.g2, ColorPalette.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <View
            style={{
              //   backgroundColor: ColorPalette.primary,
              padding: 8,
              borderRadius: 8,
              paddingHorizontal: 24,
            }}
          >
            <Text style={{ fontWeight: "700" }}>
              {getRemainingDaysOfMonth()} days
            </Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    height: height * 0.185,
    padding: 16,
    width: "100%",
    backgroundColor: ColorPalette.greyNav,
    borderRadius: 20,
    marginBottom: 12,
    elevation: 5,
  },
  heading: {
    fontSize: 22,
    fontWeight: "500",
    color: ColorPalette.text,
  },
  row: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profit: {
    fontSize: 16,
    color: ColorPalette.text,
    fontWeight: "500",
  },
  coins: { color: ColorPalette.text, fontSize: 16, fontWeight: "500" },
  validity: {
    fontSize: 12,
    color: ColorPalette.textGrey,
  },
  gradient: {
    borderRadius: 10,
  },
});
export default PackCard;
