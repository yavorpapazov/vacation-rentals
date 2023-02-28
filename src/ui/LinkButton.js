import classes from "./LinkButton.module.css"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

function LinkButton({addClass, to, children}) {
  return (
    <Link className={`${classes.btn} ${classes[addClass]}`} to={to}>{children}</Link>
  )
}

LinkButton.propTypes = {
  addClass: PropTypes.string,
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
}

export default LinkButton