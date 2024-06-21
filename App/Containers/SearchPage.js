import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, Platform, TextInput, Image, ScrollView, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign'
import musicCover from '../Assets/Image/music_cover.jpg'
import musicVideoCover from '../Assets/Image/music_video_cover.jpg'
import artistCover from '../Assets/Image/artist_cover.jpg'
import { ActionMusic } from "../Redux/Actions";
import Spinner from 'react-native-loading-spinner-overlay';

// Components
import SearchCategoryComponent from "../Components/SearchCategoryComponent";
import SongList from "../Components/SongList";
import ArtistList from "../Components/ArtistList";
import ErrorModal from "../Components/ErrorModal";

const SearchPage = () => {

    const navigation = useNavigation()
    const dispatch = useDispatch();
    const { reccomendedStationListArtist, reccomendedStationListSong, musicSpinner, errorModal } = useSelector((state) => state.music);

    const getRecommendedStation = () => {
        try {
            let term = encodeURIComponent('The Chainsmokers').replace(/%20/g, '+');
            dispatch(
                ActionMusic.GetRecommendedStation(term),
            );
        } catch (error) {
            console.log('Error Get Recommended Station: ', error);
        }
    }

    useEffect(() => {
        getRecommendedStation()
    }, [])

    console.log('Artist ', reccomendedStationListArtist)
    console.log('Song ', reccomendedStationListSong)

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
            <Text style={{ marginTop: 15, color: '#FFF', fontFamily: 'Poppins-SemiBold' }}>Recommended Stations</Text>
            <Text style={{ marginTop: 5, color: '#FFF', fontFamily: 'Poppins-SemiBold', fontSize: 24 }}>Artists</Text>
            <View style={{ marginTop: 5 }}>
                {!errorModal
                    ? <FlatList
                        nestedScrollEnabled={false}
                        data={reccomendedStationListArtist?.results}
                        renderItem={({ index, item }) => <ArtistList item={item} />}
                        keyExtractor={(item) => `${item.artistId}`}
                    />
                    : <ErrorModal method={getRecommendedStation} />}
            </View>
            <Text style={{ marginTop: 5, color: '#FFF', fontFamily: 'Poppins-SemiBold', fontSize: 24 }}>Songs</Text>
            <View style={{ marginTop: 5 }}>
                {!errorModal
                    ? <FlatList
                        style={{}}
                        nestedScrollEnabled={false}
                        data={reccomendedStationListSong?.results}
                        renderItem={({ index, item }) => <SongList item={item} />}
                        keyExtractor={(item) => `${item.trackId}`}
                    />
                    : <ErrorModal method={getRecommendedStation} />}
            </View>
            <Spinner
                testID="spinner"
                visible={musicSpinner}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <View style={{ height: 80 }} />
        </ScrollView>
    )
}

export default SearchPage