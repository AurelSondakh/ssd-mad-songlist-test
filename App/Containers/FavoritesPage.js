import React, { useEffect } from "react";
import { View, Text, StatusBar, FlatList, Image, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import SongList from "../Components/SongList";

const FavoritesPage = () => {

    const navigation = useNavigation()
    const favorites = useSelector((state) => state.favorites);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (Platform.OS === 'android') {
                StatusBar.setBackgroundColor('#000');
            }
            StatusBar.setBarStyle('light-content');
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#000', paddingHorizontal: 15, paddingTop: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                <Image source={require('../Assets/Image/splash_image.png')} style={{
                    height: 40,
                    width: 40,
                    resizeMode: 'contain',
                    marginRight: 15
                }} />
                <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 24, color: '#FFF' }}>Favorites</Text>
            </View>
            <Text style={{ marginTop: 5, color: '#FFF', fontFamily: 'Poppins-SemiBold', fontSize: 24 }}>Your Favorites Song</Text>
            <View style={{ marginTop: 5 }}>
                <FlatList
                    nestedScrollEnabled={false}
                    data={favorites}
                    renderItem={({ index, item }) => <SongList item={item} />}
                    keyExtractor={(item) => `${item.trackId}`} />
            </View>
        </ScrollView>
    )
}

export default FavoritesPage