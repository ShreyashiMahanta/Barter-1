import React, {Component} from 'react';
import {
    View,
    Text,
    Stylesheet,
    TouchableOpacity,
    TextInput,
    Alert,
    Image
} from 'react-native';
import db from '../config';
import firebase from 'firebase';


export default class SignUpLogInScreen extends Component{
    constructor(){
        super();
        this.state({
            password : '',
            email : '',
            username : '',
        })
    }
    userSignUp = (emailId, password,confirmPassword) =>{
        if(password !== confirmPassword){
            return Alert.alert("Oops! Your password doesn't match...Check your password.")
        }else{
          firebase.auth().createUserWithEmailAndPassword(emailId, password)
          .then(()=>{
            db.collection('users').add({
              email_id:this.state.emailId,
              password:this.state.password,
              username:this.state.username, 
            })
            return  Alert.alert(
                 'User Added Successfully',
                 '',
                 [
                   {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
                 ]
             );
          })
          .catch((error)=> {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
          });
        }
      }
     
    render(){
        return(
            <View style = {styles.container}>
                <Image
                source = {
                    require("../assets/logo.png")
                }
                style = {{
                    width : 60,
                    height : 80,
                    margin : 60,
                }}
                />
                <Text style = {styles.mainHeader}>Barter</Text>
                <Text style = {styles.header}>Sign up or Log in</Text>
                <Text style = {styles.text}>Username</Text>
                <TextInput
                style = {styles.textInput}
                placeholder = "Your username..."
                onChangeText={(text)=>{
                    this.setState({
                      email: text
                    })
                }}
                />
                <Text style = {styles.text}>Password</Text>
                <TextInput
                style = {styles.textInput}
                placeholder = "Type your password here..."
                onChangeText={(text)=>{
                    this.setState({
                      password: text
                    })
                }}
                />
                <Text style = {styles.text}>Email address</Text>
                <TextInput
                style = {styles.textInput}
                placeholder = "Type your email here..."
                keyboardType ={'email-address'}
                onChangeText={(text)=>{
                    this.setState({
                      email: text
                    })
                }}
                />
                <TouchableOpacity style = {styles.button}
                onPress = {()=>{
                    this.userLogin(this.state.emailId, this.state.password)
                  }}
                ><Text style = {styles.buttonText}>LOGIN</Text></TouchableOpacity>
                <TouchableOpacity style = {styles.button}><Text style = {styles.buttonText}>SIGN UP</Text></TouchableOpacity>
            </View>
        )
    }
}

var styles = Stylesheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        backgroundColor : '#f2ae1c',
    },
    header : {
        fontSize : 60,
        fontWeigt : 'bold',
        color : '#ffab91',
        paddingBottom:30,
        justifyContent : 'center',
    },
    textInput : {
        borderWidth : 5,
        borderColor : '#4c7031',
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        padding : 6,
        margin : 10, 
    },
   text : {
        fontSize : 20,
        fontWeigt : 'bold',
        color : '#aa80ae',
   },
   button : {
    backgroundColor : '#f7f2f2',
    margin : 5,
    borderRadius : 25,
    width:300,
   height:50,
   justifyContent:'center',
   alignItems:'center',shadowOffset: {
    width: 0,
    height: 8,
 },
 shadowOpacity: 0.30,
 shadowRadius: 10.32,
 elevation: 16,
 padding: 10
   },
   buttonText : {
    color:'#f2ae1c',
    fontWeight:'200',
    fontSize:20,
    padding : 3
   }
})
