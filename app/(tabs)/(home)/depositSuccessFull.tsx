import { SafeAreaView } from "react-native-safe-area-context";
import { Text,StyleSheet,View,Image } from "react-native";
import { ColorPalette } from "@/constants/Colors";
import FastImage from "react-native-fast-image";

const depositSuccessFull = () => {
    return ( 
        <SafeAreaView style={styles.container}>
            <View style={styles.Header}>
                <Text style={styles.UpperText}>Deposit Successful</Text>
                <Text style={styles.LowerText}>Your fund are now available for use</Text>
                <Image source={require('@/assets/pic/deposit.gif')}
                    resizeMode="contain"
                    style={styles.Picture}
                />
            </View>
            <Text style={styles.AmountText}>USD 500.00</Text>
        </SafeAreaView>
     );
}

const styles = StyleSheet.create({
    container:{
        flexGrow: 1,
        backgroundColor: ColorPalette.background,
        padding: 16
    },
    Header:{
        alignItems: 'center',
    },
    UpperText:{
        color: ColorPalette.text,
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10
    },
    LowerText:{
        color: ColorPalette.text
    },
    Picture:{
        width: 300,
        height: 300,
        marginTop:-50,
    },
    AmountText:{
        color: ColorPalette.text,
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
    }
})
 
export default depositSuccessFull;