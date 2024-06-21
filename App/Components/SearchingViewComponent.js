import React from "react";
import { View, Text, Dimensions } from 'react-native'

const SearchingViewComponent = () => {

    const width = Dimensions.get('screen').width

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: width / 1.25 }}>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 24, color: '#FFF' }}>Play what you love</Text>
            <Text style={{ fontFamily: 'Poppins-Regular', color: '#ABABAB', textAlign: 'center' }}>Search for artist, songs, and music video.</Text>
        </View>
    )
}

export default SearchingViewComponent