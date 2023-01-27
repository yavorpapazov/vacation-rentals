import { useState } from "react"

function App() {
  let [count, setCount] = useState(0)
  function handleCount() {
    setCount(prevState => prevState + 1)
  }
  return (
    <div>
      <button onClick={handleCount}>Count</button>
      <h1>{count}</h1>
    </div>
  )
}

export default App