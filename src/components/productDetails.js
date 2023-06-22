import React from 'react';
import { Text, StyleSheet, View , Image} from 'react-native';
import { Card } from 'react-native-elements';
import productsService from "../../services/products";
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';

const Detail = ({navigation}) => {
    const route = useRoute();
    const id = route.params?.id || '';

    const [product, setProduct] = useState({})

    useEffect(() => {
        console.log("***** Entramos al home y llamamos al servicio de producto", id)
        productsService.getById(id)
            .then(data => {
                console.log("Producto", data)
                setProduct(data)
            })
            .catch(error => {
                console.log("Error al obtener el producto", error)
            })
    }, [])


    return(
        <View style={styles.container}>
            <Card>
                <Card.Title>{product.title}</Card.Title>
                <Card.Divider />
                <Image 
                    source={{uri: product.image}}
                    style={styles.image}
                />
                <View>
                    <Text>Categoría: {product.category}</Text>
                </View>
                <View>
                    <Text>Precio: {product.price}</Text>
                </View>
                <View>
                    <Text>Description: {product.description}</Text>
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    image: {
        height: 200,
        width: 200,
        alignSelf: 'center',
      }
  });

export default Detail;