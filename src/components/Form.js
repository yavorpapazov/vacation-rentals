import classes from "./Form.module.css"
import { useState } from "react"
import { db, storage } from "../firebase/firebase-config"
import { collection, addDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import Button from "../ui/Button"

function Form() {
  let [title, setTitle] = useState('')
  let [city, setCity] = useState('')
  let [country, setCountry] = useState('')
  let [cost, setCost] = useState('')
  let [image, setImage] = useState('')
  let [imageUrl, setImageUrl] = useState('')
  function handleTitle(e) {
    setTitle(e.target.value)
  }
  function handleCity(e) {
    setCity(e.target.value)
  }
  function handleCountry(e) {
    setCountry(e.target.value)
  }
  function handleCost(e) {
    setCost(e.target.value)
  }
  function handleImage(e) {
    setImage(e.target.value)
    setImageUrl(e.target.files[0])
  }
  async function handleSubmit(e) {
    e.preventDefault()
    if(imageUrl === null) {
      return
    }
    let imageRef = ref(storage, `images/${title}`)
    let result = await uploadBytes(imageRef, imageUrl)
    if(result) {
      alert('Image uploaded.')
    }
    let resultURL = await getDownloadURL(imageRef)
    let userInputObj = {
      bnbTitle: title,
      bnbCity: city,
      bnbCountry: country,
      bnbCost: parseInt(cost),
      bnbImage: resultURL,
      fullPath: imageRef.fullPath,
      stars: 4.5
    }
    await addDoc(collection(db, "bnbs"), userInputObj)
    setTitle('')
    setCity('')
    setCountry('')
    setCost('')
    setImage('')
  }
  return (
    <form className={classes["user-input-form"]} onSubmit={handleSubmit}>
      <div className={classes["form-item"]}>
        <label htmlFor="title">Title:</label>
        <br />
        <input id="title" type="text" value={title} onChange={handleTitle} required></input>
      </div>
      <div className={classes["form-item"]}>
        <label htmlFor="city">Location:</label>
        <br />
        <input id="city" type="text" value={city} onChange={handleCity} required></input>
      </div>
      <div className={classes["form-item"]}>
        <label htmlFor="country">Country:</label>
        <br />
        <input id="country" type="text" value={country} onChange={handleCountry} required></input>
      </div>
      <div className={classes["form-item"]}>
        <label htmlFor="cost">Cost:</label>
        <br />
        <input id="cost" type="number" value={cost} onChange={handleCost} required></input>
      </div>
      <div className={classes["form-item"]}>
        <label htmlFor="picture">Select image:</label>
        <br />
        <input id="picture" type="file" value={image} onChange={handleImage} required></input>
      </div>
      <div className={classes["form-item-button"]}>
        <Button>Save</Button>
      </div>
    </form>
  )
}

export default Form