import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'


export default class GoodRequestScreen extends Component{
    constructor(){
        super()
        this.state = {
            userId : firebase.auth().currentUser.email,
            nameOfTheBook:"",
            reason:"",
        } 
    }

    createUniqueId(){
        return Math.random().toString(36).substring(7);
      }


    initiateRequest = (nameOfTheBook,reason) => {
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId()
        db.collection('goods_request').add({
            "user_id": userId,
            "book_name":nameOfTheBook,
            "reason_to_request":reason,
            "request_id"  : randomRequestId,
        })
        this.setState({
            nameOfTheBook:'',
            reason:''
        })
        return Alert.alert("Book Request Successfull")
    }
    render(){
        return(
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={true}
            >
                    <MyHeader title="Request Goods" navigation ={this.props.navigation}/>
                    <TextInput
                        style={styles.booktitle}
                        placeholder="Name of the Item"
                        placeholderTextColor = "#40E9E0"
                        onChangeText={(text)=>{
                        this.setState({
                            nameOfTheBook: text
                        })
                        }}
                        value = {this.state.nameOfTheBook}
                    />
                    <TextInput
                        style={styles.requestReason}
                        multiline = {true}
                        placeholder="Why do you need this Item?"
                        placeholderTextColor = "#40E9E0"
                        onChangeText={(text)=>{
                        this.setState({
                            reason: text
                        })
                        }}
                        value = {this.state.reason}
                    />

                    <TouchableOpacity 
                    style = {styles.reqButton}
                    onPress={()=>{
                        this.initiateRequest(this.state.nameOfTheBook, this.state.reason)
                        }}>
                        <Text style = {styles.reqText}>Request</Text>
                    </TouchableOpacity>
            </KeyboardAwareScrollView>
        )
    }
}

const styles  = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center"
    },
    title:{
        fontSize:34,
        fontWeight:'bold',
        color : '#210060',
        textAlign:"center",
        marginTop:20,
        marginBottom:20,
    },
    booktitle: {
        width: 300,
        height: 40,
        borderWidth: 2,
        borderColor : '#210060',
        fontSize: 18,
        margin:15,
        padding:2,
        alignSelf:"center",
        textAlignVertical:"center",
        textAlign:"center"
    },
    requestReason: {
        width: 300,
        height: 270,
        borderWidth: 2,
        borderColor : '#210060',
        fontSize: 18,
        margin:15,
        padding:10,
        alignSelf:"center",
        textAlignVertical:"top"
    },
    reqButton:{
        width:300,
        height:60,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:'#210060',
        shadowColor: '#40E9E0',
        shadowOffset: {
        width: 0,
        height: 8,
        },
        shadowOpacity: 0.80,
        shadowRadius: 10.32,
        elevation: 16,
      },
      reqText:{
        color:'#ffff',
        fontWeight:'200',
        fontSize:25,
        textAlign:"center"
      },

})