import {useState} from 'react'

import Navbar from './components/Navbar'
import Home from './components/Home'

import CartContext from './context/CartContext'

import './App.css'

//  write your code here

const App = () => {
  const [cartList, setCartList] = useState([])

  const addCartItem = dish => {
    setCartList(prevState => [...prevState, dish])
  }
  const deleteCartItem = dish => {
    setCartList(prevState =>
      prevState.filter(eachDish => eachDish.dishId !== dish.dishId),
    )
  }

  return (
    <CartContext.Provider value={{cartList, addCartItem, deleteCartItem}}>
      <div>
        <Navbar />
        <Home />
      </div>
    </CartContext.Provider>
  )
}

export default App
