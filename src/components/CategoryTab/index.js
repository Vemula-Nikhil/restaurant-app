import './index.css'

const CategoryTab = props => {
  const {categoryDetails, isActive, onClickCategory} = props
  const {menuCategory, menuCategoryId} = categoryDetails

  const onClickCategoryTab = () => {
    onClickCategory(menuCategoryId)
  }

  const activeCategoryClassName = isActive ? 'active-category' : ''

  return (
    <li className="menu-category">
      <button
        type="button"
        className={`category ${activeCategoryClassName}`}
        onClick={onClickCategoryTab}
      >
        {menuCategory}
      </button>
    </li>
  )
}

export default CategoryTab
