import classes from "./App.module.css"
import { useState, useEffect } from "react"
import { db } from "./firebase/firebase-config"
import { collection, onSnapshot, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore"
import bnbData from "./data/bnbs.json"
import VacationRental from "./components/VacationRental"
import ShoppingCart from "./components/ShoppingCart"
import Form from "./components/Form"
import Button from "./ui/Button"

function App() {
  let [cart, setCart] = useState([])
  let [bnbs, setBnbs] = useState(bnbData)
  let [isShoppingCartDisplayed, setIsShoppingCartDisplayed] = useState(false)
  async function handleAddToCart(bnbId) {
    let addDocRef = doc(db, "bnbs", bnbId)
    let docSnap = await getDoc(addDocRef)
    let addCartDocRef = doc(db, "cart", bnbId)
    let addCartDocSnap = await getDoc(addCartDocRef)
    if(addCartDocSnap.exists()) {
      alert('The item is already in the cart.')
      return
    }
    await setDoc(doc(db, "cart", bnbId), docSnap.data())
  }
  async function handleRemoveFromCart(bnbId) {
    let deleteCartDocRef = doc(db, "cart", bnbId)
    await deleteDoc(deleteCartDocRef)
  }
  function handleCloseCart() {
    setIsShoppingCartDisplayed(false)
  }
  useEffect(() => {
    let bnbsCollectionRef = collection(db, "bnbs")
    let getBnbs = async () => {
      onSnapshot(bnbsCollectionRef, snapshot => {
        let result = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
        setBnbs([...bnbData, ...result])
      })
    }
    getBnbs()
  }, [])
  useEffect(() => {
    let cartCollectionRef = collection(db, "cart")
    let getCart = async () => {
      onSnapshot(cartCollectionRef, snapshot => {
        let result = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
        setCart([...result])
      })
    }
    getCart()
  }, [])
  let resultVacationRental = bnbs.map(item => <VacationRental key={item.id} bnb={item} manageCart={handleAddToCart} action="Add to Cart" />)
  return (
    <div className={classes.container}>
      {isShoppingCartDisplayed && <div className={classes.backdrop} />}
      <Form />
      <div>
        <h3 className={classes["shopping-cart-h3"]}>Shopping cart items: {cart.length}</h3>
        <Button onClick={() => setIsShoppingCartDisplayed(true)}>Shopping Cart</Button>
      </div>
      <div className={classes["grid-container"]}>
        {resultVacationRental}
      </div>
      {isShoppingCartDisplayed && 
      <div className={classes.modal}>
        <ShoppingCart bnbCart={cart} manageCart={handleRemoveFromCart} closeCart={handleCloseCart} />
      </div>}
    </div>
  );
}

export default App