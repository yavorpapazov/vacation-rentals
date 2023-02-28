import classes from "./ErrorPage.module.css"
import LinkButton from "../ui/LinkButton"

function ErrorPage() {
  return (
    <div className={classes["error-page-container"]}>
      <h3>Something went wrong!</h3>
      <LinkButton to="/">Back to Home</LinkButton>
    </div>
  )
}

export default ErrorPage