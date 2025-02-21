import {useState} from 'react'

import {FaMinus, FaPlus} from 'react-icons/fa'

import CartContext from '../../context/CartContext'

import './index.css'

const Dishes = props => {
  const {dishDetails} = props
  const {
    dishId,
    dishName,
    dishPrice,
    dishImage,
    dishCurrency,
    dishCalories,
    dishDescription,
    dishAvailability,
    dishType,
    nextUrl,
  } = dishDetails

  const [quantity, setQuantity] = useState(0)

  return (
    <CartContext.Consumer>
      {value => {
        const {addCartItem, deleteCartItem} = value

        const decrementQuantity = () => {
          if (quantity > 0) {
            setQuantity(prevQuantity => prevQuantity - 1)
          }
        }

        const incrementQuantity = () => {
          if (quantity < 10) {
            setQuantity(prevQuantity => prevQuantity + 1)
          }
        }

        const onClickAddCartItem = () => {
          addCartItem({...dishDetails, quantity})
          setQuantity(prevQuantity => prevQuantity + 1)
        }

        const onClickDeleteCartItem = () => {
          deleteCartItem({...dishDetails, quantity})
          setQuantity(prevQuantity => prevQuantity - 1)
        }
        return (
          <li className="dish-list">
            <div className="dish-content-container">
              <div className="avalibility-icon">
                <span className="circle">{}</span>
              </div>
              <div className="dishes-content">
                <h1 className="dish-name">{dishName}</h1>
                <p className="price">
                  {dishCurrency} {dishPrice}
                </p>
                <p className="dish-description">{dishDescription}</p>
                {dishAvailability ? (
                  <div className="addon">
                    <button
                      type="button"
                      className="button"
                      onClick={
                        quantity === 1
                          ? onClickDeleteCartItem
                          : decrementQuantity
                      }
                    >
                      <FaMinus className="icon" />
                    </button>
                    <span className="count">{quantity}</span>
                    <button
                      type="button"
                      className="button"
                      onClick={
                        quantity === 0 ? onClickAddCartItem : incrementQuantity
                      }
                    >
                      <FaPlus className="icon" />
                    </button>
                  </div>
                ) : (
                  <p className="not-available">Not available</p>
                )}
                {dishType > 1 && (
                  <p className="customization">Customizations available</p>
                )}
              </div>
            </div>
            <div className="calories-container">
              <p className="dish-calories">
                {dishCalories} <br /> calories
              </p>
            </div>
            <div>
              <img src={dishImage} className="dish-image" alt="dish" />
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Dishes
