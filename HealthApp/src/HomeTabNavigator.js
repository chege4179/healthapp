import React, {useLayoutEffect} from 'react';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {UserActions} from "./ReduxStore/UserConstants";
import {SelectUser} from "./ReduxStore/UserReducer";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "./TabNavigation/HomeScreen";
import ChatScreen from "./TabNavigation/ChatScreen";
import ProfileScreen from "./TabNavigation/ProfileScreen";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";

const Tab  = createBottomTabNavigator()
const HomeTabNavigator = ({ navigation }) => {
    const dispatch = useDispatch()

    const LogoutUser = () => {
        dispatch({
            type:UserActions.LOGOUT_SUCCESS
        })
    }

    return (
        <Tab.Navigator screenOptions={{
            tabBarShowLabel:false,
            tabBarHideOnKeyboard:true

        }}>
            <Tab.Screen name='HomeScreen' component={HomeScreen} options={{
                tabBarIcon:() => {
                    return(<Entypo name='home' size={30}/>)
                },
                headerShown:false
            }}/>
            <Tab.Screen name='ChatScreen' component={ChatScreen} options={{
                tabBarIcon:()=> {
                    return(<MaterialIcons name='message' size={30}/>)
                },
                headerShown:false,

            }}/>
            <Tab.Screen name='ProfileScreen' component={ProfileScreen} options={{
                tabBarIcon:()=> {
                    return(<EvilIcons name='user' size={30}/>)
                },

            }}/>
        </Tab.Navigator>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    }
})
export default HomeTabNavigator;
