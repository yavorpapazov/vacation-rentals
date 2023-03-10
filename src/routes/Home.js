import classes from "./Home.module.css"
import { useContext, useState, useEffect } from "react"
import { AppContext } from "../state/context"
import { db, storage, auth } from "../firebase/firebase-config"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc, addDoc, deleteDoc, collection } from "firebase/firestore"
import { ref, deleteObject } from "firebase/storage"
import VacationRental from "../components/VacationRental"
import ShoppingCart from "../components/ShoppingCart"
import Form from "../components/Form"

function Home() {
  let contextData = useContext(AppContext)
  let [userEmail, setUserEmail] = useState(null)
  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      if(currentUser) {
        setUserEmail(currentUser.email)
      } else {
        setUserEmail(null)
      }
    })
  }, [])
  async function handleAddToCart(bnbId) {
    let addDocRef = doc(db, "bnbs", bnbId)
    let docSnap = await getDoc(addDocRef)
    let addCartDocRef = doc(db, "cart", bnbId)
    let addCartDocSnap = await getDoc(addCartDocRef)
    // let q = query(collection(db, "cart"), where("addedToCartBy", "==", auth.currentUser.uid))
    // let addCartDocSnap = await getDoc(q)
    if(addCartDocSnap.exists()) {
      alert('The item is already in the cart.')
      return
    }
    //await setDoc(doc(db, "cart", bnbId), {...docSnap.data(), addedToCartBy: auth.currentUser.uid})
    await addDoc(collection(db, "cart"), {...docSnap.data(), addedToCartBy: auth.currentUser.uid, bnbId})
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
  let resultVacationRental = contextData.bnbs.map(item => <VacationRental 
    key={item.id} 
    bnb={item} 
    manageCart={handleAddToCart} 
    deleteBnb={handleDelete} 
    action="Add to Cart" 
    showDelete={true}
  />)
  return (
    <div className={classes.container}>
      {contextData.isShoppingCartDisplayed && <div className={classes.backdrop} />}
      {userEmail !== null && <Form />}
      {userEmail !== null && <h3>User logged in: {userEmail}</h3>}
      <div className={classes["grid-container"]}>
        {resultVacationRental}
      </div>
      {contextData.isShoppingCartDisplayed && 
      <div className={classes.modal}>
        <ShoppingCart />
      </div>}
    </div>
  );
}

export default Home