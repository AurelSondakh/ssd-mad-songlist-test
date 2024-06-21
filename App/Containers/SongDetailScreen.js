import React, { useEffect } from "react";
import { View, Text, StatusBar, ImageBackground, Dimensions, Platform, TouchableOpacity, Image, Linking } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const SongDetailScreen = (props) => {
    const navigation = useNavigation();
    const item = props?.route?.params?.item;
    const screenWidth = Dimensions.get('screen').width;
    const highResArtworkUrl = item?.artworkUrl100.replace('100x100', `600x600`);
    const releaseDate = new Date(item?.releaseDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    const capitalizeFirstLetter = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const handlePressTrackViewUrl = () => {
        if (item?.trackViewUrl) {
            Linking.openURL(item.trackViewUrl);
        }
    };

    useEffect(() => {
        const handleFocus = () => {
            if (Platform.OS === 'android') {
                StatusBar.setBackgroundColor('transparent');
            }
            StatusBar.setBarStyle('light-content');
            StatusBar.setTranslucent(true);
        };

        const handleBlur = () => {
            if (Platform.OS === 'android') {
                StatusBar.setBackgroundColor('#000');
            }
            StatusBar.setBarStyle('light-content');
            StatusBar.setTranslucent(false);
        };

        const unsubscribeFocus = navigation.addListener('focus', handleFocus);
        const unsubscribeBlur = navigation.addListener('blur', handleBlur);

        return () => {
            unsubscribeFocus();
            unsubscribeBlur();
        };
    }, [navigation]);

    return (
        <View style={{ flex: 1, backgroundColor: '#191414' }}>
            <ImageBackground
                style={{
                    width: screenWidth,
                    height: screenWidth,
                }}
                source={{ uri: highResArtworkUrl }}
                resizeMode="cover"
            >
                <View style={{ flex: 1, paddingTop: 60, paddingHorizontal: 20, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <AntDesign name={'arrowleft'} color={'#FFF'} size={24} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <AntDesign name={'hearto'} color={'#1DB954'} size={24} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
            <View style={{ marginTop: -screenWidth / 5 }}>
                <View style={{ padding: 20, backgroundColor: 'rgba(24, 24, 24, 0.8)', marginHorizontal: 20, borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginRight: 10 }}>
                            <Image style={{ width: 60, height: 60, borderRadius: 10 }} source={{ uri: `${item?.artworkUrl100}` }} />
                        </View>
                        <View>
                            <Text style={{ fontSize: 18, color: '#FFFFFF', fontFamily: 'Poppins-SemiBold', maxWidth: screenWidth - 100 }}>
                                {item?.trackName}
                            </Text>
                            <Text style={{ fontSize: 14, color: '#B3B3B3', fontFamily: 'Poppins-Medium' }}>{item?.artistName}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <View>
                            <Text style={{ color: '#FFFFFF', fontFamily: 'Poppins-SemiBold', fontSize: 16 }}>{capitalizeFirstLetter(item?.kind)}</Text>
                            <Text style={{ color: '#B3B3B3', fontFamily: 'Poppins-Medium', fontSize: 12 }}>Kind</Text>
                        </View>
                        <View>
                            <Text style={{ color: '#FFFFFF', fontFamily: 'Poppins-SemiBold', fontSize: 16 }}>USD {item?.trackPrice}</Text>
                            <Text style={{ color: '#B3B3B3', fontFamily: 'Poppins-Medium', fontSize: 12 }}>Track Price</Text>
                        </View>
                        <View>
                            <Text style={{ color: '#FFFFFF', fontFamily: 'Poppins-SemiBold', fontSize: 16 }}>USD {item?.collectionPrice}</Text>
                            <Text style={{ color: '#B3B3B3', fontFamily: 'Poppins-Medium', fontSize: 12 }}>Collection Price</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ paddingBottom: 25, borderBottomWidth: 1, borderColor: '#B2B2B2' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginHorizontal: 30 }}>
                    <View>
                        <Text style={{ color: '#FFFFFF', fontFamily: 'Poppins-SemiBold', fontSize: 16, maxWidth: screenWidth - 250 }}>{item?.collectionName}</Text>
                        <Text style={{ color: '#B3B3B3', fontFamily: 'Poppins-Medium', fontSize: 12 }}>Collection Name</Text>
                    </View>
                    <View>
                        <Text style={{ color: '#FFFFFF', fontFamily: 'Poppins-SemiBold', fontSize: 16, maxWidth: screenWidth - 250 }}>{item?.collectionArtistName ?? item?.artistName}</Text>
                        <Text style={{ color: '#B3B3B3', fontFamily: 'Poppins-Medium', fontSize: 12 }}>Collection Artist Name</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginHorizontal: 30 }}>
                    <View>
                        <Text style={{ color: '#FFFFFF', fontFamily: 'Poppins-SemiBold', fontSize: 16, maxWidth: screenWidth - 250 }}>{item?.country}</Text>
                        <Text style={{ color: '#B3B3B3', fontFamily: 'Poppins-Medium', fontSize: 12 }}>Country</Text>
                    </View>
                    <View>
                        <Text style={{ color: '#FFFFFF', fontFamily: 'Poppins-SemiBold', fontSize: 16, maxWidth: screenWidth - 250 }}>{releaseDate}</Text>
                        <Text style={{ color: '#B3B3B3', fontFamily: 'Poppins-Medium', fontSize: 12 }}>Release Date</Text>
                    </View>
                </View>
            </View>
            <View style={{ alignSelf: 'center', marginTop: 15 }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#1DB954',
                        paddingVertical: 10,
                        paddingHorizontal: 30,
                        borderRadius: 5,
                        marginTop: 20,
                        alignSelf: 'flex-start'
                    }}
                    onPress={handlePressTrackViewUrl}
                >
                    <Text style={{ color: '#FFFFFF', fontFamily: 'Poppins-SemiBold', fontSize: 14 }}>Open Track</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default SongDetailScreen;
