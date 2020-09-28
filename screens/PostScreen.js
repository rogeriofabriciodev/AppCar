import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, TouchableOpacity, Image, TextInput, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Fire from '../Fire';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';


class PostScreen extends Component {
  state = {
    text: "",
    image: null,
    btnState: true
  }

  componentDidMount() {
    this.getPhotoPermission();
  }

  getPhotoPermission = async () => {
    if(Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status != "granted") {
        alert("Precisamos acessar sua galeria de fotos");
      }
    }

    if (Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }

    if (status != "granted") {
      alert("Precisamos acessar sua galeria de fotos");
    }
  };

  handlerPost = () => {
    Fire.shared
      .addPost({ text: this.state.text.trim(), localUri: this.state.image })
      .then(ref => {
        this.setState({ text: "", image: null, btnState: true });
        this.props.navigation.goBack();
      })
      .catch(error => {
        alert(error);
      });
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4]
    })
    
    if (!result.cancelled) {
      this.setState({ 
        image: result.uri,
        btnState: false
      });
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Ionicons name='md-arrow-back' size={24} color='#232323'></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.pickImage}>
              <Ionicons name='md-add' size={32} color='#000' style={{marginLeft: 25}}></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => firebase.auth().signOut() }>
              <Text style={{fontWeight: '500', fontSize: 18}}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.picture}>
            <Image source={require('../assets/picture.png')} style={styles.avatar}></Image>
            <Text style={{fontSize: 24, marginTop: 30, }}>FOTOS</Text>
          </View>
          <View style={{marginHorizontal: 32, marginTop: 32, height: 300, backgroundColor: '#eee', borderRadius: 12}}>
            <Image source={{ uri: this.state.image }} style={{width: '100%', height: '100%'}}></Image>
          </View>
          <View style={styles.inputContainer}>
            <TextInput 
              autoFocus={false} 
              multiline={true} 
              style={{flex: 1, color:'#fff', fontSize: 16}} 
              placeholder='Descrição'
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
            ></TextInput>
          </View>
          <View style={styles.body}>
            <Button
              disabled={this.state.btnState}
              title='Salvar'
              onPress={this.handlerPost}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
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

  body: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputContainer: {
    margin: 32,
    flexDirection: 'row',
    backgroundColor: '#000000',
    color: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8
  },

  picture: {
    marginTop: 30,
    alignItems: 'center',
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },

  photo: {
    alignItems: 'flex-end',
    marginHorizontal: 32,
    marginTop: 40
  }
});