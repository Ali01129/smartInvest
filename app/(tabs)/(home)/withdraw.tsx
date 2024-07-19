import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ColorPalette } from '@/constants/Colors'
import Header from '@/components/header'
import { router } from 'expo-router'


const WithDraw = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title='Withdraw' onPress={()=>router.push('homeindex')}/>
        <Text style={styles.Text}> Amount</Text>
        <TextInput 
          placeholder='Enter Amount '
          placeholderTextColor={ColorPalette.textGrey}
          style={styles.InputField}
        />
        <View style={{justifyContent:"center",alignItems:"center"}}>
          <Text style={{color:ColorPalette.text,fontSize:20,fontWeight:500}}>$480.00</Text>
          <Text style={{color:ColorPalette.text}}>AVAILABLE BALANCE</Text>
        </View>

        
    </SafeAreaView>
  )
}

export default WithDraw

const styles = StyleSheet.create({
container:{
  flexGrow: 1,
  backgroundColor: ColorPalette.background,
  padding: 16,
},
Text:{
  marginTop:70,
  color: ColorPalette.textGrey,
  alignSelf: 'center',
},
InputField:{
  alignSelf: 'center',
  fontWeight: 'bold',
  fontSize: 40,
  color: ColorPalette.text,
  textAlign: 'center',
  marginBottom:40,
}
})