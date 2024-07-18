import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorPalette } from '@/constants/Colors';
import SizedBox from "@/components/sizedbox";
import { Ionicons } from '@expo/vector-icons';
import TransCard from '@/components/transDetailedCard';

const ProfileIndex = () => {

  const [usd, setUsd] = useState("123");
  const [sc, setSc] = useState("4200.00");

  const [transactions, setTransactions] = useState([
    { id: '1', date: '2023-07-10', amount: '$200', fromTo: 'John Doe', type: "sent" },
    { id: '2', date: '2023-07-11', amount: '$150', fromTo: 'Jane Smith', type: "sent" },
    { id: '3', date: '2023-07-12', amount: '$50', fromTo: 'Mike Johnson', type: "received" },
  ]);

  const sentTransactions = transactions.filter(item => item.type === 'sent');
  const receivedTransactions = transactions.filter(item => item.type === 'received');

  const sentAmount = sentTransactions.reduce((total, item) => total + parseFloat(item.amount.replace('$', '')), 0);
  const receivedAmount = receivedTransactions.reduce((total, item) => total + parseFloat(item.amount.replace('$', '')), 0);

  const data = [
    {
      name: 'Sent',
      amount: sentAmount,
      color: 'yellow',
      legendFontColor: ColorPalette.text,
      legendFontSize: 15,
    },
    {
      name: 'Received',
      amount: receivedAmount,
      color: 'white',
      legendFontColor: ColorPalette.text,
      legendFontSize: 15,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {/* Profile Title and Money*/}
          <View style={{ paddingHorizontal: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
              <Text style={styles.title}>Portfolio</Text>
              <TouchableOpacity>
                <Ionicons name="settings-sharp" size={24} color={ColorPalette.text} />
              </TouchableOpacity>
            </View>
            <SizedBox height={16} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={styles.box}>
                <Text style={styles.subtitle}>USD</Text>
                <SizedBox height={5} />
                <Text style={styles.boxTitle}>$ {usd}</Text>
              </View>
              <View style={[styles.box, { marginLeft: 16 }]}>
                <Text style={styles.subtitle}>SC</Text>
                <SizedBox height={5} />
                <Text style={styles.boxTitle}>{sc}</Text>
              </View>
            </View>
          </View>

          <View style={{ height: 1, backgroundColor: ColorPalette.textGrey, marginVertical: 16 }} />


          {/* Transactions List */}
          <View style={{ paddingHorizontal: 16 }}>
            <Text style={styles.sectionTitle}>Transactions</Text>
            <SizedBox height={10} />
            {transactions.map(item => (
              <TransCard
                key={item.id}
                id={item.id}
                name={item.fromTo}
                amount={item.amount}
                date={item.date}
              />
            ))}
          </View>
          <SizedBox height={80} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfileIndex;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: ColorPalette.background,
    paddingVertical: 16,
  },
  title: {
    color: ColorPalette.text,
    fontSize: 25,
    fontWeight: 'bold',
  },
  subtitle: {
    color: ColorPalette.primary,
    fontSize: 15,
  },
  boxTitle: {
    color: ColorPalette.text,
    fontSize: 20,
    fontWeight: "600",
  },
  box: {
    flex: 1,
    borderWidth: 1,
    borderColor: ColorPalette.textGrey,
    padding: 10,
    borderRadius: 5,
  },
  sectionTitle: {
    color: ColorPalette.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
