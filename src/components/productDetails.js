import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Card} from 'react-native-elements';
const Detail = ({navigation}) => {
    return(
        <Card elevation={1}>
            <View>
        <Text>Hola como estan?</Text>
        </View>

        </Card>
        

    );
}

export default Detail;