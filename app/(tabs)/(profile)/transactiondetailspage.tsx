// TransactionDetailsPage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


interface TransDetailsCardProps {
  id: string;
  name: string;
  amount: string;
  date: string;
  type: string;
}

const TransactionDetailsPage: React.FC<TransDetailsCardProps> = ({ id, name, amount, date, type }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction Details</Text>
      <Text>ID: {id}</Text>
      <Text>Name: {name}</Text>
      <Text>Amount: {amount}</Text>
      <Text>Date: {date}</Text>
      <Text>Type: {type}</Text>
    </View>
  );
};

export default TransactionDetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
