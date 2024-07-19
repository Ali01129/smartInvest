import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from '@expo/vector-icons';
import SizedBox from "./sizedbox";
import { ColorPalette } from '@/constants/Colors';

interface PortfolioHeaderProps {
    title: string;
    settingsAction: () => void;
    usd: string;
    sc: string;
}

const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({ title, settingsAction, usd, sc }) => {
    return (
        <View style={{ paddingHorizontal: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity onPress={settingsAction}>
                    <MaterialIcons name="logout" size={24} color={ColorPalette.text} />
                    {/* <Ionicons name="settings-sharp" size={24} color={ColorPalette.text} /> */}
                </TouchableOpacity>
            </View>
            <SizedBox height={16} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={styles.box}>
                    <Text style={styles.subtitle}>USD</Text>
                    <SizedBox height={5} />
                    <Text style={styles.boxTitle}>$ {usd}</Text>
                </View>
                <View style={[styles.box, { marginLeft: 16 }]}>
                    <Text style={styles.subtitle}>SC</Text>
                    <SizedBox height={5} />
                    <Text style={styles.boxTitle}>{sc}</Text>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: ColorPalette.background,
        paddingVertical: 16,
    },
    title: {
        color: ColorPalette.text,
        fontSize: 25,
        fontWeight: 'bold',
    },
    subtitle: {
        color: ColorPalette.primary,
        fontSize: 15,
    },
    boxTitle: {
        color: ColorPalette.text,
        fontSize: 20,
        fontWeight: "600",
    },
    box: {
        flex: 1,
        borderWidth: 1,
        backgroundColor: ColorPalette.greyNav,
        padding: 10,
        borderRadius: 10,
        elevation: 5,
    },
    sectionTitle: {
        color: ColorPalette.text,
        fontSize: 20,
        fontWeight: 'bold',
    },
});


export default PortfolioHeader;
