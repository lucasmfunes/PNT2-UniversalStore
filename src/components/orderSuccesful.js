import React, { Component } from 'react';
import {Button,Icon, FlatList, Text, View, StyleSheet, SafeAreaView } from 'react-native'

const OrderPayed = ({route, navigation}) => {

    return(
        <View>
            <Text>Su numero de orden: #{Math.floor(Math.random() * 100000000000000)} fue abonado correctamente</Text>
        </View>

    );
}

export default OrderPayed;