// TransDetailsCard.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ColorPalette } from '@/constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';

interface TransDetailsCardProps {
  id: string;
  name: string;
  amount: string;
  date: string;
}

const TransDetailsCard: React.FC<TransDetailsCardProps> = ({ id, name, amount, date }) => {
  return (
    <View style={styles.content}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome5 name="external-link-alt" size={30} style={styles.icon} color={ColorPalette.primary} />
          <View>
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.time}>{date}</Text>
          </View>
        </View>
        <Text style={styles.payment}>{amount}</Text>
      </View>
    </View>
  );
};

export default TransDetailsCard;

const styles = StyleSheet.create({
  content: {
    backgroundColor: ColorPalette.greyNav,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  icon: {
    alignSelf: 'center',
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
