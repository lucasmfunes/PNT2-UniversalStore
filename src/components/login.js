import React, { useContext, useEffect, useState } from "react";
import { Button, TextInput, View, StyleSheet, Image } from "react-native";
import logo from "../../assets/universal-logo.jpg";
import * as Google from "expo-auth-session/providers/google";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID, EXPO_CLIENT_ID } from "@env";
import GlobalContext from "./globalContext";
import Storage from "../../services/asyncStorage";
import fakeApiLogin from "../../services/login";

const Login = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    expoClientId: EXPO_CLIENT_ID,
  });

  // Log with google
  const [accessToken, setAccessToken] = useState();
  const { userAuth, setuserAuth } = useContext(GlobalContext);

  const logWithGoogle = () => {
    promptAsync({ showInRecents: true })
      .then((value) => {
        return fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: {
            Authorization: `Bearer ${value.authentication.accessToken}`,
          },
        });
      })
      .then((data) => {
        data.json().then((data) => {
          Storage.storeData("Auth", JSON.stringify(data));
          setuserAuth(data);
        });
      });
  };

  //Log with user
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const loginWithUser = () => {
    fakeApiLogin(username, password)
      .then((json) => {
        setAccessToken(json.token);
        setuserAuth({ name: username });
        Storage.storeData("Auth", JSON.stringify(json.token));
        Storage.storeData("username", JSON.stringify(username));
      })
      .catch((error) => console.error("Error: ", error));
  };

  /*useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);*/

  /*useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      setAccessToken(authentication.accessToken);
      // Aquí puedes manejar la respuesta de autenticación
    }
  }, [response]);*/

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <TextInput
        //value={this.username}
        onChangeText={(text) => setUsername(text)}
        placeholder={"Username"}
        style={styles.input}
      />
      <TextInput
        //value={this.password}
        onChangeText={(password) => setPassword(password)}
        placeholder={"Password"}
        secureTextEntry={true}
        style={styles.input}
      />
      <Button
        title={"Login"}
        style={styles.input}
        onPress={() => {
          loginWithUser();
        }}
      />

      <Button
        title="Sign in with Google"
        disabled={!request}
        onPress={() => {
          logWithGoogle();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
});

export default Login;
