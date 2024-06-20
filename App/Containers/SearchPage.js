import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, Platform, TextInput, Image, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import musicCover from '../Assets/Image/music_cover.jpg'
import musicVideoCover from '../Assets/Image/music_video_cover.jpg'
import artistCover from '../Assets/Image/artist_cover.jpg'

// Components
import SearchCategoryComponent from "../Components/SearchCategoryComponent";

const SearchPage = () => {

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
        <ScrollView style={{ flex: 1, backgroundColor: '#000', paddingHorizontal: 15, paddingTop: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                <Image source={require('../Assets/Image/splash_image.png')} style={{
                    height: 40,
                    width: 40,
                    resizeMode: 'contain',
                    marginRight: 15
                }} />
                <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 24, color: '#FFF' }}>Search</Text>
            </View>
            <View style={{ backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, borderRadius: 10 }}>
                <AntDesign name={'search1'} color={'#000'} size={24} />
                <TextInput
                    placeholder="What do you want to listen to?"
                    placeholderTextColor={'#4E4E4E'}
                    style={{
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: 13,
                        marginLeft: 3,
                        flex: 1
                    }}
                />
            </View>
            <Text style={{ marginVertical: 15, color: '#FFF', fontFamily: 'Poppins-SemiBold' }}>Start browsing</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 15, marginBottom: 15 }}>
                <SearchCategoryComponent text={'Music'} color={'#DB148B'} cover={musicCover} />
                <SearchCategoryComponent text={'Music Video'} color={'#016450'} cover={musicVideoCover} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 15 }}>
                <SearchCategoryComponent text={'Artist'} color={'#8400E7'} cover={artistCover} />
                <SearchCategoryComponent />
            </View>
            <Text style={{ marginVertical: 15, color: '#FFF', fontFamily: 'Poppins-SemiBold' }}>Recommended Stations</Text>
        </ScrollView>
    )
}

export default SearchPage