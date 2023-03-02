import classes from "./SingleBnb.module.css"
import { useEffect, useState, useContext } from "react"
import { AppContext } from "../state/context"
import { useParams } from "react-router-dom"
import { db } from "../firebase/firebase-config"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { AiFillStar } from "react-icons/ai"
import Button from "../ui/Button"
import ShoppingCart from "./ShoppingCart"

function SingleBnb() {
  let params = useParams()
  let [singleBnb, setSingleBnb] = useState({})
  let contextData = useContext(AppContext)
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
  useEffect(() => {
    let docRef = doc(db, "bnbs", params.id)
    let getBnb = async () => {
      let docSnap = await getDoc(docRef)
      setSingleBnb(docSnap.data())
    }
    getBnb()
  }, [params.id])
  return (
    <div className={classes.container}>
      {contextData.isShoppingCartDisplayed && <div className={classes.backdrop} />}
      <div className={classes["image-div"]}>
        <img src={singleBnb.bnbImage} alt={singleBnb.bnbTitle} />
      </div>
      <div className={classes.location}>
        <h3>{singleBnb.bnbCity}, {singleBnb.bnbCountry}</h3>
        <h3><AiFillStar /> {singleBnb.stars}</h3>
      </div>
      <h3>{singleBnb.bnbTitle}</h3>
      <div className={classes.cost}>
        <h3>Cost: ${singleBnb.bnbCost}</h3>
        <div>
          <Button addClass="button" onClick={() => handleAddToCart(params.id)}>Add to Cart</Button>
        </div>
      </div>
      {contextData.isShoppingCartDisplayed && 
      <div className={classes.modal}>
        <ShoppingCart />
      </div>}
    </div>
  )
}

export default SingleBnb