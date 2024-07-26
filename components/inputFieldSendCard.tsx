import React, { Key, useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { ColorPalette } from '@/constants/Colors';
interface inputFieldSendCardProps {
    name?: string;
    placeholder?: string;
    onChangeText?: (text: string) => void;
    onBlur: () => void;
    onFocus: () => void;
    value?: any;
    icon?: string;
    keyType?: KeyboardTypeOptions;
}
const inputFieldSendCard: React.FC<inputFieldSendCardProps> = ({name,placeholder,onChangeText,onBlur,onFocus,value,icon,keyType}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <>
      <Text style={styles.label}>{name}</Text>
      <View style={[styles.inputContainer, isFocused ? { borderWidth: 1, borderColor: ColorPalette.secondary } : {}]}>
        <Fontisto name={icon as keyof typeof Fontisto.glyphMap} size={20} style={styles.icon} color={ColorPalette.primary} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={ColorPalette.textGrey}
          onChangeText={onChangeText}
          onFocus={() => { onFocus(); setIsFocused(true); }}
          onBlur={() => { onBlur(); setIsFocused(false); }}
          value={value}
          keyboardType={keyType}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  label: {
    color: 'white',
    marginBottom: 10,
    fontSize: 18,
  },
  icon: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    height: '100%',
    color: ColorPalette.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: ColorPalette.greyNav,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
export default inputFieldSendCard;