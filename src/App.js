import { useState, useEffect } from "react"

function App() {
  let [count, setCount] = useState(0)
  
  return (
    <div>
      <h3>{count}</h3>
    </div>
  )
}

export default App