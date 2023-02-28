import classes from "./Login.module.css"
import { useNavigate } from "react-router-dom"
import Button from "../ui/Button"

function Login() {
  let navigate = useNavigate()
  function handleLogin() {
    alert('You have successfully logged in.')
    navigate('/')
  }
  return (
    <div className={classes.login}>
      <h3>Login Page</h3>
      <Button addClass="button" onClick={handleLogin}>Log In</Button>
    </div>
  )
}

export default Login