import React from 'react';

import {Text, View, StyleSheet, Dimensions} from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {FAB} from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import {useSelector} from "react-redux";
import {SelectUser} from "../ReduxStore/UserReducer";
import {createStackNavigator} from "@react-navigation/stack";
import ArticleHomeScreen from "./Articles/ArticleHomeScreen";
import ArticlePostScreen from "./Articles/ArticlePostScreen";
import AddArticleScreen from "./Articles/AddArticleScreen";

const Stack = createStackNavigator()
const HomeScreen = () => {
    const user = useSelector(SelectUser)
    return (
        <Stack.Navigator>
            <Stack.Screen name='ArticleHomeScreen' component={ArticleHomeScreen} />
            <Stack.Screen name='ArticlePostScreen' component={ArticlePostScreen}/>
            <Stack.Screen name='AddArticleScreen' component={AddArticleScreen}/>
        </Stack.Navigator>
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
        top:Dimensions.get('screen').height * 0.73,
        left:Dimensions.get('screen').width * 0.8,
        justifyContent:'center',
        alignItems:'center',
        zIndex:1,
        borderRadius:30


    },
})
export default HomeScreen;
