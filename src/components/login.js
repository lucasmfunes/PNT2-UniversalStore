import React, {useEffect, useState} from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Image } from 'react-native';
import logo from '../../assets/universal-logo.jpg';
import * as Google from 'expo-auth-session/providers/google';
import {ANDROID_CLIENT_ID, IOS_CLIENT_ID, EXPO_CLIENT_ID} from "@env"


const Login = ({navigation}) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '733272611796-b9l767bn0rd3gd0gq1l5kav0kt8a637j.apps.googleusercontent.com',
    iosClientId: '733272611796-1lnaoe7cskm42ihrjl9q2vqfma9gme20.apps.googleusercontent.com',
    expoClientId: '733272611796-sqgchop4lgq9dnk89ogcplk1qfr2rkkr.apps.googleusercontent.com'
  });

  // console.log(ANDROID_CLIENT_ID)

  const [userInforResponse, setUserInforResponse ] = useState();
  const [accessToken, setAccessToken ] = useState();
  const [username, setUsername] = useState('');

  const mostrarToken = ()=> {
    console.log(accessToken)
  }

  const mostrarUserInfo = async () => {
    if(userInforResponse == null || userInforResponse == undefined){
      await getUserData();
    }
    console.log(userInforResponse)
  } 

  const getUserData = async () => {
    let userInforResponse = await fetch("https://www.googleapis.com/userinfo/v2/me" ,{
      headers: {Authorization: `Bearer ${accessToken}` }}
    )

    userInforResponse.json().then(data => {
      setUserInforResponse(data);
    })

  };

  useEffect(() => {
    if(response?.type === "success"){
      setAccessToken(response.authentication.accessToken)
    }
  }, [response])

    return (
      <View style={styles.container}>
         <Image
            style={styles.logo}
            source= {logo}
        />
        <TextInput
          value={this.username}
          onChangeText={(text) => setUsername(text )}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
        //  value={this.state.password}
        //  onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        
        <Button
          title={'Login'}
          style={styles.input}
          onPress={() => {navigation.navigate('Main', {username: username})}}
        />
        <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => {
            promptAsync({showInRecents: true});
          }}
        />

      <Button
          title="Mostrar"
          disabled={!request}
          onPress={() => {
            mostrarToken()
          }}
        />

      <Button
          title="User data"
          disabled={!request}
          onPress={() => {
            mostrarUserInfo()
          }}
        />
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
        width: 200,
        height: 100,
        marginBottom: 20
    },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});

export default Login