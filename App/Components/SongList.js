import React from "react";
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const width = Dimensions.get('screen').width

const SongList = ({ item }) => {

    const capitalizeFirstLetter = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    return (
        <View style={styles.container}>
            <View style={{ marginRight: 10 }}>
                <FontAwesome name={'user-circle'} color={'#DAD5D1'} size={38} />
            </View>
            <View>
                <Text style={{ fontSize: 14, color: '#FCFCFC', fontFamily: 'Poppins-SemiBold', maxWidth: width - 100 }}>
                    {item?.trackName}
                </Text>
                <Text style={{ fontSize: 12, color: '#A3A3A3', fontFamily: 'Poppins-Medium' }}>{capitalizeFirstLetter(item?.kind)} - {item?.artistName}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
})

export default SongList