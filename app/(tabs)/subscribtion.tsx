import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorPalette } from "@/constants/Colors";
import SizedBox from "@/components/sizedbox";
import SubscriptionCard from "@/components/subscriptionCard";
import { StatusBar } from "expo-status-bar";
import axiosInstance from "@/utilities/axios";

const Subscribtion = () => {
  const [subscriptions, setSubscriptions] = useState<any>([]);

  const fetchSubscriptions = async () => {
    try {
      const response = await axiosInstance.get("/package");
      setSubscriptions(response.data.packages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [subscriptions]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Subscriptions</Text>
        <Text style={styles.note}>
          Note: Profit for each subscriptions will be given each month.
        </Text>
        <ScrollView style={{ flex: 1 }}>
          {subscriptions.map((item: any, index: any) => (
            <SubscriptionCard
              key={index}
              name={item.name}
              profit={item.profit}
              coins={item.price}
              validity={item.validity}
            />
          ))}
        </ScrollView>
        <SizedBox height={70} />
      </View>
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
  },

  note: {
    color: ColorPalette.textGrey,
    marginBottom: 16,
  },
});

export default Subscribtion;
