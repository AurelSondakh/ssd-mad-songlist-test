import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const YourComponent = ({ text, cover, color }) => {
    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <Text style={styles.text}>{text}</Text>
            <View style={styles.imageWrapper}>
                {cover ? <Image source={cover} style={styles.image} /> : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingBottom: 0,
        paddingTop: 5,
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden',
    },
    text: {
        fontFamily: 'Poppins-SemiBold',
        color: '#FFF',
        fontSize: 16,
    },
    imageWrapper: {
        paddingTop: 38,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
        transform: [{ rotate: '20deg' }],
    },
});

export default YourComponent;
