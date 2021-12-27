import React from 'react';

import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/native";

const ChatItem = ({ username,lastText,time,unread }) => {
    const navigation = useNavigation()
    const GoToChatPage = () => {
        navigation.navigate('ChatMessagePage',{ fullName:username })
    }
    return (
        <TouchableOpacity style={styles.container} onPress={GoToChatPage}>
            <View style={styles.unreadInfoLeft}>
                <Image style={styles.profileImage} source={{
                    uri:'https://picsum.photos/200/300'
                }}/>
            </View>
            <View style={styles.unreadInfoCenter}>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.lastText}>{lastText}</Text>
            </View>
            <View style={styles.unreadInfoRight}>
                <Text style={styles.time}>{time}</Text>

                <Text style={styles.unreadText}>{unread}</Text>
            </View>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        justifyContent:'space-evenly',
        width:'99%',
        height:80,
        marginHorizontal:1

    },
    unreadInfoLeft:{
        alignItems:'center',
        justifyContent:'center',
        marginLeft:5,


    },
    profileImage:{
        width:60,
        height:60,
        borderRadius:30
    },
    unreadInfoCenter:{
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'center',
        paddingLeft:15,
        flex:1,
    },
    username:{
        fontSize:19,
        fontWeight:'bold'
    },
    lastText:{
        fontSize:16,
    },
    unreadInfoRight:{
        alignItems:'center',
        justifyContent:'center',
        marginRight:7,
        flexDirection:'column',



    },
    unreadText:{
        marginTop:3,
        color:'white',
        backgroundColor:'black',
        width:25,
        height:25,
        borderRadius:12.5,
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center'



    }


})
export default ChatItem;
