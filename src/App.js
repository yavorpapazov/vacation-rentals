import { useState, useEffect } from "react"

function App() {
  let [data, setData] = useState('')
  async function getData() {
    let url = 'https://swapi.dev/api/people/1'
    let result = await fetch(url)
    console.log(result)
    let myData = await result.json()
    setData(myData)
  }
  useEffect(() => {
    getData()
  }, [])
  console.log(data)
  return (
    <div>
      <h3>Hello, Friends!</h3>
      <h3>{data.name}</h3>
    </div>
  )
}

export default App