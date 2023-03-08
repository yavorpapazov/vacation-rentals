import classes from "./Navigation.module.css"
import { useContext, useState, useEffect } from "react"
import { AppContext } from "../state/context"
import { auth } from "../firebase/firebase-config"
import { onAuthStateChanged } from "firebase/auth"
import { AiOutlineShoppingCart } from "react-icons/ai"
import LinkButton from "./LinkButton"

function Navigation() {
  let contextData = useContext(AppContext)
  let [userId, setUserId] = useState(null)
  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      if(currentUser) {
        setUserId(currentUser.uid)
      } else {
        setUserId(null)
      }
    })
  }, [])
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
            <h3 className={classes["shopping-cart-h3"]}>{userId === null ? 0 : contextData.cart.length}</h3>
            <div className={classes["shopping-cart-div"]} onClick={() => contextData.handleDisplayCart()}>
              <AiOutlineShoppingCart size="2em" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navigation