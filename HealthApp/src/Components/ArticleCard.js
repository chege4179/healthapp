import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {Text, View, StyleSheet, TouchableOpacity, Image} from "react-native";
import { Card } from "react-native-elements";
import Entypo from "react-native-vector-icons/Entypo";
import { useSelector } from "react-redux";
import { SelectUser } from "../ReduxStore/UserReducer";



const ArticleCard = ({ article }) => {
     const user = useSelector(SelectUser)
     const navigation = useNavigation()
     const [profileImageUrl,setProfileImageUrl] = useState("")
     const GoToPostScreen = () => {
          navigation.navigate('ArticlePostScreen',{ article })
     }
     return (
       <TouchableOpacity onPress={GoToPostScreen}>
            <Card style={styles.container}>
                 <Image source={{ uri:article.articleImageUrl }}
                        style={{ width:'100%',height:150 }}/>
                 <Card.Title style={styles.postTitle}>{article.articleTitle}</Card.Title>
                 <View style={styles.bottomCard}>
                      <Text>By : {article.articleBy}</Text>
                      <View style={styles.icons}>
                           <TouchableOpacity>
                                <Entypo name='share' size={23} style={styles.icon}/>
                           </TouchableOpacity>
                      </View>
                 </View>
            </Card>
       </TouchableOpacity>

     );
};
const styles = StyleSheet.create({
     container: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",

     },
     icons:{
          flexDirection:'row',
          justifyContent:'space-evenly'
     },
     bottomCard:{
          flexDirection:'row',
          justifyContent:'space-between'
     },
     icon:{
          padding:5
     },
     postTitle:{
          fontSize:20,

     },
     profileImage:{
          width:35,
          height:35,
          borderRadius:17.5,
          resizeMode:'contain',
          marginRight:40,

     }
});
export default ArticleCard;
