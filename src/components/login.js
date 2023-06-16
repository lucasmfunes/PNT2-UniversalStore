import React, {useContext, useEffect, useState} from 'react';
import {Button, TextInput, View, StyleSheet, Image } from 'react-native';
import logo from '../../assets/universal-logo.jpg';
import * as Google from 'expo-auth-session/providers/google';
import {ANDROID_CLIENT_ID, IOS_CLIENT_ID, EXPO_CLIENT_ID} from "@env"
import GlobalContext from './globalContext'; 

const Login = ({navigation}) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    expoClientId: EXPO_CLIENT_ID
  });

  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   androidClientId: '733272611796-b9l767bn0rd3gd0gq1l5kav0kt8a637j.apps.googleusercontent.com',
  //   iosClientId: '733272611796-1lnaoe7cskm42ihrjl9q2vqfma9gme20.apps.googleusercontent.com',
  //   expoClientId: '733272611796-sqgchop4lgq9dnk89ogcplk1qfr2rkkr.apps.googleusercontent.com'
  // });

  // Log with google
  const [accessToken, setAccessToken ] = useState();
  const{userAuth, setuserAuth} = useContext(GlobalContext)

  const logWithGoogle = () => {
    promptAsync({showInRecents: true})
    .then((value)=>{
        return fetch("https://www.googleapis.com/userinfo/v2/me" ,{
        headers: {Authorization: `Bearer ${value.authentication.accessToken}` }}
    )
    }
    ).then( (data) => { 
      data.json().then(data => {
        setuserAuth(data)
      })
    })
  }


  //Log with user
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const loginWithUser = () => {
      if(username == null || password == null){
        console.log("usuario invalido")
      } else{
        setuserAuth(username)
      }
  }

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
          value={this.password}
          onChangeText={(password) => setPassword(password)}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        <Button
          title={'Login'}
          style={styles.input}
          onPress={() => {loginWithUser()}}
        />
        <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => {
           logWithGoogle()
          }}
        />

        <Button
          title="Mostrar"
          disabled={!request}
          onPress={() => {
            console.log(userAuth)
          }}
        />

      <Button
          title="Mostrar"
          disabled={!request}
          onPress={() => {
            console.log(accessToken)
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