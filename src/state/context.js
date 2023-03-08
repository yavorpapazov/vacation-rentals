import { useState, useEffect, createContext } from "react"
import { db, auth } from "../firebase/firebase-config"
import { onAuthStateChanged } from "firebase/auth"
import { collection, query, where, onSnapshot } from "firebase/firestore"

let AppContext = createContext()
function AppContextProvider({children}) {
  let [cart, setCart] = useState([])
  let [bnbs, setBnbs] = useState([])
  let [isShoppingCartDisplayed, setIsShoppingCartDisplayed] = useState(false)
  let [userId, setUserId] = useState(null)
  function handleBnbs(result) {
    setBnbs(result)
  }
  function handleCart(result) {
    setCart(result)
  }
  function handleDisplayCart() {
    setIsShoppingCartDisplayed(true)
  }
  function handleCloseCart() {
    setIsShoppingCartDisplayed(false)
  }
  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      if(currentUser) {
        setUserId(currentUser.uid)
      }
    })
  }, [])
  useEffect(() => {
    let bnbsCollectionRef = collection(db, "bnbs")
    let q = query(bnbsCollectionRef, where("userId", "==", userId))
    let getBnbs = async () => {
      try {
        onSnapshot(q, snapshot => {
          let result = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
          setBnbs(result)
        })
      } catch(err) {
        console.error(err)
      }
    }
    getBnbs()
  }, [userId])
  useEffect(() => {
    let cartCollectionRef = collection(db, "cart")
    let q = query(cartCollectionRef, where("userId", "==", userId))
    let getCart = async () => {
      onSnapshot(q, snapshot => {
        let result = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
        setCart(result)
      })
    }
    getCart()
  }, [userId])
  let contextValue = {
    isShoppingCartDisplayed,
    handleBnbs,
    handleCart,
    bnbs,
    cart,
    handleDisplayCart,
    handleCloseCart
  }
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export { AppContext, AppContextProvider }