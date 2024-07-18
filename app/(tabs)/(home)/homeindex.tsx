import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ColorPalette } from '@/constants/Colors';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const HomeIndex = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* header section */}
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View>
          <Text style={styles.title}>Wallet</Text>
          <Text style={styles.subtitle}>Active</Text>
        </View>
        <Image source={require('@/assets/pic/profile.png')} style={styles.pic}/>
      </View>
      {/* Card Section */}
      <View style={styles.card}>
        <Text style={[styles.subtitle,{color:'black',fontSize:14}]}>Balance</Text>
        <Text style={[styles.title,{color:'black'}]}>$500</Text>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 20 }}>
          <View style={styles.menuItem}>
            <View style={styles.menu1}>
              <FontAwesome6 name="money-bill-transfer" size={20} color={ColorPalette.text} />
            </View>
            <Text style={styles.menuText}>Send</Text>
          </View>

          <View style={styles.menuItem}>
            <View style={styles.menu1}>
              <MaterialIcons name="currency-exchange" size={20} color={ColorPalette.text} />
            </View>
            <Text style={styles.menuText}>Deposit</Text>
          </View>
          <View style={styles.menuItem}>
            <View style={styles.menu1}>
              <MaterialIcons name="currency-exchange" size={20} color={ColorPalette.text} />
            </View>
            <Text style={styles.menuText}>Withdraw</Text>
          </View>
          <View style={styles.menuItem}>
            <View style={styles.menu1}>
              <MaterialIcons name="currency-exchange" size={20} color={ColorPalette.text} />
            </View>
            <Text style={styles.menuText}>Convert</Text>
          </View>
        </View>
      </View>
      
      {/* Transection Section */}
      <View style={{flexDirection:'row',justifyContent:'space-between',marginTop: 30,}}>
        <Text style={styles.trans}>Last Transation</Text>
        <Text style={styles.subtitle}>View all</Text>
      </View>
      {/* Transection cards Section */}
      <View>

      </View>

    </SafeAreaView>
  )
}

export default HomeIndex

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: ColorPalette.background,
    padding: 30,
  },
  title: {
    marginLeft: 15,
    color: ColorPalette.text,
    fontSize: 25,
    fontWeight: 'bold',
  },
  subtitle:{
    marginLeft: 15,
    color: 'grey',
    fontSize: 15,
  },
  pic:{
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  card:{
    backgroundColor:ColorPalette.primary,
    borderRadius: 28,
    paddingVertical:20,
    paddingHorizontal:20,
    marginTop:20,
  },
  menuItem: {
    alignItems: 'center',
    flex: 1,
  },
  menu1: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: ColorPalette.textBlack,
    justifyContent: 'center',
    elevation: 5,
    alignItems: 'center',
  },
  menuText: {
    color: ColorPalette.textBlack,
    textAlign: 'center',
    marginTop: 5,
    fontSize: 10,
  },
  trans:{
    fontSize:18,
    color:ColorPalette.text
  },
})