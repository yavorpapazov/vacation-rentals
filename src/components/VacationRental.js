import classes from "./VacationRental.module.css"
import { Link } from "react-router-dom"
import { AiFillStar, AiFillDelete } from "react-icons/ai"
import Button from "../ui/Button"
import PropTypes from "prop-types"

function VacationRental({bnb, manageCart, action, deleteBnb, showDelete}) {
  return (
    <div className={classes.container}>
      <div className={classes["image-div"]}>
        <Link to={`/bnbs/${bnb.id}`}><img src={bnb.bnbImage} alt={bnb.bnbTitle} /></Link>
      </div>
      <div className={classes.location}>
        <h3>{bnb.bnbCity}, {bnb.bnbCountry}</h3>
        <h3><AiFillStar /> {bnb.stars}</h3>
      </div>
      <h3>{bnb.bnbTitle}</h3>
      <div className={classes.cost}>
        <h3>Cost: ${bnb.bnbCost}</h3>
        <div className={classes["add-delete-buttons"]}>
          <div>
            <Button addClass="button" onClick={() => manageCart(bnb.id)}>{action}</Button>
          </div>
          {showDelete &&
          <div>
            <Button addClass="delete" onClick={() => deleteBnb(bnb.id)}><AiFillDelete /></Button>
          </div>}
        </div>
      </div>
    </div>
  )
}

VacationRental.propTypes = {
  bnb: PropTypes.object.isRequired,
  manageCart: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
  deleteBnb: PropTypes.func,
  showDelete: PropTypes.bool.isRequired
}

export default VacationRental