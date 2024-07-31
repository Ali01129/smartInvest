import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ColorPalette } from '../constants/Colors';
import Images from '@/constants/Images';
import CustomSolidButton from '@/components/CustomSolidButton';

const Index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={Images.onboarding}
          style={{ width: 400, height: 500, resizeMode: 'contain' }}
        />
      </View>
      <View style={{ width: '100%', justifyContent: 'space-between', flex: 1 }}>
        <Text style={styles.text}>Your Personal crypto Wallet</Text>
        <CustomSolidButton
          gradientColors={[ColorPalette.g2, ColorPalette.secondary]}
          text={'Get Started'}
          textColor={ColorPalette.textBlack}
          onPress={() => {
            router.push('login');
          }}
        />
      </View>
      <StatusBar backgroundColor={ColorPalette.background} style='light' />
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: ColorPalette.background,
    padding: 16,
    paddingBottom: 20,
  },
  text: {
    color: ColorPalette.text,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logInButton: {
    padding: 15,
    width: '100%',
    borderRadius: 16,
    backgroundColor: ColorPalette.secondary,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logInText: {
    color: ColorPalette.background,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
