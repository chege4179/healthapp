import React, {useEffect, useLayoutEffect, useState} from 'react';

import {Text, View, StyleSheet, TouchableOpacity, Image,ToastAndroid} from 'react-native';

import {useDispatch, useSelector} from "react-redux";
import {UserActions} from "../ReduxStore/UserConstants";
import {SelectUser} from "../ReduxStore/UserReducer";
import axios from "axios";
import BaseURL from "../BaseURL";

const ProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const user = useSelector(SelectUser)
    const [bio,setBio] = useState({})
    const LogOut = () => {
        dispatch({
            type:UserActions.LOGOUT_REQUEST
        })
        dispatch({
            type:UserActions.LOGOUT_SUCCESS
        })
    }
    const GoToAddInfoScreen = () => {
        navigation.navigate('AddInfoScreen')
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle:user.fullname,
            headerRight:() => {
                return(
                    <View style={{ flexDirection:'row' }}>
                        <TouchableOpacity style={styles.logoutButton} onPress={GoToAddInfoScreen}>
                            <Text style={styles.logoutButtonText}>{user?.userType ==='client' ? 'Add Medical Bio' :'Add Experience'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={LogOut} style={styles.logoutButton}>
                            <Text style={styles.logoutButtonText}>Log Out</Text>
                        </TouchableOpacity>
                    </View>

                )
            }
        })
    },[])
    useEffect(() => {
        navigation.addListener('focus',() => {
            FetchMedicalBio()
        })
        FetchMedicalBio()
    }, []);


    function FetchMedicalBio(){
        if (user.userType ==='client'){
            axios.get(`${BaseURL}/bio/${user.userId}`)
                .then((res) => {
                    setBio(res.data.bio)
                })
                .catch((e) => {
                    ToastAndroid.show(e.message,ToastAndroid.SHORT)
                })
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.cardLeft}>
                    <Image
                        style={styles.avatar}
                        source={{uri: 'https://res.cloudinary.com/dhuqr5iyw/image/upload/v1636375486/moviePosters/cat.jpg'}}
                    />
                </View>

                <View style={styles.cardRight}>
                    <Text style={styles.text}>Full Name: {user?.fullname} </Text>
                    <Text style={styles.text}>Phone Number : {user?.phonenumber} </Text>
                    <Text style={styles.text}>Email : {user?.email} </Text>
                    <Text style={styles.text}>User Type : {user?.userType} </Text>
                </View>
            </View>
            <View style={styles.bio}>
                <Text style={styles.bioTitle}>Age:</Text>
                <Text style={styles.bioText}>{bio?.age}</Text>
                <Text style={styles.bioTitle}>Date of Birth</Text>
                <Text style={styles.bioText}>{bio?.dateOfBirth}</Text>
                <Text style={styles.bioTitle}>Bio</Text>
                <Text style={styles.bioText}>{bio?.bio}</Text>
            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        marginTop:20

    },
    logoutButton:{
        marginRight:20,

    },
    logoutButtonText:{
        fontSize:18,
        fontWeight:'bold',
        color:'black'

    },
    card:{
        width:'95%',
        height:130,
        borderWidth:1,
        borderColor:'gray',
        borderRadius:20,
        justifyContent:'center',
        flexDirection:'row',
        padding:10,
        backgroundColor:'#d7d1d1'
    },
    cardLeft:{
        flex:0.25
    },
    cardRight:{
        flex:0.75,

    },
    text:{
        fontSize:18,
        fontWeight:'700',

    },
    avatar:{
        width:80,
        height:80,
        borderRadius:40,
    },
    bio:{
        width:'95%',
        marginTop:20,

    },
    bioTitle:{
        fontSize:21,
        fontWeight:'bold'

    },
    bioText:{
        fontSize:18

    }
})
export default ProfileScreen;
