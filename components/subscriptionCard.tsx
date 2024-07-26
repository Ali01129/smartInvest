import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { ColorPalette } from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
const { height } = Dimensions.get("window");

interface SubscriptionProps {
  name: string;
  profit: number;
  coins: number;
  validity: string;
  onPress: () => void;
}

const SubscriptionCard: React.FC<SubscriptionProps> = ({
  name,
  profit,
  coins,
  validity,
  onPress,
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
        <SubscribeButton onPress={onPress} />
      </View>
    </View>
  );
};

interface SubscribeButtonProps {
  onPress: () => void;
}
const SubscribeButton: React.FC<SubscribeButtonProps> = ({ onPress }) => {
  return (
    <LinearGradient
      colors={[ColorPalette.g2, ColorPalette.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          padding: 8,
          borderRadius: 8,
          paddingHorizontal: 24,
        }}
      >
        <Text style={{ fontWeight: "700" }}>Subscribe</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 150,
    padding: 16,
    width: "100%",
    backgroundColor: ColorPalette.greyNav,
    borderRadius: 20,
    marginBottom: 16,
    elevation: 5,
  },
  heading: {
    fontSize: 22,
    fontWeight: "500",
    color: ColorPalette.text,
  },
  row: {
    marginTop: 16,
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

export default SubscriptionCard;
