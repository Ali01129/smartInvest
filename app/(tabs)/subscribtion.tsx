import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorPalette } from "@/constants/Colors";
import SizedBox from "@/components/sizedbox";
import SubscriptionCard from "@/components/subscriptionCard";
import { StatusBar } from "expo-status-bar";
import axiosInstance from "@/utilities/axios";
import { formatValidity } from "@/utilities/formatValidity";

const Subscribtion = () => {
  const [subscriptions, setSubscriptions] = useState<any>([]);
  // to trigger re-render only after user subcribes to a package
  const [trigger, setTrigger] = useState(true);

  const fetchSubscriptions = async () => {
    try {
      const response = await axiosInstance.get("/package");
      const packages = response.data.packages;
      console.log("Packages: ", packages);
      setSubscriptions(packages);
    } catch (error) {
      console.log(error);
    }
  };

  // to subscribe to a package
  const subscribe = async (id: string) => {
    try {
      const response = await axiosInstance.patch("/package/subscribe", {
        packageId: id,
      });
      Alert.alert("Success", response.data.message);
      console.log(response.data);
      setTrigger(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (trigger) {
      fetchSubscriptions();
      setTrigger(false);
    }
  }, [trigger]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Subscriptions</Text>
        <Text style={styles.note}>
          Note: Profit for each subscriptions will be given each month.
        </Text>
        <ScrollView style={{ flex: 1 }}>
          {subscriptions &&
            subscriptions.map((item: any, index: any) => (
              <SubscriptionCard
                key={index}
                name={item.name}
                profit={item.profit}
                coins={item.price}
                validity={formatValidity(item.validity)}
                onPress={() => {
                  subscribe(item._id);
                }}
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
