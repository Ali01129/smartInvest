import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorPalette } from '@/constants/Colors';
import { PieChart } from 'react-native-chart-kit';
import SizedBox from "@/components/sizedbox";
import PortfolioHeader from "@/components/profileHeader";
import TransDetailsCard from '@/components/transDetailedCard';
import Icon from "@expo/vector-icons/MaterialIcons";

const ProfileIndex = () => {
  const [usd, setUsd] = useState("123");
  const [sc, setSc] = useState("4200.00");

  const [transactions, setTransactions] = useState([
    { id: '1', date: '2023-07-10', amount: 'SC200', fromTo: 'John Doe', type: "sent" },
    { id: '2', date: '2023-07-11', amount: 'SC150', fromTo: 'Jane Smith', type: "sent" },
    { id: '3', date: '2023-07-12', amount: 'SC50', fromTo: 'Mike Johnson', type: "received" },
    { id: '4', date: '2023-07-12', amount: 'SC50', fromTo: 'Mike Johnson', type: "received" },
    { id: '5', date: '2023-07-12', amount: 'SC500', fromTo: 'Ali Nawaz', type: "received" },
    { id: '6', date: '2023-07-12', amount: 'SC50', fromTo: 'Mike Johnson', type: "received" },
    { id: '7', date: '2023-07-12', amount: 'SC50', fromTo: 'Mike Johnson', type: "received" },
    { id: '8', date: '2023-07-11', amount: 'SC1750', fromTo: 'Ali Nawaz', type: "sent" },
    { id: '9', date: '2023-07-11', amount: 'SC150', fromTo: 'Jane Smith', type: "sent" },
  ]);

  const sentTransactions = transactions.filter(item => item.type === 'sent');
  const receivedTransactions = transactions.filter(item => item.type === 'received');

  const sentAmount = sentTransactions.reduce((total, item) => total + parseFloat(item.amount.replace('SC', '')), 0);
  const receivedAmount = receivedTransactions.reduce((total, item) => total + parseFloat(item.amount.replace('SC', '')), 0);

  const handleSettingsPress = () => {
    // Handle the settings button press action
  };

  const chartData = [
    {
      name: 'Sent',
      amount: sentAmount,
      color: ColorPalette.primary,
      legendFontColor: ColorPalette.text,
      legendFontSize: 15,
    },
    {
      name: 'Received',
      amount: receivedAmount,
      color: "#404040",
      legendFontColor: ColorPalette.text,
      legendFontSize: 15,
    },
  ];

  const [isChartVisible, setChartVisible] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <PortfolioHeader
        title="Portfolio"
        settingsAction={handleSettingsPress}
        usd={1234.56} // Example value
        sc={7890} // Example value
      />

      <View style={{ height: 1, backgroundColor: ColorPalette.textGrey, marginTop: 16 }} />

      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.sectionTitle}>Transaction Summary</Text>
          <TouchableOpacity onPress={() => setChartVisible(!isChartVisible)}>
            <Icon name={isChartVisible ? 'expand-more' : 'expand-less'} size={24} color={ColorPalette.text} />
          </TouchableOpacity>
        </View>

        {isChartVisible && (
          <PieChart
            data={chartData}
            width={Dimensions.get('window').width - 32}
            height={220}
            chartConfig={{
              backgroundColor: ColorPalette.background,
              backgroundGradientFrom: ColorPalette.background,
              backgroundGradientTo: ColorPalette.background,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForLabels: {
                fontSize: 15,
                fontWeight: 'bold',
              },
            }}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        )}
      </View>

      {/* Transactions List */}
      <Text style={[styles.sectionTitle, { paddingHorizontal: 16 }]}>Transactions</Text>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={{ paddingHorizontal: 16 }}>
          <SizedBox height={10} />
          {transactions.map(item => (
            <TransDetailsCard
              key={item.id}
              id={item.id}
              name={item.fromTo}
              amount={item.amount}
              date={item.date}
              type={item.type}
            />
          ))}
        </View>
        <SizedBox height={70} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfileIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.background,
    paddingVertical: 16,
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    color: ColorPalette.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width - 32,
    marginBottom: 10,
  },
});
