import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, Platform, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign'

// Components
import HomeSearchViewComponent from "../Components/HomeSearchViewComponent";
import SearchingViewComponent from "../Components/SearchingViewComponent";
import SearchingResultViewComponent from "../Components/SearchResultViewComponent";

const SearchPage = () => {
    const navigation = useNavigation();
    const [isTextInputFocused, setIsTextInputFocused] = useState(false);
    const [searchInput, setSearchInput] = useState('')
    const [searchedStatus, setSearchedStatus] = useState(false)
    const [endEditing, setEndEditing] = useState(false)
    const [entity, setEntity] = useState('All')

    const handleSubmit = () => {
        if (searchInput !== '') {
            setSearchedStatus(true)
        }
    }

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
            {!isTextInputFocused
                ? <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                    <Image source={require('../Assets/Image/splash_image.png')} style={{
                        height: 40,
                        width: 40,
                        resizeMode: 'contain',
                        marginRight: 15
                    }} />
                    <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 24, color: '#FFF' }}>Search</Text>
                </View>
                : null
            }
            <View style={{ backgroundColor: isTextInputFocused ? '#282828' : '#FFF', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, borderRadius: 10 }}>
                {isTextInputFocused
                    ? <TouchableOpacity onPress={() => { setIsTextInputFocused(false); setSearchedStatus(false); setSearchInput('') }}>
                        <AntDesign name={'arrowleft'} color={'#FFF'} size={24} />
                    </TouchableOpacity>
                    :
                    <AntDesign name={'search1'} color={'#000'} size={24} />
                }
                <TextInput
                    placeholder="What do you want to listen to?"
                    placeholderTextColor={isTextInputFocused ? '#A6A6A6' : '#4E4E4E'}
                    style={{
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: 13,
                        marginLeft: 5,
                        flex: 1,
                        color: '#FFF'
                    }}
                    onFocus={() => {setIsTextInputFocused(true)}}
                    onBlur={handleSubmit}
                    value={searchInput}
                    onChangeText={(e) => setSearchInput(e)}
                    onSubmitEditing={handleSubmit}
                    onEndEditing={() => setEndEditing(true)}
                />
                {searchInput !== ''
                    ? <TouchableOpacity onPress={() => { setSearchInput(''); setSearchedStatus(false) }}>
                        <AntDesign name={'close'} color={'#FFF'} size={24} />
                    </TouchableOpacity>
                    : null
                }
            </View>
            {(isTextInputFocused && !searchedStatus)
                ? <SearchingViewComponent />
                : searchedStatus
                    ? <SearchingResultViewComponent term={searchInput} endEditing={endEditing} setEndEditing={setEndEditing} entity={entity} />
                    : <HomeSearchViewComponent setIsTextInputFocused={setIsTextInputFocused} setSearchedStatus={setSearchedStatus} setEntity={setEntity} />
            }
            <View style={{ height: 80 }} />
        </ScrollView>
    )
}

export default SearchPage;
