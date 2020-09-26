import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


import * as firebase from 'firebase';

//Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBR1et1YVAFRYR0gHG6pnIRY7s-1upBMeM",
  authDomain: "appcar-807b3.firebaseapp.com",
  databaseURL: "https://appcar-807b3.firebaseio.com",
  projectId: "appcar-807b3",
  storageBucket: "appcar-807b3.appspot.com",
  messagingSenderId: "261261691145",
  appId: "1:261261691145:web:65a423a078027fa5d82bd8",
  measurementId: "G-RPHS27BHX5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = ({
      email: '',
      senha: ''
    })
  }

  signUpUser = (email, senha) => {

    try {
      
      if(this.state.senha.length<6) {
        alert("Senha com no mínimo 6 caracteres")
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email, senha)

    } catch (error) {
      console.log(error.toString())
    }

  }

  loginUser = (email, senha) => {

    try {

      firebase.auth().signInWithEmailAndPassword(email, senha).then(function (user) {
        console.log(user)
      })
      
    } catch (error) {
      console.log(error.toString())
    }

  }

  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({email})}
              />
          </Item>
  
          <Item floatingLabel>
            <Label>Senha</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(senha) => this.setState({senha})}
              />
          </Item>
  
          <Button style={{marginTop: 30, marginLeft: 30, marginRight: 30}}
            full
            rounded
            success
            onPress={() => this.loginUser(this.state.email, this.state.senha)}
          >
            <Text style={{color: 'white'}}>Login</Text>
          </Button>
  
          <Button style={{marginTop: 10, marginLeft: 30, marginRight: 30}}
            full
            rounded
            primary
            onPress={() => this.signUpUser(this.state.email, this.state.senha)}
          >
            <Text style={{color: 'white'}}>Sign Up</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
