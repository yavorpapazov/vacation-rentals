import classes from "./ShoppingCart.module.css"
import VacationRental from "./VacationRental"
import Button from "../ui/Button"
import PropTypes from "prop-types"

function ShoppingCart({bnbCart, manageCart, closeCart}) {
  let total = 0
  let resultShoppingCartItems = bnbCart.map(item => <VacationRental 
    key={item.id} 
    bnb={item} 
    manageCart={manageCart} 
    action="Remove"
    showDelete={false}
  />)
  for(let i of bnbCart) {
    total = total + i.bnbCost
  }
  return (
    <div className={classes["grid-container"]}>
      {resultShoppingCartItems}
      <h3>Total: ${total}</h3>
      <div>
        <Button addClass="button" onClick={closeCart}>Close</Button>
      </div>
    </div>
  )
}

ShoppingCart.propTypes = {
  bnbCart: PropTypes.array.isRequired,
  manageCart: PropTypes.func.isRequired,
  closeCart: PropTypes.func.isRequired
}

export default ShoppingCart