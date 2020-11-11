import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import firebase from 'firebase';


class DashboardScreen extends Component {

  state = {
    name: '',
    aPhoto: '../assets/picture.png',
  }

  componentDidMount() {
    this.getUserName();
    this.getUserPhoto();
  }
  
  getUserName = () => {
    // firebase
    //   .auth().currentUser.displayName;

    this.setState({name: firebase
      .auth().currentUser.displayName});
  }


  getUserPhoto = () => {
    // firebase
    //   .auth().currentUser.photoURL;

    this.setState({aPhoto: firebase
      .auth().currentUser.photoURL});

      console.log('foto: ', firebase.auth().currentUser.photoURL);
  }


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={{fontWeight: '500', fontSize: 18}}>AppCar</Text>
            <TouchableOpacity onPress={() => firebase.auth().signOut() }>
              <Text style={{fontWeight: '500', fontSize: 18}}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.picture}>
            <Image source={{uri: firebase.auth().currentUser.photoURL}} style={styles.avatar}></Image>
            <Text style={{fontSize: 24, marginTop: 30, }}>{firebase.auth().currentUser.displayName}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('PostScreen')} style={styles.btnAdd}>
              <Text style={{fontWeight: '500', fontSize: 18, color: 'white'}}>Adicionar Fotos</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity  style={styles.btnSee}>
              <Text style={{fontWeight: '500', fontSize: 18, color: 'white'}}>Ver Fotos</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        marginTop: 0
      },
      android: {
        marginTop: 38
      }
    }),
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#D8D9D8'
  },

  btnAdd: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    margin: 20,
    borderRadius: 12,
  },

  btnSee: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    margin: 20,
    borderRadius: 12,
  },

  picture: {
    marginTop: 40,
    marginBottom: 40,
    alignItems: 'center',
  },

  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
  },

});