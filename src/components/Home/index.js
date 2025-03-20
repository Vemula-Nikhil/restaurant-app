import React, {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import CategoryTab from '../CategoryTab'
import Dishes from '../Dishes'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

const Home = () => {
  const [apiResponse, setApiResponse] = useState({
    menuCategoryList: [],
    apiStatus: apiStatusConstants.initial,
  })

  const [activeCategory, setActiveCategory] = useState(null)

  useEffect(() => {
    const getMenuCategory = async () => {
      setApiResponse(prevResponse => ({
        ...prevResponse,
        apiStatus: apiStatusConstants.inProgress,
      }))

      const url =
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

      const response = await fetch(url)

      if (response.ok === true) {
        const data = await response.json()
        const formattedData = data[0].table_menu_list.map(eachCategory => ({
          menuCategory: eachCategory.menu_category,
          menuCategoryId: eachCategory.menu_category_id,
          menuCategoryImage: eachCategory.menu_category_image,
          nextUrl: eachCategory.nexturl,
          categoryDishes: eachCategory.category_dishes.map(eachDish => ({
            dishId: eachDish.dish_id,
            dishName: eachDish.dish_name,
            dishPrice: eachDish.dish_price,
            dishImage: eachDish.dish_image,
            dishCurrency: eachDish.dish_currency,
            dishCalories: eachDish.dish_calories,
            dishDescription: eachDish.dish_description,
            dishAvailability: eachDish.dish_Availability,
            dishType: eachDish.dish_Type,
            nextUrl: eachDish.nextUrl,
          })),
        }))

        setApiResponse(prevResponse => ({
          ...prevResponse,
          apiStatus: apiStatusConstants.success,
          menuCategoryList: formattedData,
        }))
      } else {
        setApiResponse(prevResponse => ({
          ...prevResponse,
          apiStatus: apiStatusConstants.failure,
          menuCategoryList: [],
        }))
      }
    }

    getMenuCategory()
  }, [])

  useEffect(() => {
    if (apiResponse.apiStatus === apiStatusConstants.success) {
      setActiveCategory(apiResponse.menuCategoryList[0].menuCategoryId)
    }
  }, [apiResponse.menuCategoryList])

  const onClickCategory = id => {
    setActiveCategory(id)
  }

  const filteredCategory = apiResponse.menuCategoryList.filter(
    eachCategory => eachCategory.menuCategoryId === activeCategory,
  )

  return (
    <>
      <div className="menu-category-container">
        <ul className="menu-category-list">
          {apiResponse.menuCategoryList.map(eachCategory => (
            <CategoryTab
              categoryDetails={eachCategory}
              key={eachCategory.menuCategoryId}
              isActive={eachCategory.menuCategoryId === activeCategory}
              onClickCategory={onClickCategory}
            />
          ))}
        </ul>
      </div>
      <div className="dishes-container">
        {filteredCategory.length > 0 ? (
          <ul className="dishes-list">
            {filteredCategory[0].categoryDishes.map(eachDish => (
              <Dishes dishDetails={eachDish} key={eachDish.dishId} />
            ))}
          </ul>
        ) : (
          <div className="products-loader-container">
            <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
          </div>
        )}
      </div>
    </>
  )
}

export default Home
