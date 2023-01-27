function MyComponent(props) {
  if(props.celsius >=100) {
    return <h3>Water would boil</h3>
  }
  return <h3>Water would not boil</h3>
}
    
export default MyComponent