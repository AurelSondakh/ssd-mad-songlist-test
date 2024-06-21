import React from "react";
import { View, Text, StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const ArtistList = ({ item }) => {
    return (
        <View style={styles.container}>
            <View style={{ marginRight: 10 }}>
                <FontAwesome name={'user-circle'} color={'#DAD5D1'} size={38} />
            </View>
            <View>
                <View style={{ flexDirection: 'row'}}>
                    <Text style={{ fontSize: 14, color: '#FCFCFC', fontFamily: 'Poppins-SemiBold' }}>
                        {item?.artistName}
                    </Text>
                    <MaterialIcons name={'verified'} color={'#1C6DD3'} size={16} style={{ marginTop: 2, marginLeft: 3 }} />
                </View>
                <Text style={{ fontSize: 12, color: '#A3A3A3', fontFamily: 'Poppins-Medium' }}>{item?.artistType}</Text>
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

export default ArtistList