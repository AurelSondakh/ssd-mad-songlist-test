import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get('screen').width

const SongList = ({ item }) => {

    const navigation = useNavigation()
    const capitalizeFirstLetter = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    return (
        <TouchableOpacity onPress={() => {navigation.navigate('SongDetailScreen', { item })}} style={styles.container}>
            <View style={{ marginRight: 10 }}>
                <Image style={{ width: 40, height: 40 }} source={{ uri: `${item?.artworkUrl100}` }} />
            </View>
            <View>
                <Text style={{ fontSize: 14, color: '#FCFCFC', fontFamily: 'Poppins-SemiBold', maxWidth: width - 100 }}>
                    {item?.trackName}
                </Text>
                <Text style={{ fontSize: 12, color: '#A3A3A3', fontFamily: 'Poppins-Medium' }}>{capitalizeFirstLetter(item?.kind)} - {item?.artistName}</Text>
            </View>
        </TouchableOpacity>
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