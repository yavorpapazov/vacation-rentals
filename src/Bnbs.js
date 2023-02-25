import { db, storage } from "./firebase-config"
import { collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { useState, useEffect } from "react"
import Bnb from "./Bnb"

function Bnbs() {
  let [title, setTitle] = useState('')
  let [bnbs, setBnbs] = useState([])
  let [image, setImage] = useState('')
  let [imageUpload, setImageUpload] = useState(null)
  let [updatedTitle, setUpdatedTitle] = useState('')
  function handleTitle(e) {
    setTitle(e.target.value)
  }
  function handleNewTitle(e) {
    setUpdatedTitle(e.target.value)
  }
  function handleImage(e) {
    setImage(e.target.value)
    setImageUpload(e.target.files[0])
  }
  async function handleSubmit(e) {
    e.preventDefault()
    if(imageUpload === null) {
      return
    }
    let imageRef = ref(storage, `images/${title}`)
    let result = await uploadBytes(imageRef, imageUpload)
    if(result) {
      alert('Image uploaded.')
    }
    let resultURL = await getDownloadURL(imageRef)
    await addDoc(collection(db, "bnbs"), {bnbTitle: title, bnbImage: resultURL, fullPath: imageRef.fullPath})
    setTitle('')
    setImage('')
  }
  async function handleDelete(docId) {
    let deleteDocRef = doc(db, "bnbs", docId)
    let docSnap = await getDoc(deleteDocRef)
    await deleteDoc(deleteDocRef)
    let deleteImageRef = ref(storage, docSnap.data().fullPath)
    deleteObject(deleteImageRef)
  }
  async function handleUpdate(docId) {
    let updateDocRef = doc(db, "bnbs", docId)
    await updateDoc(updateDocRef, {bnbTitle: updatedTitle})
    setUpdatedTitle('')
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
  let bnbsArr = bnbs.map(item => <Bnb 
    key={item.id} 
    {...item} 
    onDelete={handleDelete} 
    onUpdate={handleUpdate} 
    onChange={handleNewTitle} 
    newTitle={updatedTitle} 
  />)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div >
          <label htmlFor="title">Title</label>
          <br />
          <input id="title" type="text" value={title} onChange={handleTitle}></input>
        </div>
        <div>
          <label htmlFor="picture">Select image:</label>
          <br />
          <input id="picture" type="file" value={image} onChange={handleImage}></input>
        </div>
        <div>
          <button>Add</button>
        </div>
      </form>
      {bnbsArr}
    </div>
  )
}

export default Bnbs