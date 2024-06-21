import React from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SearchPage from '../Containers/SearchPage';
import FavoritesPage from '../Containers/FavoritesPage';
import SongDetailScreen from '../Containers/SongDetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {

    const TabBar = () => {
        return (
            <>
                <Tab.Navigator
                    initialRouteName='Search'
                    screenOptions={{
                        tabBarLabelStyle: { display: 'none' },
                        tabBarStyle: {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            borderTopWidth: 0,
                            position: 'absolute',
                            height: 64
                        },
                        tabBarItemStyle: {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        tabBarHideOnKeyboard: true
                    }}
                    
                >
                    <Tab.Screen
                        name='Search' component={SearchPage} options={{
                            tabBarIcon: ({ focused }) => {
                                const colorFocused = focused ? '#FFF' : '#B8AFB2'
                                const iconName = focused ? 'search' : 'search-plus'
                                return (
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <FontAwesome name={iconName} color={colorFocused} size={24} />
                                        <Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold', color: colorFocused, paddingTop: 4 }}>Search</Text>
                                    </View>
                                )
                            },
                            headerShown: false
                        }}
                    />
                    <Tab.Screen
                        name='Favorites' component={FavoritesPage} options={{
                            tabBarIcon: ({ focused }) => {
                                const colorFocused = focused ? '#FFF' : '#B8AFB2'
                                const iconName = focused ? 'heart' : 'heart-o'
                                return (
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <FontAwesome name={iconName} color={colorFocused} size={24} />
                                        <Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold', color: colorFocused, paddingTop: 4 }}>Favorites</Text>
                                    </View>
                                )
                            },
                            headerShown: false
                        }}
                    />
                </Tab.Navigator>
            </>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='BottomTabNavigator'>
                <Stack.Screen name="BottomTabNavigator" component={TabBar} options={{ headerShown: false }} />
                <Stack.Screen name="SongDetailScreen" component={SongDetailScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;