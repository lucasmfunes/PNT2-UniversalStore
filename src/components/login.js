import React, {useState} from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Image } from 'react-native';
import logo from '../../assets/universal-logo.jpg';

const Login = ({navigation}) => {

  const [username, setUsername] = useState('');

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