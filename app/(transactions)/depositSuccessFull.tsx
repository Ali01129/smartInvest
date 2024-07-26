import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet, View, Image } from "react-native";
import { ColorPalette } from "@/constants/Colors";
import Images from "@/constants/Images";
import CustomSolidButton from "@/components/CustomSolidButton";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

const depositSuccessFull = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Header}>
        <Text style={styles.UpperText}>Deposit Successful</Text>
        <Text style={styles.LowerText}>
          Your fund are now available for use
        </Text>
        <Image
          source={Images.deposit}
          resizeMode="contain"
          style={styles.Picture}
        />
      </View>
      <Text style={styles.AmountText}>USD 500.00</Text>
      <View style={styles.transactionDetail}>
        <Image source={Images.transactionlogo} />
        <View style={{ marginLeft: 15 }}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Successfully paid to UXUI Partner
          </Text>
          <Text style={{ color: "#f2f2f0", fontWeight: "400" }}>
            24 Nov 2024, 1:43 PM
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 50,
        }}
      >
        <View>
          <Text style={styles.DetailText}>Reference ID</Text>
          <Text style={styles.DetailText}>Payment method</Text>
          <Text style={styles.DetailText}>Updated balance</Text>
        </View>
        <View>
          <Text style={styles.DetailText}>PRN23456</Text>
          <Text style={styles.DetailText}>Strip </Text>
          <Text style={styles.DetailText}>$1000.00</Text>
        </View>
      </View>

      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "flex-end" }}
      >
        <CustomSolidButton
          text={"Back to homepage"}
          onPress={() => router.push("home")}
          gradientColors={[ColorPalette.g2, ColorPalette.secondary]}
          textColor={ColorPalette.textBlack}
        />
      </View>
      <StatusBar backgroundColor={ColorPalette.background} style="light" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: ColorPalette.background,
    padding: 16,
  },
  Header: {
    alignItems: "center",
  },
  UpperText: {
    color: ColorPalette.text,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  LowerText: {
    color: ColorPalette.text,
  },
  Picture: {
    width: 300,
    height: 300,
    marginTop: -50,
  },
  AmountText: {
    color: ColorPalette.text,
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
  },
  transactionDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },
  DetailText: {
    color: "#f2f2f0",
    fontWeight: "400",
    marginBottom: 10,
  },
});

export default depositSuccessFull;
