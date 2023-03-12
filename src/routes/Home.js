import classes from "./Home.module.css"
import { useContext, useState, useEffect } from "react"
import { AppContext } from "../state/context"
import { db, storage, auth } from "../firebase/firebase-config"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc, addDoc, deleteDoc, collection, query, where, getDocs } from "firebase/firestore"
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
    let q = query(collection(db, "cart"), where("addedToCartBy", "==", auth.currentUser.uid), where("bnbId", "==", bnbId))
    let addCartDocSnap = await getDocs(q)
    if(addCartDocSnap.docs[0]) {
      alert('The item is already in the cart.')
      return
    }
    await addDoc(collection(db, "cart"), {...docSnap.data(), addedToCartBy: auth.currentUser.uid, bnbId: bnbId})
  }
  async function handleDelete(docId) {
    let q = query(collection(db, "cart"), where("addedToCartBy", "==", auth.currentUser.uid), where("bnbId", "==", docId))
    let addCartDocSnap = await getDocs(q)
    if(addCartDocSnap.docs[0]) {
      alert('Please remove item from shopping cart.')
      return
    }
    let deleteDocRef = doc(db, "bnbs", docId)
    let docSnap = await getDoc(deleteDocRef)
    if(auth.currentUser.uid === docSnap.data().userId) {
      await deleteDoc(deleteDocRef)
      let deleteImageRef = ref(storage, docSnap.data().fullPath)
      deleteObject(deleteImageRef)
    } else {
      alert('The item has been created by a different user and can not be deleted.')
      return
    }
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