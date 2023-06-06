import React, {useEffect, useState} from 'react';
import {Image, FlatList, Text, View, StyleSheet} from 'react-native'

const ProductList = () => {
    const [data, setData] = useState([]);
    const getProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        getProducts();
    }, []);

    return (
            <FlatList
            data={data}
            keyExtractor={({id}) => id}
            renderItem={({item}) => (
                <View style={styles.product}>
                    <View>                    
                        <Image
                        style={styles.logo}
                        source={{
                        uri: item.image,
                        }}
                        />
                    </View>
                    <View>                    
                        <Text style={styles.title}>{item.title.slice(0,20)}</Text>
                        <Text style={styles.category}>{item.category}</Text>
                        <Text style={styles.price}>${item.price}</Text>
                    </View>
                </View>   
            )}
            />
    )
}

export default ProductList

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
      width: 80,
      height: 80,
      marginRight: 5,
      borderRadius: 5,
      overflow: "hidden",
    },
    product:{
        padding:20,
        paddingBottom: 5,
        paddingTop: 5,
        marginLeft: 5,
        flexDirection: 'row'
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
  