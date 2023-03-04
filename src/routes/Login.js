import classes from "./Login.module.css"
import { useState } from "react"
import { auth, googleProvider } from "../firebase/firebase-config"
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import Button from "../ui/Button"

function Login() {
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let navigate = useNavigate()
  function handleEmail(e) {
    setEmail(e.target.value)
  }
  function handlePassword(e) {
    setPassword(e.target.value)
  }
  async function handleSignup(e) {
    try {
      e.preventDefault()
      await createUserWithEmailAndPassword(auth, email, password)
      setEmail('')
      setPassword('')
    } catch(err) {
      console.error(err)
    }
    //navigate('/')
  }
  async function handleSigninWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch(err) {
      console.error(err)
    }
  }
  async function handleLogout() {
    try {
      await signOut(auth)
    } catch(err) {
      console.error(err)
    }
  }
  console.log(auth?.currentUser?.email)
  return (
    <div className={classes.login}>
      <div className={classes["form-item"]}>
        <label htmlFor="email">Email:</label>
        <br />
        <input id="email" type="email" value={email} onChange={handleEmail} required></input>
      </div>
      <div className={classes["form-item"]}>
        <label htmlFor="password">Password:</label>
        <br />
        <input id="password" type="password" value={password} onChange={handlePassword} required></input>
      </div>
      <Button addClass="button" onClick={handleSignup}>Sign up</Button>
      <Button addClass="button" onClick={handleSigninWithGoogle}>Sign in with Google</Button>
      <Button addClass="button" onClick={handleLogout}>Log out</Button>
    </div>
  )
}

export default Login