import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorPalette } from "@/constants/Colors";
import Header from "@/components/header";
import SizedBox from "@/components/sizedbox";
import SubscriptionCard from "@/components/subscriptionCard";

const Subscribtion = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Subscriptions</Text>
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

// temporary data
const dummyData = [
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

  note: {
    color: ColorPalette.textGrey,
    marginBottom: 16,
  },
});

export default Subscribtion;
