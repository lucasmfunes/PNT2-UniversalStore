import React from 'react'
import {StyleSheet, View} from 'react-native'
import ProductList from './productList'
import Constants from 'expo-constants'

const Main = () => {
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
      marginTop: Constants.statusBarHeight,
      flexGrow: 1
    },
  });