import React, {useEffect, useState} from 'react';
import {Image, FlatList, Text, View, StyleSheet, StatusBar, SafeAreaView, TextInput} from 'react-native'
import { Card, Icon, Button, SearchBar } from 'react-native-elements';

import products from '../../services/products'

const ProductList = () => {


    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    useEffect(() => {
        console.log("Cargando productos....")
        products.getProducts()
        .then(res=> {
           setMasterDataSource(res)
           setFilteredDataSource(res);
           console.log("DONE")
        })
    }, []);

    updateSearch = (search) => {
        setSearch({ search });
    };

    const searchFilterFunction = (text) => {
        if (text) {
          const newData = masterDataSource.filter(function (item) {
            const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setFilteredDataSource(newData);
          setSearch(text);
        } else {
          setFilteredDataSource(masterDataSource);
          setSearch(text);
        }
      };

    return (
        <View>
             <SearchBar
                platform='ios'
                placeholder="Search Here"
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                cancelButtonTitle='Cancel'
            />
            <FlatList
            data={filteredDataSource}
            keyExtractor={({id}) => id}
            renderItem={({item}) => (
                <Card style={styles.card} elevation={7}>
                    <View style={styles.product}>
                        <Image
                                style={styles.logo}
                                source={{
                                uri: item.image,
                                }}
                                />
                            <View>                    
                                <Text style={styles.title}>{item.title.slice(0,20)}</Text>
                                <Text style={styles.category}>{item.category}</Text>
                                <Text style={styles.price}>${item.price}</Text>
                                <Button
                                    icon={<Icon name='' color='#ffffff' />}
                                    type="outline"
                                    buttonStyle={{borderRadius: 5, marginTop: 20, marginRight: 0, marginBottom: 0}}
                                    title='Add to cart' 
                                    onPress={() => {console.log(search)}}/>
                            </View>
                    </View>
                </Card>
            )}
            />
            <StatusBar style="auto"></StatusBar>
        </View>
        
    )
}

export default ProductList

const styles = StyleSheet.create({
    card:{
        backgroundColor: 'grey',
        borderRadius: 5,
        overflow: "hidden",
    },
    textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
      },
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
        flex: 1,
        width: '90%',
        height: '90%',
        marginRight:15,
        resizeMode: 'contain',
    },
    product:{
        paddingBottom: 5,
        paddingTop: 5,
        flexDirection: 'row',
    },
    title:{
        fontWeight: 'bold',
        marginBottom: 1,
        fontSize: 16,
    },
    price:{
        fontSize: 15,
        color: 'red'
    },
    category: {
        color: 'grey',
        fontStyle: 'italic',
        textTransform: 'capitalize'
    }
  });
  