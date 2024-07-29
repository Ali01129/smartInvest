import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorPalette } from "@/constants/Colors";
import { PieChart } from "react-native-chart-kit";
import SizedBox from "@/components/sizedbox";
import PortfolioHeader from "@/components/profileHeader";
import TransDetailsCard from "@/components/transDetailedCard";
import Icon from "@expo/vector-icons/MaterialIcons";
import TransactionDetailsModal from "@/components/transactionDetailsModal";
import { router, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import axiosInstance from "@/utilities/axios";
import { logout } from "@/actions/authActions";
import moment from "moment";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";

const ProfileIndex = () => {
  const [usd, setUsd] = useState("0");
  const [sc, setSc] = useState("0");
  const [transactions, setTransactions] = useState([]);
  const [sentAmount, setSentAmount] = useState(0);
  const [receivedAmount, setReceivedAmount] = useState(0);
  const dispatch: AppDispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
      fetchBalance();
    }, [])
  );

  const fetchBalance = async () => {
    try {
      const response = await axiosInstance.get("/wallet/info");
      const walletData = response.data.wallet;
      setUsd(walletData.usd);
      setSc(walletData.smartCoin);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch balance");
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axiosInstance.get("/transaction/list_by_user");
      setTransactions(response.data.transactions);
      calculateTransactionSums(response.data.transactions);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch transactions");
    }
  };

  const calculateTransactionSums = (transaction: any) => {
    const sentSum = transactions
      .filter((transaction) => transaction.type === "sent")
      .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
    const receivedSum = transactions
      .filter((transaction) => transaction.type === "received")
      .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);

    setSentAmount(sentSum);
    setReceivedAmount(receivedSum);
  };

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = (transaction: any) => {
    setSelectedTransaction(transaction);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
    setModalVisible(false);
  };

  const handlePress = () => {
    dispatch(logout());
    console.log("token reset..");
    router.navigate("/login");
  };

  const chartData = [
    {
      name: "SC Sent",
      amount: sentAmount,
      color: ColorPalette.primary,
      legendFontColor: ColorPalette.text,
      legendFontSize: 15,
    },
    {
      name: "SC Received",
      amount: receivedAmount,
      color: ColorPalette.greyNav,
      legendFontColor: ColorPalette.text,
      legendFontSize: 15,
    },
  ];

  const [isChartVisible, setChartVisible] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <PortfolioHeader
        title="Portfolio"
        settingsAction={handlePress}
        usd={usd}
        sc={sc}
      />

      <View
        style={{
          height: 1,
          backgroundColor: ColorPalette.textGrey,
          marginTop: 16,
        }}
      />

      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.sectionTitle}>Transaction Summary</Text>
          <TouchableOpacity onPress={() => setChartVisible(!isChartVisible)}>
            <Icon
              name={isChartVisible ? "expand-more" : "expand-less"}
              size={24}
              color={ColorPalette.text}
            />
          </TouchableOpacity>
        </View>

        {isChartVisible && (
          <PieChart
            data={chartData}
            width={Dimensions.get("window").width - 32}
            height={220}
            chartConfig={{
              backgroundColor: ColorPalette.background,
              backgroundGradientFrom: ColorPalette.background,
              backgroundGradientTo: ColorPalette.background,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
                borderWidth: 10,
                borderColor: ColorPalette.text,
              },
              propsForLabels: {
                fontSize: 15,
                fontWeight: "bold",
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
      <Text style={[styles.sectionTitle, { paddingHorizontal: 16 }]}>
        Transactions
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={{ paddingHorizontal: 16 }}>
          <SizedBox height={10} />
          {transactions.map((item) => (
            <TransDetailsCard
              key={item.id}
              id={item.id}
              name={item.name}
              amount={item.amount}
              date={moment(item.date).format("HH:mm DD-MM-YYYY")}
              type={item.type}
              onPress={() => openModal(item)}
            />
          ))}
        </View>
        <SizedBox height={70} />
      </ScrollView>

      <TransactionDetailsModal
        visible={isModalVisible}
        onClose={closeModal}
        transaction={selectedTransaction}
      />
      <StatusBar backgroundColor={ColorPalette.background} style="light" />
    </SafeAreaView>
  );
};

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
    fontWeight: "bold",
  },
  chartContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: Dimensions.get("window").width - 32,
    marginBottom: 10,
  },
});
