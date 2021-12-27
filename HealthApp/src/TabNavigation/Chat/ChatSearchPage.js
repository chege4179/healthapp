import React, {useEffect, useLayoutEffect, useState} from 'react';

import {Text, View, StyleSheet, FlatList,ToastAndroid} from 'react-native';
import {SearchBar} from "react-native-elements";
import axios from "axios";


import {useSelector} from "react-redux";
import {SelectUser} from "../../ReduxStore/UserReducer";
import BaseURL from "../../BaseURL";
import ChatSearchItem from "../../Components/ChatSearchItem";

const ChatSearchPage = ({ navigation }) => {
    const [doctors,setDoctors] = useState([])
    const [searchTerm,setSearchTerm] = useState('')
    const user = useSelector(SelectUser)
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false
        })
    },[])
    useEffect(() => {
        axios.get(`${BaseURL}/doctor/all`)
            .then((res) => {
                setDoctors(res.data.doctors)


            })
            .catch((err) => {
                console.warn(err)
            })

    }, []);
    const SearchUsers = (text) => {
        setSearchTerm(text)
        axios.get(`${BaseURL}/user/search?term=${text}&username=${user.username}`)
            .then((res) => {
                setDoctors(res.data.doctors)
            })
            .catch((e) => {
                ToastAndroid.show(e.message,ToastAndroid.SHORT)

            })
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={doctors}
                keyExtractor={ item  => item.doctorId}
                renderItem={({item}) => {
                    return (<ChatSearchItem
                        speciality={item.speciality}
                        fullname={item.fullname}
                        email={item.email}
                    />)
                }}
                ListHeaderComponent={
                    <SearchBar
                        placeholder='Search Users.......'
                        onChangeText={SearchUsers}
                        value={searchTerm}
                    />
                }
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,


    }
})
export default ChatSearchPage;
