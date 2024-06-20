import React, { useEffect } from "react";
import { View, Text, StatusBar, Platform } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const FavoritesPage = () => {

    const navigation = useNavigation()

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
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <Text style={{ color: '#FFF' }}>FAVORITES PAGE</Text>
        </View>
    )
}

export default FavoritesPage