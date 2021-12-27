import React, {useEffect, useLayoutEffect, useState} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity,
    TextInput, FlatList, KeyboardAvoidingView, Platform, ToastAndroid } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import {useSelector} from "react-redux";
import moment from "moment";
import {SelectUser} from "../../ReduxStore/UserReducer";
import {GiftedChat} from "react-native-gifted-chat";
import axios from "axios";
import BaseURL from "../../BaseURL";
import messaging from "@react-native-firebase/messaging";

const ChatMessagePage = ({ navigation,route }) => {
    const user = useSelector(SelectUser)
    const { fullName } = route.params
    const [messages,setMessages] = useState([])
    useEffect(() => {
        messaging().onNotificationOpenedApp((remoteMessage) => {
            fetchMessages()
        })
    })
    useEffect(() => {
        messaging().onMessage((message) => {
            fetchMessages()
        })
    },[])
    function fetchMessages() {
        if(user.userType ==='client'){
            axios.get(`${BaseURL}/chat/all?client=${user.fullname}&doctor=${fullName}`)
                .then((res) => {
                    const MessagesFormat = res.data.messages.map((message) => {
                        return {
                            _id:message.messageId,
                            text:message.message,
                            createdAt:message.createdAt2,
                            user:{
                                _id:message.sender,
                                name:message.sender
                            }
                        }
                    })
                    setMessages(MessagesFormat.reverse())
                })
                .catch((e) => {
                    setMessages([])
                    ToastAndroid.show(e.message,ToastAndroid.SHORT)
                })

        }else if (user.userType ==='doctor') {
            axios.get(`${BaseURL}/chat/all?client=${fullName}&doctor=${user.fullname}`)
                .then((res) => {
                    const MessagesFormat = res.data.messages.map((message) => {
                        return {
                            _id:message.messageId,
                            text:message.message,
                            createdAt:message.createdAt2,
                            user:{
                                _id:message.sender,
                                name:message.sender
                            }
                        }
                    })
                    setMessages(MessagesFormat.reverse())
                })
                .catch((e) => {
                    setMessages([])
                    ToastAndroid.show(e.message,ToastAndroid.SHORT)
                })

        }
    }
    useEffect(() => {
        fetchMessages()
    },[])


    const StartVideoChat = () => {
        console.log('video chat')
    }
    const StartAudioChat = () => {
        console.log('audio chat')
    }
    const OpenChatOptions = () => {
        console.log('audio chat')
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle:fullName,
            headerRight:() => {
                return(
                    <View style={styles.headerRightIcons}>
                        <TouchableOpacity style={styles.headerIcon} onPress={StartVideoChat}>
                            <FontAwesome name='video-camera' size={25} color='black'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headerIcon} onPress={StartAudioChat}>
                            <Ionicons name='call' size={25} color='black'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headerIcon} onPress={OpenChatOptions}>
                            <Entypo name='dots-three-vertical' size={25} color='black'/>
                        </TouchableOpacity>
                    </View>
                )
            }
        })
    },[])
    const SendMessage = (message) => {
        console.log(message)
        const newMessage={
            message:message[0].text,
            sender:user.fullname,
            receiver:fullName,
            createdAt:moment().format('LT'),
            createdOn:moment().format('l'),
            isRead:false,
            messageId:message[0]._id,
            createdAt2:message[0].createdAt
        }

        if (user.userType === 'client') {
            axios.post(`${BaseURL}/chat/new`, {message: newMessage, client: user.fullname, doctor: fullName})
                .then((res) => {
                    ToastAndroid.show(res.data.msg, ToastAndroid.SHORT)
                    fetchMessages()
                })
                .catch((e) => {
                    ToastAndroid.show(e.message, ToastAndroid.SHORT)
                })
        } else if (user.userType === 'doctor') {
            axios.post(`${BaseURL}/chat/new`, {message: newMessage, client: fullName, doctor: user.fullname})
                .then((res) => {
                    ToastAndroid.show(res.data.msg, ToastAndroid.SHORT)
                    fetchMessages()
                })
                .catch((e) => {
                    ToastAndroid.show(e.message, ToastAndroid.SHORT)
                })
        }
    }
    return (
        <>
            <GiftedChat
                messages={messages}
                user={{
                    _id:user?.fullname,
                    name:user?.fullname,
                    avatar:'http://picsum.photos/200/300',
                    userType:user?.userType,
                }}
                onSend={SendMessage}
                scrollToBottom={true}
                placeholder='Type a message'
                showUserAvatar={true}

                imageProps={{

                }}

            />
            {
                Platform.OS==='android' &&(<KeyboardAvoidingView />)
            }
        </>


    );
};

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    header:{
        flexDirection:'row',
        alignItems:'center'
    },
    headerImage:{
        width:40,
        height:40,
        borderRadius:20
    },
    headerUsername:{
        fontSize:18,
        fontWeight:"bold",
        color:'black',
        paddingLeft:7
    },
    headerRightIcons:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    headerIcon:{
        paddingHorizontal:10,
    },
    footer:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        padding:15,
        height:'13%',


    },
    textInput:{
        bottom:0,
        height:50,
        width:'100%',
        flex: 1,
        marginRight:15,
        borderColor:'transparent',
        backgroundColor:'#ECECEC',
        borderWidth:1,
        paddingHorizontal: 10,
        color:'grey',
        borderRadius:30,
    },
    chats:{
        borderColor:'black',
        borderWidth:2,
        height:'87%'
    },
    receiver:{
        padding:10,
        backgroundColor: '#ECECEC',
        alignSelf:'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom:20,
        maxWidth:'80%',
        position:'relative',

    },
    sender:{
        padding:8,
        backgroundColor:'#2B68E6',
        alignSelf:'flex-start',
        borderRadius:20,
        margin:15,
        maxWidth:'80%',
        position:'relative'
    },
    senderText:{
        color:'white',
        fontWeight:'500',
        marginLeft:0,
        marginBottom: 5,
    },
    receiverText:{
        color:'black',
        fontWeight: '500',
        marginLeft:10,
    },
    senderName:{
        left:10,
        paddingRight:10,
        fontSize:10,
        color:'white',

    },

})
export default ChatMessagePage;
