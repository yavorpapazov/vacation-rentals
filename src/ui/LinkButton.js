import classes from "./LinkButton.module.css"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

function LinkButton({to, children}) {
  return (
    <Link className={classes.btn} to={to}>{children}</Link>
  )
}

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
}

export default LinkButton