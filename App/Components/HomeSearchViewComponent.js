import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ActionMusic } from "../Redux/Actions";
import Spinner from 'react-native-loading-spinner-overlay';

// Images
import musicCover from '../Assets/Image/music_cover.jpg'
import musicVideoCover from '../Assets/Image/music_video_cover.jpg'
import artistCover from '../Assets/Image/artist_cover.jpg'

// Components
import SearchCategoryComponent from "./SearchCategoryComponent";
import SongList from "./SongList";
import ArtistList from "./ArtistList";
import ErrorModal from "./ErrorModal";

const HomeSearchViewComponent = ({ setIsTextInputFocused, setSearchedStatus, setEntity }) => {

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
        if (reccomendedStationListArtist.length === 0 && reccomendedStationListSong.length === 0) {
            getRecommendedStation()
        }
        setIsTextInputFocused(false)
        setSearchedStatus(false)
        setEntity('All')
    }, [])

    console.log('Artist ', reccomendedStationListArtist)
    console.log('Song ', reccomendedStationListSong)

    return (
        <>
            <Text style={{ marginVertical: 15, color: '#FFF', fontFamily: 'Poppins-SemiBold' }}>Start filtered browsing</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 15, marginBottom: 15 }}>
                <TouchableOpacity onPress={() => {setIsTextInputFocused(true); setEntity('song')}} style={{ flex: 1 }}>
                    <SearchCategoryComponent text={'Music'} color={'#DB148B'} cover={musicCover} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setIsTextInputFocused(true); setEntity('musicVideo')}} style={{ flex: 1 }}>
                    <SearchCategoryComponent text={'Music Video'} color={'#016450'} cover={musicVideoCover} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 15 }}>
                <TouchableOpacity onPress={() => {setIsTextInputFocused(true); setEntity('musicArtist')}} style={{ flex: 1 }}>
                    <SearchCategoryComponent text={'Artist'} color={'#8400E7'} cover={artistCover} />
                </TouchableOpacity>
                <TouchableOpacity disabled={true} style={{ flex: 1 }}>
                    <SearchCategoryComponent />
                </TouchableOpacity>
            </View>
            <Text style={{ marginTop: 15, color: '#FFF', fontFamily: 'Poppins-SemiBold' }}>Recommended Stations</Text>
            <Text style={{ marginTop: 5, color: '#FFF', fontFamily: 'Poppins-SemiBold', fontSize: 24 }}>Artists</Text>
            <View style={{ marginTop: 5 }}>
                {!errorModal
                    ? <FlatList
                        nestedScrollEnabled={false}
                        data={reccomendedStationListArtist?.results}
                        renderItem={({ index, item }) => <ArtistList item={item} />}
                        keyExtractor={(item) => `${item.artistId}`} />
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
                        keyExtractor={(item) => `${item.trackId}`} />
                    : <ErrorModal method={getRecommendedStation} />}
            </View>
            <Spinner
                testID="spinner"
                visible={musicSpinner}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
        </>
    )
}

export default HomeSearchViewComponent