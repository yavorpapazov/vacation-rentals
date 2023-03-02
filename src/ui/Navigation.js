import classes from "./Navigation.module.css"
import { useContext } from "react"
import { AppContext } from "../state/context"
import { AiOutlineShoppingCart } from "react-icons/ai"
import LinkButton from "./LinkButton"

function Navigation() {
  let contextData = useContext(AppContext)
  return (
    <header className={classes.header}>
      <nav className={classes.navbar}>
        <div>
          <LinkButton to="/">Home</LinkButton>
        </div>
        <div className={classes["log-in-cart"]}>
          <div>
            <LinkButton addClass="border" to="/login">Log In</LinkButton>
          </div>
          <div className={classes["shopping-cart"]}>
            <div className={classes["shopping-cart-div"]} onClick={() => contextData.handleDisplayCart()}>
              <AiOutlineShoppingCart size="3em" />
            </div>
            <h3 className={classes["shopping-cart-h3"]}>Items: {contextData.cart.length}</h3>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navigation