import React, {useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Dimensions,
    TouchableOpacity,
    ToastAndroid, ImageBackground,

} from 'react-native';
import axios from "axios";
import BaseURL from "./BaseURL";
import {useDispatch} from "react-redux";
import {UserActions} from "./ReduxStore/UserConstants";
import messaging from "@react-native-firebase/messaging";

const LoginScreen = () => {
    const OsVer = Platform.constants['Release'];
    const [email,setEmail]  = useState('')
    const [password,setPassword]  = useState('')
    const dispatch = useDispatch()

    const LoginUser = async () => {
        if (email ==='' || password === ''){
            ToastAndroid.show('Please fill in all the fields',ToastAndroid.SHORT)
        }else {
            try {
                const token = await messaging().getToken()
                axios.post(`${BaseURL}/user/login`, { email,password,deviceId:token })
                    .then((res) => {
                        ToastAndroid.show(res.data.msg,ToastAndroid.SHORT)
                        if (res.data.success){
                            dispatch({
                                type:UserActions.LOGIN_SUCCESS,
                                payload:{ ...res.data.user,userType:'client' }
                            })
                        }
                    })
                    .catch((e) => {
                        console.warn(e)
                        ToastAndroid.show(e.message,ToastAndroid.SHORT)
                    })
            }catch (e) {
                ToastAndroid.show('Firebase error',ToastAndroid.SHORT)
            }


        }
    }
    return (
        <ImageBackground
            source={require('../background2.jpg')}
            style={styles.container}
        >
            <KeyboardAvoidingView behavior={Platform.OS ==='ios' ? 'padding' :'height'} style={styles.container}>
                <Text style={styles.headerTitle}>User Login</Text>
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
                <TouchableOpacity style={styles.loginbutton} onPress={LoginUser}>
                    <Text style={styles.loginbuttonText}>Log In</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'


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
export default LoginScreen;
