import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ColorPalette } from '@/constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PackCard = () => {
  return (
    <View style={styles.content}>
      <View style={styles.row}>
        <View style={styles.packageInfo}>
        <MaterialCommunityIcons name="package" size={24} color={ColorPalette.primary} />
          <View style={styles.packageDetails}>
            <Text style={styles.text}>Package Name</Text>
            <Text style={styles.time}>10 days</Text>
          </View>
        </View>
        <Text style={styles.payment}>20/Month</Text>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.row}>
        <View style={styles.stakeInfo}>
        <FontAwesome5 name="coins" size={24} color={ColorPalette.primary} />
          <View style={styles.stakeDetails}>
            <Text style={styles.text}>Stake: 500 Coins</Text>
            <Text style={styles.time}>Validity: 25-7-2024</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default PackCard;

const styles = StyleSheet.create({
  content: {
    backgroundColor: ColorPalette.greyNav,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  packageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  packageDetails: {
    marginLeft: 10,
  },
  stakeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stakeDetails: {
    marginLeft: 10,
  },
  text: {
    color: ColorPalette.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    color: ColorPalette.textGrey,
    fontSize: 12,
    marginTop: 5,
  },
  payment: {
    alignSelf: 'center',
    color: ColorPalette.textBlack,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: ColorPalette.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  divider: {
    width: '100%',
    backgroundColor: "white",
    height: 1,
    marginVertical: 10,
  },
});
