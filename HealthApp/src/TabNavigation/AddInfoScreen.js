import React, {useState} from 'react';

import {Text, View, StyleSheet, Platform, TextInput, TouchableOpacity,
    KeyboardAvoidingView, Dimensions, ToastAndroid} from 'react-native';
import {useSelector} from "react-redux";
import {SelectUser} from "../ReduxStore/UserReducer";
import axios from "axios";
import BaseURL from "../BaseURL";

const AddInfoScreen = ({ navigation }) => {
    const user = useSelector(SelectUser)
    const [age, setAge] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [bio, setBio] = useState('');
    const AddInfo = () =>{
        console.log(dateOfBirth)
        axios.post(`${BaseURL}/bio/add`,{
            userId:user.userId,
            age,
            dateOfBirth,
            bio
        }).then((res) => {
            ToastAndroid.show(res.data.msg,ToastAndroid.SHORT)
            if(res.data.success){
                navigation.goBack()
            }

        })
            .catch((e) => {
                console.log(e)
            })
        // if (age ==='' || dateOfBirth ==='' || bio ===''){
        //     ToastAndroid.show('Fill in all the fields',ToastAndroid.SHORT)
        // }else {
        //
        // }

    }
    return (
            <KeyboardAvoidingView behavior={Platform.OS ==='ios' ? 'padding' :'height'} style={styles.container}>
                <Text style={styles.headerTitle}>Medical Bio</Text>
                <View style={styles.inputViewContainer}>
                    <Text style={styles.inputViewLabel}>Age</Text>
                    <TextInput
                        style={styles.inputTextInput}
                        placeholder='Enter your age'
                        onChangeText={(text) => setAge(text)}
                    />
                </View>
                <View style={styles.inputViewContainer}>
                    <Text style={styles.inputViewLabel}>Date of Birth</Text>
                    <TextInput
                        style={styles.inputTextInput}
                        placeholder='Enter your date of birth'
                        onChangeText={(text) => setDateOfBirth(text)}
                    />
                </View>
                <View style={{...styles.inputViewContainer,height:250}}>
                    <Text style={styles.inputViewLabel}>Medical Bio</Text>
                    <TextInput
                        style={styles.bioInput}
                        multiline={true}
                        numberOfLines={11}
                        placeholder='Add Medical Bio(Add any history of any diseases or infections which may be useful to your doctor for diagnosis)'
                        onChangeText={(text) => setBio(text)}
                    />
                </View>
                <TouchableOpacity style={styles.loginbutton} onPress={AddInfo}>
                    <Text style={styles.loginbuttonText}>Submit</Text>
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


    },
    bioInput:{
        textAlignVertical:'top',
        fontSize:19,
        borderColor:'gray',
        borderWidth:1,
        borderRadius:10,
        height:200
    }
})
export default AddInfoScreen;
