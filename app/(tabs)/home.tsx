import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ColorPalette } from '@/constants/Colors';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import TransCard from '@/components/transCard';
import PackCard from '@/components/packCard';
import SizedBox from '@/components/sizedbox';
import Images from '@/constants/Images';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import axiosInstance from '@/utilities/axios';
import axios from 'axios';

// Define TypeScript interface for Transaction
interface Transaction {
  name: string;
  date: string;
  amount: number;
  type: 'sent'|'received';
}

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Transactions');
  const [modalVisible, setModalVisible] = useState(false);
  const [mainImage, setMainImage] = useState(Images.amongus);
  const { token } = useSelector((state: RootState) => state.auth);
  const images = [Images.amongus, Images.amongus2, Images.amongus3, Images.amongus4];
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    try {
      const response = await axiosInstance.get("transaction/list_by_user", {});
      setTransactions(response.data.transactions);
      if (response.status === 200) {
        const fetchedTransactions: Transaction[] = response.data.transactions;
        if (fetchedTransactions.length === 0) {
          setError('No transactions found.');
          setTransactions([]);
        } else {
          setTransactions(fetchedTransactions);
          setError(null);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setError('No transactions found. (404)');
        setTransactions([]);
      } else {
        setError('Error fetching transactions.');
        setTransactions([]);
      }
    }
  };

  useEffect(() => {
    const fetchTokenAndData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          await getData();
        }
      } catch (error) {
        console.error('Error fetching token or data:', error);
      }
    };

    fetchTokenAndData();
  }, [token,transactions]);

  const renderContent = () => {
    if (activeTab === 'Transactions') {
      return (
        <ScrollView style={{ width: '100%', height: 150 }}>
          {error && <Text style={{ color: 'white', textAlign: 'center' }}>{error}</Text>}
          {transactions.length > 0 && transactions.map((transaction, index) => {
            const date = new Date(transaction.date).toLocaleDateString();
            return (
              <TransCard
                key={index}
                name={transaction.name}
                date={date}
                price={transaction.amount}
                type={transaction.type}
              />
            );
          })}
          <SizedBox height={70} />
        </ScrollView>
      );
    } else {
      return (
        <ScrollView style={{ width: '100%', height: 350 }}>
          <PackCard name="VIP" profit={20} coins={500} validity="4 months" />
          <PackCard name="VIP" profit={20} coins={500} validity="4 months" />
          <PackCard name="VIP" profit={20} coins={500} validity="4 months" />
          <SizedBox height={70} />
        </ScrollView>
      );
    }
  };

  const handleImageSelect = (image: any) => {
    setMainImage(image);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={styles.title}>Wallet</Text>
          <Text style={styles.subtitle}>Active</Text>
        </View>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={mainImage} style={styles.pic} />
        </TouchableOpacity>
      </View>

      {/* Card Section */}
      <View style={styles.card}>
        <Text style={[styles.subtitle, { color: "black", fontSize: 14 }]}>
          Balance
        </Text>
        <Text style={[styles.title, { color: "black" }]}>$500</Text>

        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <View style={styles.menuItem}>
            <TouchableOpacity onPress={() => router.push("send")}>
              <View style={styles.menu1}>
                <FontAwesome6
                  name="money-bill-transfer"
                  size={20}
                  color={ColorPalette.text}
                />
              </View>
            </TouchableOpacity>

            <Text style={styles.menuText}>Send</Text>
          </View>
          <View style={styles.menuItem}>
            <TouchableOpacity onPress={() => router.push("deposit")}>
              <View style={styles.menu1}>
                <MaterialIcons
                  name="currency-exchange"
                  size={20}
                  color={ColorPalette.text}
                />
              </View>
            </TouchableOpacity>

            <Text style={styles.menuText}>Deposit</Text>
          </View>
          <View style={styles.menuItem}>
            <TouchableOpacity onPress={() => router.push("withdraw")}>
              <View style={styles.menu1}>
                <MaterialIcons
                  name="money-off"
                  size={20}
                  color={ColorPalette.text}
                />
              </View>
            </TouchableOpacity>

            <Text style={styles.menuText}>Withdraw</Text>
          </View>
          <View style={styles.menuItem}>
            <TouchableOpacity onPress={() => router.push("conversion")}>
              <View style={styles.menu1}>
                <FontAwesome6
                  name="money-bill-transfer"
                  size={20}
                  color={ColorPalette.text}
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.menuText}>Convert</Text>
          </View>
        </View>
      </View>

      {/* Tabs Section */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Transactions" && styles.activeTab]}
          onPress={() => setActiveTab("Transactions")}
        >
          <Text style={styles.tabText}>Transactions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Packages" && styles.activeTab]}
          onPress={() => setActiveTab("Packages")}
        >
          <Text style={styles.tabText}>Packages</Text>
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      {renderContent()}

      {/* Image Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleImageSelect(image)}
              >
                <Image source={image} style={styles.modalImage} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
      <StatusBar backgroundColor={ColorPalette.background} style="light" />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: ColorPalette.background,
    padding: 16,
  },
  title: {
    marginLeft: 15,
    color: ColorPalette.text,
    fontSize: 25,
    fontWeight: "bold",
  },
  subtitle: {
    marginLeft: 15,
    color: "grey",
    fontSize: 15,
  },
  pic: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  card: {
    backgroundColor: ColorPalette.primary,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  menuItem: {
    alignItems: "center",
    flex: 1,
  },
  menu1: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: ColorPalette.textBlack,
    justifyContent: "center",
    elevation: 5,
    alignItems: "center",
  },
  menuText: {
    color: ColorPalette.textBlack,
    textAlign: "center",
    marginTop: 5,
    fontSize: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: ColorPalette.greyNav,
  },
  tabText: {
    color: ColorPalette.text,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    marginHorizontal: 16,
    backgroundColor: ColorPalette.greyNav,
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  modalImage: {
    width: 60,
    height: 60,
    margin: 10,
    borderRadius: 50,
  },
});
