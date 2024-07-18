import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CustomSolidButtonProps {
    gradientColors: string[];
    text: string;
    onPress: (event: GestureResponderEvent) => void;
    textColor?: string; // Making it optional with default value
}

const CustomSolidButton: React.FC<CustomSolidButtonProps> = ({ gradientColors, text, onPress, textColor = '#fff' }) => {
    return (
        <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
        >
            <TouchableOpacity
                style={styles.createButton}
                onPress={onPress}
            >
                <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    createButton: {
        padding: 8,
        height: 55,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradient: {
        borderRadius: 10,
    },
});

export default CustomSolidButton;
