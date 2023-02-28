import classes from "./SingleBnb.module.css"
import { useParams } from "react-router-dom"

function SingleBnb() {
  let params = useParams()
  return (
    <div className={classes.bnb}>
      <h3>Single Bnb</h3>
      <h3>{params.id}</h3>
    </div>
  )
}

export default SingleBnb