import { Image, StyleSheet, Text, View, TouchableOpacity,ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ColorPalette } from '@/constants/Colors';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import TransCard from '@/components/transCard';
import PackCard from '@/components/packCard';
import SizedBox from '@/components/sizedbox';


const HomeIndex = () => {
  const [activeTab, setActiveTab] = useState("Transactions");

  const renderContent = () => {
    if (activeTab === "Transactions") {
      return (
        <ScrollView style={{width:'100%',height:150}}>
          <TransCard name={'Ahmad'} date={'10-07-2024'} price={50} type={'sent'}/>
          <TransCard name={'Huzaifa'} date={'10-07-2024'} price={70} type={'received'}/>
          <TransCard name={'Ali'} date={'10-07-2024'} price={60} type={'sent'}/>
          <TransCard name={'Ali'} date={'10-07-2024'} price={60} type={'sent'}/>
          <TransCard name={'Ali'} date={'10-07-2024'} price={60} type={'sent'}/>
          <SizedBox height={70}/>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView style={{width:'100%',height:350}}>
          <PackCard name='VIP' profit={20} coins={500} validity='4 months'/>
          <PackCard name='VIP' profit={20} coins={500} validity='4 months'/>
          <PackCard name='VIP' profit={20} coins={500} validity='4 months'/>
          <SizedBox height={70}/>
        </ScrollView>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={styles.title}>Wallet</Text>
          <Text style={styles.subtitle}>Active</Text>
        </View>
        <Image
          source={require("@/assets/pic/profile.png")}
          style={styles.pic}
        />
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
            <View style={styles.menu1}>
              <FontAwesome6
                name="money-bill-transfer"
                size={20}
                color={ColorPalette.text}
              />
            </View>
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
            <View style={styles.menu1}>
              <MaterialIcons
                name="currency-exchange"
                size={20}
                color={ColorPalette.text}
              />
            </View>
            <Text style={styles.menuText}>Withdraw</Text>
          </View>
          <View style={styles.menuItem}>
            <TouchableOpacity onPress={() => router.push("conversion")}>
              <View style={styles.menu1}>
                <MaterialIcons
                  name="currency-exchange"
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
    </SafeAreaView>
  );
};

export default HomeIndex;

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
  content: {
    backgroundColor: ColorPalette.greyNav,
    borderRadius: 10,
    padding: 20,
  },
  trans: {
    fontSize: 18,
    color: ColorPalette.text,
    marginBottom: 10,
  },
});
