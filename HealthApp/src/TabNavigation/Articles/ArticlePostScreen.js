import React, {useLayoutEffect} from 'react';

import {Text, View, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView} from 'react-native';
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import {Divider} from "react-native-elements";

const ArticlePostScreen = ({ navigation,route }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle:article.articleTitle
        })
    },[])
    const { article } = route.params
    console.warn(article)
    return (
        <View style={styles.container}>
            <ScrollView>
                <Image source={{ uri:article.articleImageUrl }}
                       style={styles.image}/>
                <View style={styles.postBodyContainer}>
                    <View>
                        <Divider orientation='horizontal' width={2}/>
                        <Text style={styles.postTitle}>{article.articleTitle}</Text>
                        <View style={styles.postTop}>
                            <View style={{ flexDirection:'row' }}>
                                <Text style={{ fontSize:15, }}>Written By : </Text>
                                <TouchableOpacity >
                                    <Text style={{ fontWeight:'bold' }}>{article.articleBy}</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={{ flexDirection:'row',justifyContent:'space-evenly' }}>
                                <Text style={styles.datetime}>{article.createdOn}</Text>
                                <Text style={styles.datetime}>{article.createdAt}</Text>
                            </View>


                        </View>
                        <Divider orientation='horizontal' width={2}/>
                        <View style={styles.belowDivider}>

                            <View style={styles.belowDividerIcons}>
                                <TouchableOpacity >
                                    <AntDesign name={'heart'} size={23} style={styles.icon} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Feather name='bookmark' size={23} style={styles.icon}/>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Entypo name='share' size={23} style={styles.icon}/>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                    <Text style={styles.postBody}>{article.articlePost}</Text>
                </View>
            </ScrollView>

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin:10,
        marginTop:20,
    },
    image:{
        width:'100%',
        height:400,
        borderColor:'black',
        borderWidth:1,
        marginBottom:15
    },
    postTitle:{
        fontSize:25,
        textAlign:'center',
        fontWeight:'bold',
        paddingTop:10,
        paddingBottom:10,
    },
    postBodyContainer:{
        margin:10,
    },
    postBody:{
        fontSize:17,
        paddingBottom:15,
    },
    postTop:{
        flexDirection:'row',
        justifyContent:'space-between',
        margin:10,

    },
    datetime:{
        paddingRight:10
    },
    belowDivider:{
        flex:0.6,
        flexDirection:'row',
        justifyContent:'space-evenly',
        paddingBottom:10,
        paddingTop:10
    },
    belowDividerIcons:{
        flexDirection:'row',
        justifyContent:'space-evenly',

    },
    icon:{
        padding:8,
    },
    fab:{
        position:'absolute',
        top:Dimensions.get('screen').height * 0.7,
        left:Dimensions.get('screen').width * 0.75,
        justifyContent:'center',
        alignItems:'center',
        zIndex:1,


    },

    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalView: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(Dimensions.get("window").width * 0.4) },
            { translateY: -90 }],
        height: 180,
        width: Dimensions.get("window").width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 7,
    },
    textInput: {
        width: "80%",
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        marginBottom: 8,
    },
    commentsTitle:{
        fontSize:20,
        fontWeight:'bold',

    },
    NoOfComments:{
        fontSize:17,
        fontWeight:'500',

    },
    commentContainer:{
        flexDirection:'row',
        marginTop:10,

    },
    commentAuthor:{
        fontWeight:'600',
        fontSize:17,
        marginLeft:15,
        marginRight:20,

    },
    commentInfo:{
        fontSize:16,
    },
    followButton:{
        alignItems:'center',
        justifyContent:'center',
        width:70,
        height:30,
        borderRadius:10,
        backgroundColor:'black'

    },
    followButtonText:{
        fontSize:15,
        color:'white'

    },
    activityIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }

})
export default ArticlePostScreen;
