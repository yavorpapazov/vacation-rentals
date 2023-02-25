import classes from "./App.module.css"
import { useState } from "react"
import Bnbs from "./Bnbs"

function App() {
  let [name, setName] = useState('')
  let [nameIsTouched, setNameIsTouched] = useState(false)
  let nameIsValid = name.trim() !== ''
  let nameInputIsInvalid = !nameIsValid && nameIsTouched
  function handleName(e) {
    setName(e.target.value)
  }
  function handleNameInputBlur() {
    setNameIsTouched(true)
  }
  function handleSubmit(e) {
    e.preventDefault()
    setNameIsTouched(true)
    if(!nameIsValid) {
      return
    }
    setName('')
    setNameIsTouched(false)
  }
  let nameInputClasses = nameInputIsInvalid ? `${classes['name-input']} ${classes['invalid']}` : `${classes['name-input']}`
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div >
          <label htmlFor="name">Your Name</label>
          <br />
          <input className={nameInputClasses} id="name" type="text" value={name} onBlur={handleNameInputBlur} onChange={handleName}></input>
          {nameInputIsInvalid && <p>Name should not be empty.</p>}
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
      <Bnbs />
    </>
    
  )
}

export default App