import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorPalette } from "@/constants/Colors";
import Header from "@/components/header";
import { FontAwesome6 } from "@expo/vector-icons";
import SizedBox from "@/components/sizedbox";
const { height } = Dimensions.get("window");

const Subscribtion = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Header title={"Subscriptions"} onPress={() => {}}></Header>
        <Text style={styles.note}>
          Note: Profit for each subscriptions will be given each month.
        </Text>
        <ScrollView style={{ flex: 1 }}>
          {dummyData.map((item, index) => (
            <SubscriptionCard
              key={index}
              name={item.name}
              profit={item.profit}
              coins={item.coins}
              validity={item.validity}
            />
          ))}
        </ScrollView>
        <SizedBox height={70} />
      </View>
    </SafeAreaView>
  );
};

interface SubscriptionProps {
  name: string;
  profit: number;
  coins: number;
  validity: string;
}

const dummyData: SubscriptionProps[] = [
  {
    name: "Good Offer",
    profit: 20,
    coins: 300,
    validity: "2 months",
  },
  {
    name: "Better Offer",
    profit: 30,
    coins: 500,
    validity: "3 months",
  },
  {
    name: "Best Offer",
    profit: 50,
    coins: 1000,
    validity: "6 months",
  },
  {
    name: "Great Offer",
    profit: 40,
    coins: 800,
    validity: "4 months",
  },
  {
    name: "Amazing Offer",
    profit: 60,
    coins: 1500,
    validity: "12 months",
  },
];

interface SubscriptionProps {
  name: string;
  profit: number;
  coins: number;
  validity: string;
}

const SubscriptionCard: React.FC<SubscriptionProps> = ({
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
        <SubscribeButton />
      </View>
    </View>
  );
};

const SubscribeButton: React.FC = () => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: ColorPalette.primary,
        padding: 8,
        borderRadius: 8,
        paddingHorizontal: 24,
      }}
    >
      <Text style={{ fontWeight: "700" }}>Subscribe</Text>
    </TouchableOpacity>
  );
};

export default Subscribtion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.background,
    padding: 16,
  },

  note: {
    color: ColorPalette.textGrey,
    marginBottom: 16,
  },
  card: {
    height: height * 0.185,
    padding: 16,
    width: "100%",
    backgroundColor: ColorPalette.greyNav,
    borderRadius: 20,
    marginBottom: 16,
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
});
