import React, { useState } from "react";
import { View, Text, Modal, SafeAreaView, TouchableOpacity, Dimensions, StyleSheet, Image } from 'react-native';

const width = Dimensions.get('screen').width;

const ErrorModal = ({method}) => {
    const [showErrorModal, setShowErrorModal] = useState(true);

    const closeModalAndRetry = () => {
        setShowErrorModal(false);
        method();
    };

    return (
        <View style={{flex: 1}}>
            <Modal animationType='fade' visible={showErrorModal} transparent={true} statusBarTranslucent>
                <SafeAreaView style={styles.modalDim}>
                    <View style={styles.modalBG}>
                        <View style={styles.modalContent}>
                            <Image source={require('../Assets/Image/ErrorIllust.png')} />
                            <Text style={styles.titleText}>{'Oops, There was a Server Error :('}</Text>
                            <Text style={styles.descText}>
                                Sorry, there was an error in our system or your connection.{'\n'}Can you try again?
                            </Text>
                            <View style={{justifyContent: 'center', marginTop: 17}}>
                                <TouchableOpacity onPress={closeModalAndRetry} style={styles.approveButton}>
                                    <Text style={styles.buttonText}>
                                        Try Again!
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>
        </View>
    );
};

export default ErrorModal;

const styles = StyleSheet.create({
    modalDim: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalBG: {
        borderRadius: 15,
        backgroundColor: '#FFF',
        overflow: 'hidden',
        width: width * 0.95,
        paddingVertical: 20,
        paddingHorizontal: 15
    },
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 15
    },
    titleText: {
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        marginBottom: 4,
        marginTop: 16,
        color: '#3B3B3B'
    },
    descText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
        paddingHorizontal: 10,
        textAlign: 'center',
        color: '#898A8D'
    },
    approveButton: {
        backgroundColor: '#E97802',
        borderRadius: 10,
        paddingVertical: 12,
        width: width / 1.5,
        marginLeft: 10
    },
    buttonText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        color: '#FFF',
        alignSelf: 'center'
    },
});
