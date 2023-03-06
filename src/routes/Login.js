import classes from "./Login.module.css"
import { useState, useEffect } from "react"
import { auth, googleProvider } from "../firebase/firebase-config"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import Button from "../ui/Button"

function Login() {
  let [registerEmail, setRegisterEmail] = useState('')
  let [registerPassword, setRegisterPassword] = useState('')
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [user, setUser] = useState({})
  let navigate = useNavigate()
  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
    })
  }, [])
  function handleRegisterEmail(e) {
    setRegisterEmail(e.target.value)
  }
  function handleRegisterPassword(e) {
    setRegisterPassword(e.target.value)
  }
  function handleEmail(e) {
    setEmail(e.target.value)
  }
  function handlePassword(e) {
    setPassword(e.target.value)
  }
  async function handleRegister(e) {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
    } catch(err) {
      console.log(err.message)
    }
    setRegisterEmail('')
    setRegisterPassword('')
    //navigate('/')
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
  }
  return (
    <div className={classes.login}>
      <form onSubmit={handleRegister}>
        <div className={classes["form-item"]}>
          <label htmlFor="registeremail">Email:</label>
          <br />
          <input id="registeremail" type="email" value={registerEmail} onChange={handleRegisterEmail} required></input>
        </div>
        <div className={classes["form-item"]}>
          <label htmlFor="registerpassword">Password:</label>
          <br />
          <input id="registerpassword" type="password" value={registerPassword} onChange={handleRegisterPassword} required></input>
        </div>
        <Button addClass="button">Sign up</Button>
      </form>
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
      <h3>User logged in: {user?.email}</h3>
      <Button addClass="button" onClick={handleLogout}>Log out</Button>
    </div>
  )
}

export default Login