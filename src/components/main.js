import React from 'react'
import {StyleSheet, View} from 'react-native'
import ProductList from './productList'
import Constants from 'expo-constants'

const Main = ({navigation}) => {
    return(
        <View style={styles.container}>
            <ProductList ></ProductList>
        </View>
            
    )
}
export default Main

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFF',
      flexGrow: 1
    },
  });