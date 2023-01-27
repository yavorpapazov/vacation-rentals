import MyComponent from "./MyComponent"

function Temperature(props) {
  return (
    <div>
      <form onSubmit={props.onHandleSubmit}>
        <label>Enter temperature in {props.scale}:</label>
        <input type="text" value={props.temperature} onChange={props.onHandleChange} />
        <button>Submit</button>
      </form>
      <MyComponent celsius={props.finalResult} />
    </div>
  )
}

export default Temperature