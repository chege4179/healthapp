import React, {useState} from 'react';

import {Text, View, StyleSheet, TextInput, TouchableOpacity,ToastAndroid, Dimensions, KeyboardAvoidingView,Platform} from 'react-native';
import axios from "axios";
import BaseURL from "./BaseURL";
import moment from "moment";
const SignUpScreen = () => {

    const [fullName,setFullName] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [passwordConfirm,setPasswordConfirm] = useState('')

    const SignUpUser = () => {
        if (password !== passwordConfirm){
            ToastAndroid.show('Passwords don\'t match',ToastAndroid.SHORT)
        }else {

            axios.post(`${BaseURL}/user/signup`,{fullName, phoneNumber, email, password})
                .then((res) => {
                    ToastAndroid.show(res.data.msg,ToastAndroid.SHORT)
                })

        }

    }
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS ==='ios' ? 'padding' :'height'}
        >
            <Text style={styles.headerTitle}>User Sign Up</Text>
            <View style={styles.inputViewContainer}>
                <Text style={styles.inputViewLabel}>Full Name</Text>
                <TextInput
                    style={styles.inputTextInput}
                    placeholder='Enter your full name'
                    onChangeText={(text) => setFullName(text)}
                />
            </View>
            <View style={styles.inputViewContainer}>
                <Text style={styles.inputViewLabel}>Phone Number</Text>
                <TextInput
                    style={styles.inputTextInput}
                    placeholder='Enter your phone number'
                    onChangeText={(text) => setPhoneNumber(text)}
                />
            </View>
            <View style={styles.inputViewContainer}>
                <Text style={styles.inputViewLabel}>Email Address</Text>
                <TextInput
                    style={styles.inputTextInput}
                    placeholder='Enter your email address'
                    onChangeText={(text) => setEmail(text)}
                />
            </View>
            <View style={styles.inputViewContainer}>
                <Text style={styles.inputViewLabel}>Password</Text>
                <TextInput
                    style={styles.inputTextInput}
                    placeholder='Enter your password'
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>
            <View style={styles.inputViewContainer}>
                <Text style={styles.inputViewLabel}>Confirm Password</Text>
                <TextInput
                    style={styles.inputTextInput}
                    placeholder='Confirm your Password'
                    secureTextEntry={true}
                    onChangeText={(text) => setPasswordConfirm(text)}
                />
            </View>
            <TouchableOpacity style={styles.loginbutton} onPress={SignUpUser}>
                <Text style={styles.loginbuttonText}>Sign Up</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',


    },
    inputViewContainer:{
        width:Dimensions.get('screen').width * 0.93,
        height:100,

    },
    inputViewLabel:{
        textAlign:'left',
        fontSize:20,

    },
    inputTextInput:{
        fontSize:19,
        borderColor:'gray',
        borderWidth:1,
        borderRadius:10,
        paddingHorizontal:10,

    },
    loginbutton:{
        width:200,
        height:50,
        backgroundColor:'green',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
    },
    loginbuttonText:{
        color:'white',
        fontSize:18,
    },
    headerTitle:{
        fontSize:25,
        fontWeight:'bold',
        marginBottom:10,

    }
})
export default SignUpScreen;
