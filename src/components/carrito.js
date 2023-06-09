import React, { Component } from 'react';
import {Button,Icon, FlatList, Text, View, StyleSheet } from 'react-native'
import { Card} from 'react-native-elements';
const Cart = ({route, navigation}) => {


    const { list } = route.params;
    console.log(list)


    const getTotal = () => {
        let sum = 0;
        list.forEach(element => {
            sum = sum + element.price
        });
        return Math.trunc(sum*100)/100
    }

    
    return(
        <View>
            <Card elevation={7}>
                <FlatList
                data={list}
                keyExtractor={({id}) => id}
                renderItem={({item}) => (
                        <View>
                                <View style={styles.productList}>                    
                                    <Text>{item.title.slice(0,10)}</Text>
                                    <Text>${item.price}</Text>
                                </View>

                        </View>

                )}
                />
                <View>                    
                    <Text style={styles.total}>Total: ${getTotal()}</Text>
                </View>
        </Card>
            <Button
                icon={<Icon name='' color='#ffffff' />}
                type="outline"
                buttonStyle={{borderRadius: 5, marginTop: 20, marginRight: 0, marginBottom: 0}}
                title='Pay order'
                onPress={() => {navigation.navigate('Payment')} }
                />
        </View>

    );
}


const styles = StyleSheet.create({
    total:{
        fontWeight: 'bold',
        marginBottom: 1,
        marginTop: 10,
        fontSize: 16,
    },
    productList:{
        paddingBottom: 5,
        paddingTop: 5,
        flexDirection: 'row',
        gap: 20
    },
  });

export default Cart;