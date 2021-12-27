import React from 'react';

import {Text, View, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';

const SplashScreen = ({ navigation }) => {
    const GoToLoginScreen = () => {
        navigation.navigate('LoginScreen')
    }
    const GoToSignUpScreen = () => {
        navigation.navigate('SignUpScreen')
    }
    const GoToDoctorSignUpScreen = () => {
        navigation.navigate('DoctorSignUpScreen')
    }
    const GoToDoctorLoginScreen = () => {
        navigation.navigate('DoctorLoginScreen')
    }
    return (
        <ImageBackground style={styles.container} source={require('../background2.jpg')}>

            <View style={styles.banner}>

            </View>
            <View style={styles.authButtons}>
                <TouchableOpacity onPress={GoToLoginScreen} style={styles.authUserButton}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={GoToSignUpScreen} style={styles.authUserButton}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={GoToDoctorLoginScreen} style={styles.authDoctorButtons}>
                    <Text style={styles.authbuttonText2}>Login as a Doctor </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={GoToDoctorSignUpScreen} style={styles.authDoctorButtons}>
                    <Text style={styles.authbuttonText2}>Sign Up as a Doctor </Text>
                </TouchableOpacity>
            </View>

        </ImageBackground>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        resizeMode:'cover',

    },
    authButtons:{
        marginBottom:10,

    },

    banner:{
        flex:1,
    },
    authUserButton:{
        width:250,
        height:60,
        borderRadius:30,
        backgroundColor:'#37af3d',
        marginVertical:10,
        alignItems:'center',
        justifyContent:'center'
    },
    buttonText:{
        color:'white',
        fontSize:25,
        fontFamily:'Roboto'
    },
    authDoctorButtons:{
        alignItems:'center',
        justifyContent:'center',
        marginVertical:5,
    },
    authbuttonText2:{
        textDecorationLine:'underline',
        color:'black'

    }
})
export default SplashScreen;
