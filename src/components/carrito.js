import React, { Component } from 'react';
import {Button,Icon, FlatList, Text, View, StyleSheet, SafeAreaView } from 'react-native'

const Cart = ({route, navigation}) => {


    const { list } = route.params;
    console.log(list)
    return(
        <View>
            
            <FlatList
            data={list}
            keyExtractor={({id}) => id}
            renderItem={({item}) => (
                    <View >
                            <View>                    
                                <Text>{item.title}</Text>
                            </View>
                    </View>

            )}
            />

            <Button
                icon={<Icon name='' color='#ffffff' />}
                type="outline"
                buttonStyle={{borderRadius: 5, marginTop: 20, marginRight: 0, marginBottom: 0}}
                title='Pay order'
                onPress={()=> {console.log("Order payed")}}
                />
        </View>

    );
}

export default Cart;