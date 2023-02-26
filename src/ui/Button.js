import classes from "./Button.module.css"
import PropTypes from "prop-types"

function Button({addClass, onClick, children}) {
  return (
    <button className={classes[addClass]} onClick={onClick}>{children}</button>
  )
}

Button.propTypes = {
  addClass: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired
  ])
}

export default Button