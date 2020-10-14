import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert,ScrollView,Modal,KeyboardAvoidingView } from 'react-native';

import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends Component {
  constructor(){
    super()
    this.state={
      emailId : '',
      password: '',
      firstName:'',
      lastName:'',
      address:'',
      contact:'',
      confirmPassword:'',
      isModalVisibile:"false"
    }
  }
  showModal=()=>{
    return(
      <Modal
      animationType = "fade"
      transparent = {true}
      visible={this.state.isModalVisibile}>
        <View>
          <ScrollView  style={styles.scroll}>
            <KeyboardAvoidingView>
              <Text style={style.title}>Registeration</Text>
              <TextInput style={styles.textbox}
              placeholder="First name"
              maxLength={10}
              onChangeText={(text)=>{
                this.setState({
                  firstName:text
                })
              }}/>
            <Text style={style.title}>Registeration</Text>
              <TextInput style={styles.textbox}
              placeholder="Lastt name"
              maxLength={10}
              onChangeText={(text)=>{
                this.setState({
                  lastName:text
                })
              }}/>
            <Text style={style.title}>Registeration</Text>
              <TextInput style={styles.textbox}
              placeholder="Contact"
              maxLength={10}
              onChangeText={(text)=>{
                this.setState({
                 contact:text
                })
              }}/>
              <Text style={style.title}>Registeration</Text>
              <TextInput style={styles.textbox}
              placeholder="Address"
              maxLength={10}
              onChangeText={(text)=>{
                this.setState({
                  address:text
                })
              }}/>
              <TextInput
          style={styles.loginBox}
          secureTextEntry = {true}
          placeholder="password"
          placeholderTextColor = "#ffff"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
             <Text style={style.title}>Registeration</Text>
              <TextInput style={styles.textbox}
              placeholder="Password"
              maxLength={10}
              onChangeText={(text)=>{
                this.setState({
                  password:text
                })
              }}/>
            <Text style={style.title}>Registeration</Text>
              <TextInput style={styles.textbox}
              placeholder="Cofirm Password"
              maxLength={10}
              onChangeText={(text)=>{
                this.setState({
                  confirmPassword:text
                })
              }}/>
               <TouchableOpacity style={styles.button}
               onPress={()=>{this.setState({
                 "isModalVisibile":false,

               })}}>
          <Text>Cancel</Text>

        </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    )
  }

  userLogin = (emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password)
    .then(()=>{
      return Alert.alert("Successfully Login")
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  }

  userSignUp = (emailId, password) =>{
    if(password!==confirmPassword){
      alert("Incorrect Password");
    }
    firebase.auth().createUserWithEmailAndPassword(emailId, password)
    .then((response)=>{
      return Alert.alert("User Added Successfully")
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    });
    db.collection("users").add({
      first_name:this.state.firstName,
      last_name:this.state.lastName,
      mobile_number:this.state.contact,
      email_id:this.state.emailId,
      address:this.state.address
    })
  }


  render(){
    return(
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View>
            {this.showModal()}
          </View>
          
          <Text style={styles.title}>Barter App</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextInput
          style={styles.loginBox}
          placeholder="example@barterapp.com"
          placeholderTextColor = "#ffff"
          keyboardType ='email-address'
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />

        
          <TouchableOpacity
            style={[styles.button,{marginBottom:20, marginTop:20}]}
            onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{this.userSignUp(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>
        </View>
       
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F8BE85'
  },
  profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title :{
    fontSize:65,
    fontWeight:'300',
    paddingBottom:30,
    color : '#ff3d00'
  },
  loginBox:{
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor : '#ff8a65',
    fontSize: 20,
    margin:10,
    paddingLeft:10
  },
  button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ff9800",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText:{
    color:'#ffff',
    fontWeight:'200',
    fontSize:20
  },
  buttonContainer:{
    flex:1,
    alignItems:'center'
  },
  textbox:{
    width:200,
    height:50,
    marginColor:"black"
  }
})
