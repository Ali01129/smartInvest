import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'; // Import ScrollView
import React, { useState } from 'react';
import { router } from 'expo-router';
import { Fontisto } from '@expo/vector-icons';
import { ColorPalette } from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { Formik, FormikHelpers } from 'formik';
import InputField from '@/components/inputField';
import * as Yup from 'yup';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from "expo-status-bar";

interface FormValues {
  email: string;
  password: string;
  userName: string;
  phantomWallet: string;
}

const SignUp: React.FC = () => {

  const initialValues: FormValues = {
    email: '',
    userName: '',
    password: '',
    phantomWallet: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    userName: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
    phantomWallet: Yup.string()
      .required('Phantom Wallet is required'),
  });

  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    console.log(values);
    actions.resetForm();
    router.push('/otp');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={{ width: '100%' }}>
            <View style={{ alignSelf: 'flex-start', flexDirection: 'row', marginBottom: 50, alignItems: 'center' }}>
              <TouchableOpacity style={styles.box} onPress={() => { router.back() }}>
                <AntDesign name="left" size={26} color="white" />
              </TouchableOpacity>
              <Text style={styles.title}>SignUp</Text>
            </View>

            <InputField
              name="Email"
              placeholder="Enter your Email"
              onChangeText={handleChange('email')}
              onBlur={() => handleBlur('email')}
              onFocus={() => console.log('Input focused')}
              value={values.email}
              icon={'email'}
            />
            {touched.email && errors.email &&
              <Text style={{ color: 'red', marginBottom: 10 }}>{errors.email}</Text>
            }
            <InputField
              name="UserName"
              placeholder="Enter your UserName"
              onChangeText={handleChange('userName')}
              onBlur={() => handleBlur('userName')}
              onFocus={() => console.log('Input focused')}
              value={values.userName}
              icon={'person'}
            />

            {touched.userName && errors.userName &&
              <Text style={{ color: 'red', marginBottom: 10 }}>{errors.userName}</Text>
            }
            <InputField
              name="Password"
              placeholder="Enter your Password"
              onChangeText={handleChange('password')}
              onBlur={() => handleBlur('password')}
              onFocus={() => console.log('Input focused')}
              value={values.password}
              icon={'locked'}
            />
            {touched.password && errors.password &&
              <Text style={{ color: 'red', marginBottom: 10 }}>{errors.password}</Text>
            }
            <InputField
              name="Phatom Wallet"
              placeholder="Enter your Phantom Wallet Address"
              onChangeText={handleChange('phantomWallet')}
              onBlur={() => handleBlur('phantomWallet')}
              onFocus={() => console.log('Input focused')}
              value={values.phantomWallet}
              icon={'google-wallet'}
            />
            {touched.phantomWallet && errors.phantomWallet &&
              <Text style={{ color: 'red', marginBottom: 10 }}>{errors.phantomWallet}</Text>
            }

            <LinearGradient colors={[ColorPalette.g2, ColorPalette.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            >
              <TouchableOpacity onPress={() => handleSubmit()}>
                <Text style={styles.logInText}>SignUp</Text>
              </TouchableOpacity>
            </LinearGradient>
            <View>
              <Text style={{ color: 'white', alignSelf: 'center', marginTop: 20 }}>Already have an account?
                <Text style={{ color: ColorPalette.secondary }} onPress={() => { router.replace('login') }}> Login</Text>
              </Text>
            </View>
          </View>
        )}
      </Formik>
      <StatusBar backgroundColor={ColorPalette.background} style="light" />
    </ScrollView>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: ColorPalette.background,
    padding: 16,
    paddingTop: 80,
  },
  title: {
    marginLeft: 15,
    color: ColorPalette.text,
    fontSize: 30,
    fontWeight: 'bold',
  },
  box: {
    borderWidth: 2,
    borderColor: 'grey',
    padding: 10,
    borderRadius: 16,
    marginRight: 10,
  },
  logInText: {
    color: ColorPalette.background,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gradient: {
    borderRadius: 16,
    marginTop: 10,
    padding: 15,
    width: '100%',
    backgroundColor: ColorPalette.secondary,
  }
});
