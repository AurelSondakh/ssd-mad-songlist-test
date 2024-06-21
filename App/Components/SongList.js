import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from "../Redux/Reducers/Favorites";

const width = Dimensions.get('screen').width

const SongList = ({ item }) => {

    const navigation = useNavigation()
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites);
    const capitalizeFirstLetter = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const handleFavoritePress = () => {
        dispatch(toggleFavorite(item));
    };
    const isFavorite = favorites.some(fav => fav.trackId === item.trackId);

    return (
        <TouchableOpacity onPress={() => { navigation.navigate('SongDetailScreen', { item }) }} style={styles.container}>
            <View style={{ marginRight: 10 }}>
                <Image style={{ width: 40, height: 40 }} source={{ uri: `${item?.artworkUrl100}` }} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, color: '#FCFCFC', fontFamily: 'Poppins-SemiBold', maxWidth: width - 100 }}>
                    {item?.trackName}
                </Text>
                <Text style={{ fontSize: 12, color: '#A3A3A3', fontFamily: 'Poppins-Medium' }}>{capitalizeFirstLetter(item?.kind)} - {item?.artistName}</Text>
            </View>
            <TouchableOpacity onPress={handleFavoritePress}>
                <AntDesign name={isFavorite ? 'heart' : 'hearto'} color={'#1DB954'} size={24} />
            </TouchableOpacity>
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