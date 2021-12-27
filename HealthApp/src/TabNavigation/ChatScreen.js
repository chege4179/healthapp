import React, {useLayoutEffect} from 'react';

import {Text, View, StyleSheet, Platform, Image, SafeAreaView} from 'react-native';
import {GiftedChat} from "react-native-gifted-chat";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import ChatItem from "../Components/ChatItem";
import {createStackNavigator} from "@react-navigation/stack";
import ChatHomePage from "./Chat/ChatHomePage";
import ChatMessagePage from "./Chat/ChatMessagePage";
import ChatProfilePage from "./Chat/ChatProfilePage";
import ChatSearchPage from "./Chat/ChatSearchPage";
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";

const Stack = createStackNavigator()
const ChatScreen = ({ navigation,route }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            tabBarVisible:getFocusedRouteNameFromRoute(route) !== 'ChatMessagePage'
        })
    },[])

    return (
        <Stack.Navigator>
            <Stack.Screen name='ChatHomePage' component={ChatHomePage} options={{
                headerShown:false
            }}/>
            <Stack.Screen name='ChatMessagePage' component={ChatMessagePage}/>
            <Stack.Screen name='ChatProfilePage' component={ChatProfilePage} options={{
                headerShown:false
            }}/>

            <Stack.Screen name='ChatSearchPage' component={ChatSearchPage} options={{
                headerShown:false
            }}/>
        </Stack.Navigator>


    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    }
})
export default ChatScreen;
const messages = [
    {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
    },
    {
        _id: 2,
        text: 'Hello developer',
        createdAt: new Date(),
        image: 'https://facebook.github.io/react/img/logo_og.png',
        user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
    },
    {
        _id: 42,
        text: 'Hello developer',
        createdAt: new Date(),
        image: 'https://facebook.github.io/react/img/logo_og.png',
        user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
    },
    {
        _id: 22,
        text: 'Hello developer',
        createdAt: new Date(),
        image: 'https://facebook.github.io/react/img/logo_og.png',
        user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
    },
    {
        _id: 12,
        text: 'Hello developer',
        createdAt: new Date(),
        image: 'https://facebook.github.io/react/img/logo_og.png',
        user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
    },
]
