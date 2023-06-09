import React, { Component, useEffect } from 'react';
import {Button,Icon, Image, Text, View, StyleSheet, BackHandler } from 'react-native'
import { Card} from 'react-native-elements';
import check from '../../assets/greencheck.png';

const OrderPayed = ({route, navigation}) => {
    return(
        <Card style={styles.container} elevation={1}>
            <Card.Title>Order completed!</Card.Title>
            <Card.Image style={styles.logo} source= {check}></Card.Image>

            <View>
                <Text>Su numero de orden: #{Math.floor(Math.random() * 100000000000000)} fue abonado correctamente</Text>
                {/* <Button
                icon={<Icon name='' color='#ffffff' />}
                buttonStyle={{borderRadius: 5, marginTop: 20, marginRight: 0, marginBottom: 0}}
                title='Come back'
                onPress={() => {navigation.navigate('Main')} }
                /> */}
            </View>

        </Card>

    );
}

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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      },
  });

export default OrderPayed;