import Login from './src/components/login'
import Detail from './src/components/productDetails'
import ProductList from './src/components/productList';
import Cart from './src/components/carrito'
import OrderPayed from './src/components/orderSuccesful';
import React, {useContext, useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GlobalContext,{defaultAuth, cartList}  from './src/components/globalContext'; 
import Storage from './services/asyncStorage'
const Stack = createNativeStackNavigator();

export default function App() {
  const [userAuth, setuserAuth] = useState(defaultAuth)
  const [cartProductList, setCartProductList] = useState(cartList)

  useEffect(() => {
    Storage.getData('Auth')
    .then(res => setuserAuth(JSON.parse(res)))
    .catch(error => console.log(error))

    Storage.getData('Cart')
    .then((res) => {
      if(res != null && res != undefined){
        setCartProductList(JSON.parse(res))
      } else{
        setCartProductList([])
      }
    })
    .catch(error => console.log(error))
  }, []);

  return (
    <GlobalContext.Provider value={
      {userAuth,
      setuserAuth,
      cartProductList,
      setCartProductList}
    }>
      <NavigationContainer>
        <Stack.Navigator>
          {
            (userAuth) ?
              <>
                <Stack.Screen name="Main" component={ProductList} options={{headerShown: false}}/>
                <Stack.Screen name="Detail" component={Detail} />
                <Stack.Screen name="Cart" component={Cart} />
                <Stack.Screen name="Payment" component={OrderPayed}  options={{headerBackVisible: false}}/>
              </> :
              <Stack.Screen name="Login" component={Login} /> 
          }
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}

