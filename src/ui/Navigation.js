import classes from "./Navigation.module.css"
import LinkButton from "./LinkButton"

function Navigation() {
  return (
    <header className={classes.header}>
      <nav className={classes.navbar}>
        <div>
          <LinkButton to="/">Home</LinkButton>
        </div>
        <div>
          <LinkButton to="/login">Log In</LinkButton>
        </div>
      </nav>
    </header>
  )
}

export default Navigation