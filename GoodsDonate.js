import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, FlatList} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import { ListItem } from 'react-native-elements'
import db from '../config';
import MyHeader from '../components/MyHeader'
import firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';

export default class GoodDonateScreen extends React.Component{

    constructor(){
        super()
        this.state = {
          requestedBooksList : []
        }
      this.requestRef= null
      }
    
      getRequestedBooksList =()=>{
        this.requestRef = db.collection("goods_request")
        .onSnapshot((snapshot)=>{
          var requestedBooksList = snapshot.docs.map(document => document.data());
          this.setState({
            requestedBooksList : requestedBooksList
          });
        })
      }
    
      componentDidMount(){
        this.getRequestedBooksList();
      }
    
      componentWillUnmount(){
        this.requestRef();
      }
    
      keyExtractor = (item, index) => index.toString()
    
      renderItem = ( {item, i} ) =>{
        return (
            <View style = {styles.list}>
                <ListItem
                    key={i}
                    title={item.book_name}
                    subtitle={item.reason_to_request}
                    titleStyle={{ color: "#210060", fontWeight:"bold", fontSize:17}}
                    subtitleStyle={{ color: "#40E9E0", fontSize:12}}
                    rightElement={
                        <TouchableOpacity style={styles.button}>
                        <Text style={{color:'#ffff'}}>View</Text>
                        </TouchableOpacity>
                    }
                    bottomDivider
                />
            </View>
          
        )
      }
    

    render(){
        return(
            <ScrollView>
                    <View>
                        <Text style = {styles.title}>
                            Donate Screen
                        </Text>
                    </View>
                    <View style={{flex:1}}>
                    {
                        this.state.requestedBooksList.length === 0
                        ?(
                        <View style={styles.subContainer}>
                            <Text style={styles.ButtonText}>List Of All Requested Books</Text>
                        </View>
                        )
                        :(
                        <FlatList
                        style = {styles.FlastItem}
                            keyExtractor={this.keyExtractor}
                            data={this.state.requestedBooksList}
                            renderItem={this.renderItem}
                        />
                        )
                    }
                    </View>
            </ScrollView>         
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#F8BE85',
        justifyContent: "center",
        alignItems: "center"
    },
    title:{
        fontSize:35,
        fontWeight:'bold',
        color : '#210060',
        textAlign:"center",
        marginTop:20,
        marginBottom:20,
    },
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:110,
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:25,
      backgroundColor:'#210060',
      shadowColor: 'white',
      shadowOffset: {
         width: 0,
         height: 6,
      },
      shadowOpacity: 0.30,
      shadowRadius: 10.32,
      elevation: 16,
    },
    ButtonText:{
        color:'#00E1D9',
        fontWeight:'200',
        fontSize:20
    },
    list:{
        borderWidth:1,
        margin:8,
        borderColor:"#4C516D"
    }
  })