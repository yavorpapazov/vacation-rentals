import classes from "./VacationRental.module.css"
import { AiFillStar } from "react-icons/ai"
import PropTypes from "prop-types"

function VacationRentalStatic({bnb}) {
  return (
    <div className={classes.container}>
      <div className={classes["image-div"]}>
        <img src={bnb.bnbImage} alt={bnb.bnbTitle} />
      </div>
      <div className={classes.location}>
        <h3>{bnb.bnbCity}, {bnb.bnbCountry}</h3>
        <h3><AiFillStar /> {bnb.stars}</h3>
      </div>
      <div className={classes.cost}>
        <h3>Cost: ${bnb.bnbCost}</h3>
      </div>
    </div>
  )
}

VacationRentalStatic.propTypes = {
  bnb: PropTypes.object.isRequired
}

export default VacationRentalStatic