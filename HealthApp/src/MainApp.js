import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import {useSelector} from "react-redux";
import {SelectUser} from "./ReduxStore/UserReducer";

import SplashScreen from "./SplashScreen";
import DoctorLoginScreen from "./DoctorLoginScreen";
import DoctorSignUpScreen from "./DoctorSignUpScreen";
import HomeTabNavigator from "./HomeTabNavigator";
import AddInfoScreen from "./TabNavigation/AddInfoScreen";



const Stack = createStackNavigator()

const MainApp = () => {
    const user = useSelector(SelectUser)
    return (
        <NavigationContainer>
            {
            user === null ? (
            <Stack.Navigator>
                <Stack.Screen name='SplashScreen' component={SplashScreen} options={{
                    headerShown:false
                }}/>
                <Stack.Screen name='LoginScreen' component={LoginScreen}options={{
                    headerShown:false
                }}/>
                <Stack.Screen name='SignUpScreen'component={SignUpScreen}options={{
                    headerShown:false
                }}/>
                <Stack.Screen name='DoctorLoginScreen' component={DoctorLoginScreen}options={{
                    headerShown:false
                }}/>
                <Stack.Screen name='DoctorSignUpScreen' component={DoctorSignUpScreen}options={{
                    headerShown:false
                }}/>
            </Stack.Navigator>
            ):(
                <Stack.Navigator>
                    <Stack.Screen name='HomeTabNavigator' component={HomeTabNavigator} options={{
                        headerShown:false
                    }}/>
                    <Stack.Screen name='AddInfoScreen' component={AddInfoScreen}/>
                </Stack.Navigator>
            )
            }
        </NavigationContainer>
    );
};

export default MainApp;
