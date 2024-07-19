import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { ColorPalette } from '@/constants/Colors';

interface TransDetailsCardProps {
  id?: string; // Make id optional
  name: string;
  amount: string;
  date: string;
  type: string;
  onPress: () => void;
}

const TransDetailsCard: React.FC<TransDetailsCardProps> = ({ id, name, amount, date, type, onPress }) => {
  return (
    <TouchableOpacity style={styles.content} onPress={onPress}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          {type === 'received' ? (
            <Image source={require('@/assets/icons/down.png')} style={styles.img} />
          ) : (
            <Image source={require('@/assets/icons/up.png')} style={styles.img} />
          )}
          <View>
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.time}>{date}</Text>
          </View>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.payment}>{amount}</Text>
          {id && <Text style={styles.transId}>ID: {id}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TransDetailsCard;

const styles = StyleSheet.create({
  content: {
    backgroundColor: ColorPalette.greyNav,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    elevation: 5,
  },
  img: {
    alignSelf: 'center',
    width: 40,
    height: 40,
    marginRight: 15,
  },
  text: {
    color: ColorPalette.text,
    fontSize: 16,
  },
  time: {
    color: ColorPalette.textGrey,
    fontSize: 12,
    marginTop: 5,
  },
  payment: {
    alignSelf: 'center',
    color: ColorPalette.text,
    fontSize: 16,
  },
  transId: {
    color: ColorPalette.textGrey,
    fontSize: 12,
    textAlign: 'right',
  },
});
