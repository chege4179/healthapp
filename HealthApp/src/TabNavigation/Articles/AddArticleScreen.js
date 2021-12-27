import React, {useLayoutEffect, useState} from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    ToastAndroid,
    Platform
} from 'react-native';
import BaseURL from "../../BaseURL";
import axios from "axios";
import moment from "moment";
import {useSelector} from "react-redux";
import {SelectUser} from "../../ReduxStore/UserReducer";
import * as ImagePicker from "react-native-image-picker";


const AddArticleScreen = ({ navigation }) => {
    const user = useSelector(SelectUser)
    const [articleTitle,setArticleTitle] = useState('')
    const [articlePost,setArticlePost] = useState('')
    const [photoURI,setPhotoURI] = useState('')
    const [postphoto,setPostphoto] = useState('')
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle:'Add Article'
        })
    },[])
    const AddPhoto = () => {
        try {
            ImagePicker.launchImageLibrary({ mediaType:'photo'}, (response) => {
                setPhotoURI(response?.assets[0].uri)
                setPostphoto(response?.assets[0])
            })
        }catch (e) {
            console.warn(e)
        }

    }

    const PostArticle = () => {
        const reqObject = {
            articleTitle:articleTitle,
            articlePost:articlePost,
            articleCreatedAt:moment().format('h:mm:ss a'),
            articleCreatedOn:moment().format('L'),
            articleBy:user.fullname
        }
        const body = createFormData(postphoto,reqObject)
        axios.post(`${BaseURL}/article/add`,body)
            .then((res) => {
                ToastAndroid.show(res.data.msg,ToastAndroid.SHORT)

            })
            .catch((e) => {

            })

    }
    const createFormData = (photo, body) => {
        const data = new FormData();

        data.append("photo", {
            name: photo.fileName,
            type: photo.type,
            uri:
                Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
        });

        Object.keys(body).forEach(key => {
            data.append(key, body[key]);
        });

        return data;
    };
    return (
        <View style={styles.container}>
            <View style={styles.topform}>
                <Image source={{ uri:photoURI }}
                       style={styles.postphoto}/>
                <TextInput
                    placeholder='Title'
                    style={styles.posttitle}
                    numberOfLines={3}
                    multiline={true}
                    onChangeText={(text) => setArticleTitle(text)}
                />
            </View>
            <ScrollView style={styles.postbody}>
                <TextInput
                    style={styles.postbodyinput}
                    placeholder='Write your article'
                    multiline={true}
                    numberOfLines={40}
                    onChangeText={(text) => setArticlePost(text)}
                />
            </ScrollView>
            <View style={styles.posttop}>
                <TouchableOpacity style={styles.topbutton} onPress={AddPhoto}>
                    <Text style={styles.toptext}>Pick a Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.topbutton} onPress={PostArticle}>
                    <Text style={styles.toptext}>Post</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin:8,
        alignItems:'center'

    },
    topform:{
        flexDirection:'row',
        padding:10,

    },
    postphoto:{
        width:100,
        height:100,
        margin:20,
        flex:0.3,
        borderWidth:2,
        borderColor:'black',
        borderRadius:15,
    },
    posttitle:{
        flex:0.7,
        fontSize:17,
        borderWidth:2,
        borderColor:'black',
        borderRadius:15,
    },
    postbody:{
        width:'100%',
        margin:10,
        marginRight:10,
        borderRadius:15,

        borderColor:'black',
        borderWidth:2,

    },
    postbodyinput:{
        fontSize:15,
        paddingTop:10,
        textAlignVertical:'top'


    },
    posttop:{
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    topbutton:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'blue',
        width:120,
        borderRadius:15,
        margin:10,

    },
    toptext:{
        color:'white',
        fontSize:17,
        padding:5

    }
})
export default AddArticleScreen;
