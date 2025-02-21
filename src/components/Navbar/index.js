import {AiOutlineShoppingCart} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

import './index.css'

const Navbar = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      return (
        <div className="navbar-container">
          <h1 className="cafe-name">UNI Resto Cafe</h1>
          <div className="cart-container">
            <p className="my-orders">My Orders</p>
            <AiOutlineShoppingCart className="cart" />
            <span className="cart-count">{cartList.length}</span>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Navbar
