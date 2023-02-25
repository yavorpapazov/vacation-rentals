import classes from "./Button.module.css"
import PropTypes from "prop-types"

function Button({onClick, children}) {
  return (
    <button className={classes.button} onClick={onClick}>{children}</button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string.isRequired
}

export default Button