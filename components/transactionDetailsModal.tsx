import React, { useRef } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
import { ColorPalette } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

interface TransactionDetailsModalProps {
    visible: boolean;
    onClose: () => void;
    transaction: {
        _id: string;
        date: string;
        amount: string;
        name: string;
        type: string;
    } | null;
}

const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({ visible, onClose, transaction }) => {
    const viewShotRef = useRef(null);

    if (!transaction) return null;

    const captureScreenshot = async () => {
        if (viewShotRef.current) {
            const uri = await viewShotRef.current.capture();
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status === 'granted') {
                await MediaLibrary.saveToLibraryAsync(uri);
                await Sharing.shareAsync(uri);
            }
        }
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 0.9 }}>
                        <View style={{ backgroundColor: ColorPalette.background, padding: 16 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, }}>
                                <Text style={styles.title}>Transaction Details</Text>
                                <MaterialIcons name="download-for-offline" size={24} color={ColorPalette.secondary} onPress={captureScreenshot} />
                            </View>
                            <Text style={styles.detail}>ID: {transaction._id}</Text>
                            <Text style={styles.detail}>
                                {transaction.type === 'sent' ? `To: ${transaction.name}` : `From: ${transaction.name}`}
                            </Text>
                            <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                <Text style={styles.detail}> {transaction.amount}</Text>
                                <Text style={styles.detail}>{transaction.date}</Text>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <MaterialIcons name="qr-code-2" size={200} color="white" />
                            </View>
                        </View>
                    </ViewShot>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={[ColorPalette.g2, ColorPalette.secondary]}
                        style={{ borderRadius: 15, }}>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </Modal>
    );
};

export default TransactionDetailsModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: ColorPalette.background,
        padding: 16,
        borderRadius: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: ColorPalette.text,
    },
    detail: {
        fontSize: 16,
        marginBottom: 5,
        color: ColorPalette.text,
    },
    closeButton: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 15,
    },
    closeButtonText: {
        color: ColorPalette.background,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
