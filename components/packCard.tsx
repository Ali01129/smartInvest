import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ColorPalette } from '@/constants/Colors';

interface PackCardProps {
  name: string;
  date: string;
  price: number;
  status: 'received' | 'sent';
}

const PackCard: React.FC<PackCardProps> = ({ name, date, price, status }) => {
  return (
    <View style={styles.content}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          {status === 'received' ? (
            <Image source={require('@/assets/icons/down.png')} style={styles.img} />
          ) : (
            <Image source={require('@/assets/icons/up.png')} style={styles.img} />
          )}

          <View>
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.time}>{date}</Text>
          </View>
        </View>
        <Text style={styles.payment}>${price}</Text>
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
});
