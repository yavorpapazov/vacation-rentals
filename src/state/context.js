import { useState, useEffect, createContext } from "react"
import { db, auth } from "../firebase/firebase-config"
import { collection, query, where, onSnapshot } from "firebase/firestore"

let AppContext = createContext()
function AppContextProvider({children}) {
  let [cart, setCart] = useState([])
  let [bnbs, setBnbs] = useState([])
  let [isShoppingCartDisplayed, setIsShoppingCartDisplayed] = useState(false)
  let [userId, setUserId] = useState('')
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
  console.log(auth?.currentUser?.uid)
  useEffect(() => {
    let bnbsCollectionRef = collection(db, "bnbs")
    let q = query(bnbsCollectionRef, where("userId", "==", "6bPYmW2hunX4zzPz4sotgh3DrjS2"))
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