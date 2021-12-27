import React, {useEffect, useLayoutEffect, useState} from 'react';

import {Text, View, StyleSheet, Dimensions, ToastAndroid, FlatList} from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import {FAB} from "react-native-elements";
import axios from "axios";
import BaseURL from "../../BaseURL";
import ArticleCard from "../../Components/ArticleCard";
import {useSelector} from "react-redux";
import {SelectUser} from "../../ReduxStore/UserReducer";

const ArticleHomeScreen = ({ navigation,route }) => {
    const [articles,setArticles] = useState([])
    const user = useSelector(SelectUser)
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false
        })
    },[])

    useEffect(() => {
        fetchArticles()
    }, [])
    const fetchArticles = () => {
        axios.get(`${BaseURL}/article/all`)
            .then((res) => {
                setArticles(res.data.articles)
            })
            .catch((e) => {
                ToastAndroid.show(e.message,ToastAndroid.SHORT)
            })
    }
    useEffect(() => {
        navigation.addListener('focus',() => {
            fetchArticles()
        })
    },[])

    const GoToAddPostScreen = () => {
        navigation.navigate('AddArticleScreen')

    }
    return (
        <View style={styles.container}>
            <FlatList
                data={articles}
                renderItem={({ item }) => {
                    return(<ArticleCard article={item}/>)
                }}
                keyExtractor={item => item.articleId}
                />
            {
                user?.userType ==='doctor' && (
                    <FAB
                        style={styles.fab} onPress={GoToAddPostScreen}
                        color='black'
                        title={<AntDesign name='plus' size={30} color='white'/>}
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

    },
    fab:{
        position:'absolute',
        top:Dimensions.get('screen').height * 0.68,
        left:Dimensions.get('screen').width * 0.8,
        justifyContent:'center',
        alignItems:'center',


    }
})
export default ArticleHomeScreen;
