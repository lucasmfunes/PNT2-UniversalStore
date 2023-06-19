import React, {useContext, useEffect, useState} from 'react';
import {Image, FlatList, Text, View, StyleSheet, SafeAreaView } from 'react-native'
import { Card, Icon, Button, SearchBar } from 'react-native-elements';
import products from '../../services/products'
import { Header as HeaderRNE, HeaderProps } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Badge } from '@rneui/themed';
import {StatusBar} from 'react-native';
import fakeData from '../data/fakeData';
import GlobalContext from './globalContext'; 

const ProductList = ({route, navigation}) => {
    const [search, setSearch] = useState('');
    // const [selectedLanguage, setSelectedLanguage] = useState();
    //const [cartProductList, setCartProductList] = useState([]);

    const{cartProductList, setCartProductList} = useContext(GlobalContext)
    const{userAuth, setuserAuth} = useContext(GlobalContext)
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    // Quitar padding header
    StatusBar.setHidden(false)
    StatusBar.currentHeight = -20
    SafeAreaView.length = -20

    useEffect(() => {
        if(masterDataSource.length < 1){
            console.log("Cargando productos....")
            products.getProducts()
            .then(res => {
               setMasterDataSource(res)
               setFilteredDataSource(res)
               console.log("DONE")
            })
            .catch((e) =>{
                console.log(e)
            })
        }
    }, [cartProductList]);
    
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

      const addToCart = (item) => {
        let productList = [...cartProductList, item]
        setCartProductList(productList)
      }

      const getLength = () => {
        if(cartProductList == undefined || cartProductList == null){
            return 0
        }
        return cartProductList.length.toString()
      }


    return (
        <View>
            <SafeAreaView >
                <HeaderRNE 
                    style={styles.headerContainer}
                    rightComponent={
                        <View style={styles.headerRight}>
                            <TouchableOpacity
                                style={{ marginLeft: 10 }}
                                onPress={() => {navigation.navigate('Cart', {list: cartProductList})}}
                            >
                                <View style={styles.headerRight} key={cartProductList.length} >
                                    <Icon type="antdesign" name="shoppingcart" color="white" />
                                    <Badge
                                        status="error"
                                        value={getLength()}
                                        containerStyle={{ position: 'absolute', bottom: 15, left: 15}}
                                        //onPress={() => {navigation.navigate('Cart', {list: cartProductList})}}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                    centerComponent={{ text: 'Universal Store', style: styles.heading }}
                />
            </SafeAreaView>
            <SearchBar
                platform='ios'
                placeholder="Search Here"
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                cancelButtonTitle='Cancel'
            />
            <View>
                <TouchableOpacity style={styles.cerrarSesion} onPress={()=> {setuserAuth(null)}}><Text>Hola, {userAuth.name} ! (Cerrar Sesion)</Text></TouchableOpacity>
                    <FlatList
                   // data={filteredDataSource}
                    data={fakeData}
                    keyExtractor={(item) => item.id}
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
                                        <Text onPress={() => {navigation.navigate('Detail')}}
                                        style={styles.title}>{item.title.slice(0,20)}</Text>
                                        <Text style={styles.category}>{item.category}</Text>
                                        <Text style={styles.price}>${item.price}</Text>
                                        <Button
                                            icon={<Icon name='' color='#ffffff' />}
                                            type="outline"
                                            buttonStyle={{borderRadius: 5, marginTop: 20, marginRight: 0, marginBottom: 0}}
                                            title='Add to cart'
                                            onPress={()=> { 
                                                    addToCart(item)
                                            }}
                                            />
                                    </View>
                            </View>
                        </Card>
                    )}
                    />
            </View>
        </View>
        
    )
}

export default ProductList

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#397af8',
        marginBottom: 20,
        width: '100%',
      },
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
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#397af8',
        marginBottom: 20,
        width: '100%',
        paddingVertical: 15,
      },
      heading: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
      },
      headerRight: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
      },
      subheaderText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },

      cerrarSesion:{
        paddingTop: 5
      }
  });
  