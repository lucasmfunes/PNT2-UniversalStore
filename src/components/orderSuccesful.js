import React, { useContext } from 'react';
import {Text, StyleSheet, Button } from 'react-native'
import {Card} from 'react-native-elements';
import check from '../../assets/greencheck.png';
import GlobalContext from './globalContext'; 
import Storage from '../../services/asyncStorage'


const OrderPayed = ({route, navigation}) => {
    const{setCartProductList} = useContext(GlobalContext)
    return(
        <Card style={styles.container} elevation={1}>
            <Card.Title>Order completed!</Card.Title>
            <Card.Image style={styles.logo} source= {check}></Card.Image>
                <Text>Su numero de orden: #{Math.floor(Math.random() * 100000000000000)} fue abonado correctamente</Text>
                <Button
                title= "Continuar"
                onPress={() => {
                    setCartProductList([])
                    Storage.storeData('Cart', JSON.stringify([]))
                    navigation.navigate('Main')
                } }
                />
        </Card>

    );
}

export default OrderPayed;

const styles = StyleSheet.create({
    logo: {
          width: 50,
          height: 50,
          marginLeft: 150,
          marginBottom: 10,
          alignContent: 'center',
          justifyContent: 'center'
      },
      container: {
        flex: 1,
        paddingTop: 400,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      },
  });

