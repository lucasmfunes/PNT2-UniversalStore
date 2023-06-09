import Main from './src/components/main';
import Login from './src/components/login'
import Detail from './src/components/productDetails'
import ProductList from './src/components/productList';
import Cart from './src/components/carrito'
import OrderPayed from './src/components/orderSuccesful';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator();



export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={ProductList} options={{headerMode: 'none'}}/>
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Payment" component={OrderPayed} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

