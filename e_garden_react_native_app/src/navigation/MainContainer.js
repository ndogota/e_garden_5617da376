import * as React from 'react';

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import HomeScreen from "../screens/HomeScreen";
import MarketScreen from "../screens/MarketScreen";
import ForumScreen from "../screens/ForumScreen";
import UserScreen from "../screens/UserScreen";
import SettingsScreen from "../screens/SettingsScreen";

// Screen names
const homeName = 'Home';
const marketName = 'Market';
const forumName = 'Forum';
const userName = 'User';
const settingsName = 'Settings';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return(
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let routeName = route.name;

                    if (routeName === homeName) {
                        iconName = focused ? 'leaf' : 'leaf-outline'
                    } else if (routeName === marketName) {
                        iconName = focused ? 'card' : 'card-outline'
                    } else if (routeName === forumName) {
                        iconName = focused ? 'people' : 'people-outline'
                    } else if (routeName === userName) {
                        iconName = focused ? 'person' : 'person-outline'
                    } else if (routeName === settingsName) {
                        iconName = focused ? 'settings' : 'settings-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={color} />
                },

                headerTintColor: '#fff',
                headerTitleStyle: { fontSize: 24, fontWeight: 'bold'},
                headerStyle: { backgroundColor: '#90DC55'},

                tabBarActiveTintColor: '#90DC55',
                tabBarInactiveTintColor: 'grey',
                tabBarLabelStyle: { paddingBottom: 10, fontSize: 14, fontWeight: 'bold'},
                tabBarStyle: { padding: 10, height: 70 }
            })}

            >

                <Tab.Screen name={marketName} component={MarketScreen}/>
                <Tab.Screen name={forumName} component={ForumScreen}/>
                <Tab.Screen name={homeName} component={HomeScreen}/>
                <Tab.Screen name={userName} component={UserScreen}/>
                <Tab.Screen name={settingsName} component={SettingsScreen}/>

            </Tab.Navigator>
        </NavigationContainer>
    )
}