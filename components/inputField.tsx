import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { ColorPalette } from '@/constants/Colors';

interface InputFieldProps {
    name?: string;
    placeholder?: string;
    onChangeText?: (text: string) => void;
    onBlur: () => void;
    onFocus: () => void;
    value?: string;
    icon?: string;
}

const InputField: React.FC<InputFieldProps> = ({name,placeholder,onChangeText,onBlur,onFocus,value,icon}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <Text style={styles.label}>{name}</Text>
      <View style={[styles.inputContainer, isFocused ? { borderWidth: 1, borderColor: ColorPalette.secondary } : {}]}>
        <Fontisto name={icon as keyof typeof Fontisto.glyphMap} size={20} style={styles.icon} color={ColorPalette.primary} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="grey"
          onChangeText={onChangeText}
          onFocus={() => { onFocus(); setIsFocused(true); }}
          onBlur={() => { onBlur(); setIsFocused(false); }}
          value={value}
          secureTextEntry={name === 'Password'}
          keyboardType={name === 'otp' ? 'numeric' : 'default'}
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
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    backgroundColor: ColorPalette.greyNav,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
export default InputField;
