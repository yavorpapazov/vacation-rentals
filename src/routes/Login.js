import classes from "./Login.module.css"
import { useState } from "react"
import { auth, googleProvider } from "../firebase/firebase-config"
import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
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
  async function handleLogin(e) {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch(err) {
      console.log(err.message)
    }
    setEmail('')
    setPassword('')
    navigate("/")
  }
  async function handleSigninWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch(err) {
      console.log(err.message)
    }
  }
  async function handleLogout() {
    try {
      await signOut(auth) 
    } catch(err) {
      console.log(err.message)
    }
    navigate("/")
  }
  return (
    <div className={classes.login}>
      <form onSubmit={handleLogin}>
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
        <Button addClass="button">Log in</Button>
      </form>
      <Button addClass="button" onClick={handleSigninWithGoogle}>Google</Button>
      <Button addClass="button" onClick={handleLogout}>Log out</Button>
    </div>
  )
}

export default Login