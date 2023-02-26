import classes from "./App.module.css"
import { useState, useEffect } from "react"
import { db, storage } from "./firebase/firebase-config"
import { collection, onSnapshot, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore"
import { ref, deleteObject } from "firebase/storage"
import VacationRental from "./components/VacationRental"
import ShoppingCart from "./components/ShoppingCart"
import Form from "./components/Form"
import Button from "./ui/Button"

function App() {
  let [cart, setCart] = useState([])
  let [bnbs, setBnbs] = useState([])
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
  async function handleDelete(docId) {
    let addCartDocRef = doc(db, "cart", docId)
    let addCartDocSnap = await getDoc(addCartDocRef)
    if(addCartDocSnap.exists()) {
      alert('Please remove item from shopping cart.')
      return
    }
    let deleteDocRef = doc(db, "bnbs", docId)
    let docSnap = await getDoc(deleteDocRef)
    await deleteDoc(deleteDocRef)
    let deleteImageRef = ref(storage, docSnap.data().fullPath)
    deleteObject(deleteImageRef)
  }
  useEffect(() => {
    let bnbsCollectionRef = collection(db, "bnbs")
    let getBnbs = async () => {
      onSnapshot(bnbsCollectionRef, snapshot => {
        let result = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
        setBnbs(result)
      })
    }
    getBnbs()
  }, [])
  useEffect(() => {
    let cartCollectionRef = collection(db, "cart")
    let getCart = async () => {
      onSnapshot(cartCollectionRef, snapshot => {
        let result = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
        setCart(result)
      })
    }
    getCart()
  }, [])
  let resultVacationRental = bnbs.map(item => <VacationRental 
    key={item.id} 
    bnb={item} 
    manageCart={handleAddToCart} 
    deleteBnb={handleDelete} 
    action="Add to Cart" 
    showDelete={true}
  />)
  return (
    <div className={classes.container}>
      {isShoppingCartDisplayed && <div className={classes.backdrop} />}
      <Form />
      <div>
        <h3 className={classes["shopping-cart-h3"]}>Shopping cart items: {cart.length}</h3>
        <Button addClass="button" onClick={() => setIsShoppingCartDisplayed(true)}>Shopping Cart</Button>
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