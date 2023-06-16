import { createContext } from "react";


const defaultAuth = null
const cartList = []

const GlobalContext = createContext(defaultAuth, cartList)

export default GlobalContext
export{
    defaultAuth,
    cartList
}