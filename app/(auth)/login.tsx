import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'; // Import ScrollView
import React, { useState } from 'react';
import { router } from 'expo-router';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { ColorPalette } from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    console.log(values);
    actions.resetForm();
    router.push('/homeindex');
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
              <TouchableOpacity style={styles.box} onPress={() => {router.back()}}>
                <AntDesign name="left" size={26} color="white" />
              </TouchableOpacity>
              <Text style={styles.title}>Login</Text>
            </View>

            <Text style={{ color: 'white', alignSelf: 'flex-start', marginBottom: 20 }}>Login with one of the following options</Text>

            <View style={{ flexDirection: 'row', marginBottom: 30 }}>
              <TouchableOpacity style={styles.box2} onPress={()=>{router.push('/homeindex')}}>
                <Fontisto name="google" size={26} color="white" style={{ alignSelf: 'center' }} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.box2}>
                <AntDesign name="apple1" size={26} color="white" style={{ alignSelf: 'center' }} />
              </TouchableOpacity>
            </View>

            <Text style={{ color: 'white', marginBottom: 10, fontSize: 18 }}>Email</Text>

            <View style={[styles.inputContainer2,emailFocused?{borderWidth:1,borderColor:ColorPalette.secondary}:{}]}>
              <Fontisto name="person" size={24} style={styles.icon} color="white" />
              <TextInput
                style={styles.input}
                placeholder="Enter your Email"
                placeholderTextColor="white"
                onChangeText={handleChange('email')}
                onFocus={() => setEmailFocused(true)}
                onBlur={()=>{handleBlur('email'); setEmailFocused(false)}}
                value={values.email}
              />
            </View>
            {touched.email && errors.email &&
              <Text style={{ color: 'red', marginBottom: 10 }}>{errors.email}</Text>
            }

            <Text style={{ color: 'white', marginBottom: 10, fontSize: 18 }}>Password</Text>
            <View style={[styles.inputContainer2,passwordFocused?{borderWidth:1,borderColor:ColorPalette.secondary}:{}]}>
              <FontAwesome name="lock" size={24} style={styles.icon} color="white" />
              <TextInput
                style={styles.input}
                placeholder="Enter your Password"
                placeholderTextColor="white"
                onChangeText={handleChange('password')}
                onFocus={() => setPasswordFocused(true)}
                onBlur={()=>{handleBlur('password'); setPasswordFocused(false)}}
                value={values.password}
                secureTextEntry
              />
            </View>
            {touched.password && errors.password &&
              <Text style={{ color: 'red', marginBottom: 10 }}>{errors.password}</Text>
            }

            <TouchableOpacity style={styles.logInButton} onPress={() => handleSubmit()}>
              <Text style={styles.logInText}>Login</Text>
            </TouchableOpacity>

            <View>
              <Text style={{ color: 'white', alignSelf: 'center', marginTop: 20 }}>Don't have an account?
                <Text style={{ color: ColorPalette.secondary }}> Sign Up</Text>
              </Text>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: ColorPalette.background,
    padding: 30,
    paddingTop: 80,
  },
  title: {
    marginLeft: 15,
    color: ColorPalette.text,
    fontSize: 35,
    fontWeight: 'bold',
  },
  box: {
    borderWidth: 2,
    borderColor: 'grey',
    padding: 10,
    borderRadius: 16,
    marginRight: 10,
  },
  box2: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'grey',
    padding: 20,
    borderRadius: 16,
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    height: '100%',
  },
  inputContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    backgroundColor: '#636363',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  logInButton: {
    marginTop: 10,
    padding: 15,
    width: '100%',
    borderRadius: 16,
    backgroundColor: ColorPalette.secondary,
  },
  logInText: {
    color: ColorPalette.background,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
