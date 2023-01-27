import classes from "./Border.module.css"

function Border(props) {
  return (
    <div className={`${classes.border} ${classes[props.color]}`}>
      {props.children}
    </div>
  )
}
    
export default Border