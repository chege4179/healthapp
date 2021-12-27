import React, {useEffect, useState} from 'react';

import {Text, View, StyleSheet, TouchableOpacity, FlatList, Dimensions, ToastAndroid} from 'react-native';

import {FAB, SearchBar} from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";

import {useSelector} from "react-redux";
import {SelectUser} from "../../ReduxStore/UserReducer";
import BaseURL from "../../BaseURL";
import ChatItem from "../../Components/ChatItem";


const ChatHomePage = ({ navigation }) => {
    const user = useSelector(SelectUser)
    const [chatHomeMessages,setChatHomeMessages] = useState([])
    useEffect(() => {
        FetchChatHomeMessages()
    },[])
    const FetchChatHomeMessages = () => {
        axios.post(`${BaseURL}/chat/chatHomeMessages`,
            { userType:user.userType,fullname:user.fullname })
            .then((res) => {
                setChatHomeMessages(res.data.chats)

            })
            .catch((err) => {
                console.warn(err)
                setChatHomeMessages([])
            })
    }
    navigation.addListener('focus' ,() =>{
        FetchChatHomeMessages()
    })
    const GoToChatPage = () => {
        navigation.navigate('ChatMessagePage')
    }
    const GoToChatSearchPage = () => {
        navigation.navigate('ChatSearchPage')
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={chatHomeMessages}
                renderItem={({ item }) => {
                    return(<ChatItem
                        unread={0}
                        username={item.sender === user?.fullname ? item.receiver : item.sender}
                        lastText={item.message}
                        time={item.createdAt}
                    />)
                }}
                ListHeaderComponent={
                    <SearchBar placeholder='Search Chat...'/>
                }
            />
            {
                user?.userType ==='client' &&(
                    <FAB
                        onPress={GoToChatSearchPage}
                        color='black'
                        title={<MaterialCommunityIcons name='message-reply-text' size={30} color='white'/>}
                        style={styles.fab}
                        size='large'

                    />
                )
            }

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    fab:{
        position:'absolute',
        top:Dimensions.get('screen').height * 0.67,
        left:Dimensions.get('screen').width * 0.79,
        justifyContent:'center',
        alignItems:'center',
        zIndex:1,


    },
})
export default ChatHomePage;
// const data = [
//     {
//         id:1,
//         username:'francis',
//         lastText:'Hi',
//         time:'12:03pm',
//         unread:6
//     },
//     {
//         id:2,
//         username:'wambui',
//         lastText:'Hi Peter',
//         time:'12:03pm',
//         unread:6
//     },
//     {
//         id:4,
//         username:'Kadede',
//         lastText:'Hi Peter',
//         time:'12:03pm',
//         unread:6
//     },
//     {
//         id:5,
//         username:'Allan',
//         lastText:'Hi Peter',
//         time:'12:03pm',
//         unread:6
//     },
//     {
//         id:6,
//         username:'Caesar',
//         lastText:'Hi Peter',
//         time:'12:03pm',
//         unread:4
//     },
//     {
//         id:7,
//         username:'Bob',
//         lastText:'Hi Peter',
//         time:'12:03pm',
//         unread:4
//     },
//     {
//         id:8,
//         username:'Bob',
//         lastText:'Hi Peter',
//         time:'12:03pm',
//         unread:4
//     },
//     {
//         id:9,
//         username:'Bob',
//         lastText:'Hi Peter',
//         time:'12:03pm',
//         unread:4
//     },
//     {
//         id:10,
//         username:'Bob',
//         lastText:'Hi Peter',
//         time:'12:03pm',
//         unread:4
//     },
// ]
