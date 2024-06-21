import React, { useEffect } from "react";
import { View, Text, Dimensions, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { ActionMusic } from "../Redux/Actions";
import Spinner from 'react-native-loading-spinner-overlay';

// Components
import SongList from "./SongList";
import ArtistList from "./ArtistList";
import ErrorModal from "./ErrorModal";

const SearchingResultViewComponent = ({ term, endEditing, setEndEditing, entity }) => {

    const width = Dimensions.get('screen').width
    const dispatch = useDispatch();
    const { searchedTermListSong, searchedTermListArtist, musicSpinner, errorModal } = useSelector((state) => state.music);

    const GetSearchedTerm = () => {
        console.log('ENTITY: ', entity)
        try {
            let encodedTerm = encodeURIComponent(term).replace(/%20/g, '+');
            dispatch(
                ActionMusic.GetSearchedTerm(encodedTerm, entity),
            );
        } catch (error) {
            console.log('Error Get Searched Term: ', error);
        }
    }

    useEffect(() => {
        if (endEditing) {
            GetSearchedTerm()
            setEndEditing(false)
        }
    }, [endEditing])

    console.log('Artist ', searchedTermListArtist)
    console.log('Song ', searchedTermListSong)

    return (
        <>
            <Text style={{ marginTop: 15, color: '#FFF', fontFamily: 'Poppins-SemiBold' }}>Results</Text>
            {(searchedTermListArtist?.resultCount == 0 && (searchedTermListSong?.resultCount == 0))
                ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: width / 1.25 }}>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 24, color: '#FFF' }}>Result Not Found</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', color: '#ABABAB', textAlign: 'center' }}>Try to search another</Text>
                </View>
                : null
            }
            {(searchedTermListArtist?.resultCount > 0)
                ? <><Text style={{ marginTop: 5, color: '#FFF', fontFamily: 'Poppins-SemiBold', fontSize: 24 }}>Artists</Text>
                    <View style={{ marginTop: 5 }}>
                        {!errorModal
                            ? <FlatList
                                nestedScrollEnabled={false}
                                data={searchedTermListArtist?.results}
                                renderItem={({ index, item }) => <ArtistList item={item} />}
                                keyExtractor={(item) => `${item.artistId}`} />
                            : <ErrorModal method={GetSearchedTerm} />}
                    </View>
                </>
                : null
            }
            {(searchedTermListSong?.resultCount > 0)
                ? <><Text style={{ marginTop: 5, color: '#FFF', fontFamily: 'Poppins-SemiBold', fontSize: 24 }}>Songs</Text>
                    <View style={{ marginTop: 5 }}>
                        {!errorModal
                            ? <FlatList
                                style={{}}
                                nestedScrollEnabled={false}
                                data={searchedTermListSong?.results}
                                renderItem={({ index, item }) => <SongList item={item} />}
                                keyExtractor={(item) => `${item.trackId}`} />
                            : <ErrorModal method={GetSearchedTerm} />}
                    </View>
                </>
                : null
            }

            <Spinner
                testID="spinner"
                visible={musicSpinner}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }} />
        </>
    )
}

export default SearchingResultViewComponent